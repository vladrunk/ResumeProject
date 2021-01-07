from django.shortcuts import render
from .models import User


def index(req):
    user = User.objects.filter(id=1)[0]
    if user:
        context = {
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
    return render(req, 'main_page/index.html', context)
