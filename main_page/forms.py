from django import forms

from .models import Language


class LanguageForm(forms.ModelForm):
    class Meta:
        model = Language
        fields = 'title', 'level'
        widgets = {
            'level': forms.NumberInput(
                attrs={
                    'step': '0.5',
                    'min': f'{Language.min_level}',
                    'max': f'{Language.max_level}',
                }
            ),
        }
