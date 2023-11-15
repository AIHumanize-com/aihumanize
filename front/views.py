from django.shortcuts import render
from common.humanize_text import rewrite_text
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
# Create your views here.

def index(request):
    return render(request, 'front/index.html')

@csrf_exempt
def humanizer(request):
    if request.method == "POST":
        # Parse JSON from the request body
        body_unicode = request.body.decode('utf-8')
        body = json.loads(body_unicode)

        # Extract the text field
        text = body["text"]

        # Your text processing function
        result = rewrite_text(text, "general")
        

        # Return the result as JSON
        return JsonResponse({"text": result})
        