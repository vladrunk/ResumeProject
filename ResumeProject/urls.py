from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

from django.conf.urls.i18n import i18n_patterns

urlpatterns = [
    path('god/', admin.site.urls),
]

urlpatterns += i18n_patterns(
    path('', include('main_page.urls')),
    path('', include('todo.urls')),
    prefix_default_language=False,
)

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
