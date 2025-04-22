from django.urls import path
from newsapp.views import receive_view

urlpatterns = [
    path('receive/', receive_view, name='receive-news'),
]
