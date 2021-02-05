from django.contrib import admin
from django.utils.translation import ugettext_lazy as _

from .forms import LanguageForm
from .models import User, Experience, Language, Education, Skill, Music4Code, Project

from modeltranslation.admin import TabbedTranslationAdmin

@admin.register(User)
class UserAdmin(TabbedTranslationAdmin):
    list_display = ['id', 'first_name', 'last_name', ]
    fieldsets = (
        (None, {
            'fields': (('first_name', 'last_name'), 'specialization')
        }),
        (_('Photo'), {
            'fields': ('avatar',),
            'classes': ('wide',),
        }),
        (_('Social networks'), {
            'fields': (('tg', 'inst'), ('linkedin', 'git')),
        }),
        (_('Contacts'), {
            'fields': ('phone', 'email'),
        }),
        (_('Basic Information'), {
            'fields': ('about', 'project', 'experience', 'skill', 'education', 'language', 'music'),
        }),
    )


@admin.register(Experience)
class ExperienceAdmin(TabbedTranslationAdmin):
    list_display = ['id', 'company', 'position', 'year_start', 'year_end', ]


@admin.register(Skill)
class SkillAdmin(admin.ModelAdmin):
    list_display = ['id', 'title', 'level', ]


@admin.register(Education)
class EducationAdmin(TabbedTranslationAdmin):
    list_display = ['id', 'university', 'year_start', 'year_end', ]


@admin.register(Language)
class LanguageAdmin(TabbedTranslationAdmin):
    list_display = ['id', 'title', 'level', ]
    form = LanguageForm


@admin.register(Music4Code)
class Music4CodeAdmin(admin.ModelAdmin):
    list_display = ['id', 'title', 'link', ]


@admin.register(Project)
class ProjectAdmin(TabbedTranslationAdmin):
    list_display = ['id', 'title', 'is_main', ]
