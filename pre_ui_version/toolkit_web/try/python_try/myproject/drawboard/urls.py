from django.urls import path
from .views import save_drawing

urlpatterns = [
    path('save_drawing/', save_drawing, name='save_drawing'),
]