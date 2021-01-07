from django.contrib import admin

from .forms import LanguageForm
from .models import User, Experience, Language, Education, Skill, Music4Code


@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ['id', 'first_name', 'last_name', ]


@admin.register(Experience)
class ExperienceAdmin(admin.ModelAdmin):
    list_display = ['id', 'company', 'position', 'year_start', 'year_end', ]


@admin.register(Skill)
class SkillAdmin(admin.ModelAdmin):
    list_display = ['id', 'name', 'level', ]


@admin.register(Education)
class EducationAdmin(admin.ModelAdmin):
    list_display = ['id', 'university', 'year_start', 'year_end', ]


@admin.register(Language)
class LanguageAdmin(admin.ModelAdmin):
    list_display = ['id', 'name', 'level', ]
    form = LanguageForm


@admin.register(Music4Code)
class Music4CodeAdmin(admin.ModelAdmin):
    list_display = ['id', 'title', 'link', ]
