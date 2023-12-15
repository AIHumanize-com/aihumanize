from django.test import TestCase, Client
from django.urls import reverse
from payments.models import  Subscription, WordCountTracker
from users.models import UserModel
from django.contrib.auth import get_user_model
from django.utils import timezone
from django.contrib.auth.hashers import make_password
import json

class HumanizerViewTests(TestCase):
    def setUp(self):
        self.client = Client()
        self.humanizer_url = reverse('humanizer')  # Replace with your actual URL name

    def test_user_not_logged_in(self):
        data = json.dumps({'text': 'Sample text', 'purpose': 'Example', 'model': 'Falcon'})
        response = self.client.post(self.humanizer_url, data=data, content_type='application/json')
       
        self.assertEqual(response.status_code, 400)
        
        # self.assertJSONEqual(str(response.content, encoding='utf8'), {"error": "Word limit exceeded. Sign up for additional words or subscribe for unlimited access."})
    
    def test_user_exceeds_word_limit(self):
        user = get_user_model().objects.create(email='testuser@example.com', password=make_password('12345'), is_active=True)
        self.client.login(email='testuser@example.com', password='12345')
        Subscription.objects.create(user=user, plan_type='free', word_count=400, price_in_cents=899)  # Adjust plan_type as necessary
        WordCountTracker.objects.create(subscription=user.subscription_set.first(), words_purchased=400, words_used=0)
        data = json.dumps({'text': ' '.join(['word']*401), 'purpose': 'general', 'model': 'Falcon'})
        response = self.client.post(self.humanizer_url, data=data, content_type='application/json')
        self.assertEqual(response.status_code, 400)
        # self.assertJSONEqual(str(response.content, encoding='utf8'), {"error": "Limit is over please reset subscrioptions"})

    def test_user_within_word_limit(self):
        user = get_user_model().objects.create(email='testuser2@example.com', password=make_password('12345'), is_active=True)
        self.client.login(email='testuser2@example.com', password='12345')
        
        Subscription.objects.create(user=user, plan_type='free', word_count=400, price_in_cents=899, is_active=True)  # Adjust plan_type as necessary
        WordCountTracker.objects.create(subscription=user.subscription_set.first(), words_purchased=400, words_used=0)
        sample_text = "The AI humanizer tool transforms AI-generated content into human-like narratives, enhancing SEO and user engagement. It aligns with search engine algorithms, avoiding penalties while making content more relatable and engaging. This bridges AI efficiency with human authenticity, boosting visibility and appeal in the digital landscape."
        data = json.dumps({'text': sample_text, 'purpose': 'general', 'model': 'Falcon'})
        response = self.client.post(self.humanizer_url, data=data, content_type='application/json')
        
       
        self.assertEqual(response.status_code, 200)

    def test_paid_user_access(self):
        paid_user = get_user_model().objects.create(email='paiduser@example.com', password=make_password('12345'), is_active=True)
        self.client.login(email='paiduser@example.com', password='12345')
        Subscription.objects.create(user=paid_user, word_count=200000, plan_type='yearly', end_date=timezone.now() + timezone.timedelta(days=365), price_in_cents=5449, is_active=True)  # Example paid plan
        WordCountTracker.objects.create(subscription=paid_user.subscription_set.first(), words_purchased=10000, words_used=0)
        data = json.dumps({'text': 'Sample text', 'purpose': 'general', 'model': 'Falcon'})
        response = self.client.post(self.humanizer_url, data=data, content_type='application/json')
        self.assertEqual(response.status_code, 200)
