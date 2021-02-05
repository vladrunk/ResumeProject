from modeltranslation.translator import register, TranslationOptions
from .models import User, Experience, Education, Language, Project


@register(User)
class UserTranslationOptions(TranslationOptions):
    fields = ('first_name', 'last_name', 'about',)


@register(Experience)
class ExperienceTranslationOptions(TranslationOptions):
    fields = ('company', 'position', 'essentials',)


@register(Education)
class EducationTranslationOptions(TranslationOptions):
    fields = ('university', 'specialization',)


@register(Language)
class LanguageTranslationOptions(TranslationOptions):
    fields = ('title',)


@register(Project)
class ProjectTranslationOptions(TranslationOptions):
    fields = ('title', 'desc',)
