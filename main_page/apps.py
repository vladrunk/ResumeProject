from django.apps import AppConfig
from django.utils.translation import ugettext_lazy as _


class MainPageConfig(AppConfig):
    name = 'main_page'
    verbose_name = _('Main application')
