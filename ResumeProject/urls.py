from django.contrib import admin
from django.urls import path, include

from django.conf.urls.i18n import i18n_patterns

urlpatterns = [
    path('god/', admin.site.urls),
]

urlpatterns += i18n_patterns(
    path('', include('main_page.urls')),
    prefix_default_language=False,
)
