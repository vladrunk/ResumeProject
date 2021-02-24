from django.urls import path, include
from . import views

urlpatterns = [
    path('todo/', views.index, name='todo'),
    path('api/', include('todo.api.urls')),
]
