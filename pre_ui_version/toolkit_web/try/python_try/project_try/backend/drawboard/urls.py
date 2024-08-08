# backend/drawboard/urls.py
from django.urls import path
from .views import generate_svg

urlpatterns = [
    path('generate_svg/', generate_svg, name='generate_svg'),
]