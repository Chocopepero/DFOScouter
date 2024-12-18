from django.urls import path
from .views import get_data, get_characters

urlpatterns = [
    path('api/data/', get_data, name='get_data'),
    path('api/getchar/<str:characterName>', get_characters, name='get_characters'),
]
