from django.shortcuts import render, redirect

from ResumeProject import settings
from .models import User


def index(req):
    lang = req.COOKIES.get('lang')
    if not lang:
        lang = req.LANGUAGE_CODE
    redirect_url = f'/{lang}/' if lang != settings.LANGUAGE_CODE else '/'
    if req.path != redirect_url:
        response = redirect(to=redirect_url)
    else:
        user = User.objects.filter(id=1)[0]
        if user:
            context = {
                'browse_lang': req.LANGUAGE_CODE,
                'profile_image': user.avatar.url,
                'fio': f'{user.first_name} {user.last_name}',
                'specs': user.specialization,
                'phone': user.phone,
                'email': user.email,
                'tg': user.tg,
                'inst': user.inst,
                'linkedin': user.linkedin,
                'git': user.git,
                'about': user.about,
                'work_exp': user.experience,
                'skills': user.skill,
                'edus': user.education,
                'langs': user.language,
                'musics': user.music,
            }
        else:
            context = {}
        response = render(req, 'main_page/templates/index.html', context)
    response.set_cookie(key='lang', value=lang, samesite='Lax', max_age=60*60*24*30, path='/', )
    return response
