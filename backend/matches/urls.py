from django.urls import path
from . import views


urlpatterns = [
    path('', views.get_matches, name='get_matches'),
    path('<int:match_id>/', views.get_match, name='get_match')
]
