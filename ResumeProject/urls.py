from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('', include('main_page.urls')),
    path('god/', admin.site.urls),
]
