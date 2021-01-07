from django import forms

from .models import Language


class LanguageForm(forms.ModelForm):
    class Meta:
        model = Language
        fields = 'name', 'level'
        widgets = {
            'level': forms.NumberInput(attrs={'step': '0.5', 'min': '1', 'max': '5', }),
        }
