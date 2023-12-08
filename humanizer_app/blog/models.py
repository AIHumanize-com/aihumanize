from django.db import models
from django.utils.text import slugify
import re
from django.utils.html import strip_tags

from django_ckeditor_5.fields import CKEditor5Field
from django.utils.safestring import mark_safe
from django.utils.text import Truncator


# Create your models here.
class Category(models.Model):
    name = models.CharField(max_length=100)
    slug = models.SlugField(max_length=200, unique=True, null=True, blank=True)

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        self.slug = slugify(self.name)
        super().save(*args, **kwargs)


class Author(models.Model):
    fullname  = models.CharField(max_length=100)
    image = models.ImageField(upload_to="images/", null=True)

class Post(models.Model):
    title = models.CharField(max_length=200)
    slug = models.SlugField(max_length=200, unique=True, null=True, blank=True)
    short_description = models.TextField()
    content = CKEditor5Field()
    date_posted = models.DateTimeField(auto_now_add=True)
    is_draft = models.BooleanField(default=True)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    image = models.ImageField(upload_to="images/", null=True, blank=True)
    author = models.ForeignKey(Author, on_delete=models.CASCADE, null=True, blank=True)
    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        self.slug = slugify(self.title)
        super().save(*args, **kwargs)

    @property
    def average_read_time(self):
        # Assuming an average reading speed of 200 words per minute
        words_per_minute = 200

        # Counting the number of words in the content
        word_count = len(re.findall(r'\b\w+\b', strip_tags(mark_safe(self.content))))

        # Calculating the average read time in minutes
        read_time_minutes = word_count / words_per_minute

        # Using Django's Truncator to round the read time to the nearest whole number
        truncated_read_time = float(Truncator(read_time_minutes).words(1))

        return round(int(truncated_read_time))