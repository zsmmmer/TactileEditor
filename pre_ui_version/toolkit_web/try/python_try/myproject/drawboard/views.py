from django.shortcuts import render

# Create your views here.
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import Drawing
import json

@csrf_exempt
def save_drawing(request):
    if request.method == "POST":
        data = json.loads(request.body)
        name = data.get("name")
        svg_content = data.get("svg_content")
        drawing = Drawing(name=name, svg_content=svg_content)
        drawing.save()
        return JsonResponse({"message": "Drawing saved!"})
    return JsonResponse({"error": "Invalid request"}, status=400)