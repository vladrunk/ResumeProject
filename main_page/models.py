from django.core.validators import MaxValueValidator, MinValueValidator
from django.db import models

from phonenumber_field.modelfields import PhoneNumberField

from datetime import date

YEAR_CHOICES = [(r, r) for r in range(2010, date.today().year + 1)]


class User(models.Model):
    first_name = models.CharField(
        max_length=50,
        default='',
        verbose_name='Имя',
    )
    last_name = models.CharField(
        max_length=50,
        default='',
        verbose_name='Фамилия',
    )
    specialization = models.CharField(
        max_length=255,
        default='',
        verbose_name='Специализация',
    )
    avatar = models.ImageField(
        upload_to='images/avatars',
        verbose_name='Фото',
        help_text='180 x 180',
    )
    tg = models.CharField(
        max_length=255,
        default='',
        blank=True,
        verbose_name='Telegram',
    )
    inst = models.CharField(
        max_length=255,
        default='',
        blank=True,
        verbose_name='Instagram',
    )
    linkedin = models.CharField(
        max_length=255,
        default='',
        blank=True,
        verbose_name='LinkedIn',
    )
    git = models.CharField(
        max_length=255,
        default='',
        blank=True,
        verbose_name='GitHub',
    )
    phone = PhoneNumberField(
        verbose_name='Телефон',
        default='',
    )
    email = models.EmailField(
        max_length=255,
        default='',
        blank=True,
        verbose_name='Email',
    )
    about = models.TextField(
        default='',
        blank=False,
        verbose_name='О себе'
    )
    experience = models.ManyToManyField(
        verbose_name='Опыт работы',
        to='Experience',
        related_name='user_exp',
    )
    skill = models.ManyToManyField(
        verbose_name='Навык',
        to='Skill',
        related_name='user_skill',
    )
    education = models.ManyToManyField(
        verbose_name='Образование',
        to='Education',
        related_name='user_edu',
    )
    language = models.ManyToManyField(
        verbose_name='Язык',
        to='Language',
        related_name='user_lang',
    )
    music = models.ManyToManyField(
        verbose_name='Язык',
        to='Music4Code',
        related_name='user_music',
    )

    def __str__(self):
        return f'{self.first_name} {self.last_name}'

    class Meta:
        verbose_name = 'Юзер'
        verbose_name_plural = 'Юзеры'


class Experience(models.Model):
    company = models.CharField(
        max_length=150,
        default='',
        verbose_name='Компания',
    )
    position = models.CharField(
        max_length=150,
        default='',
        verbose_name='Должность',
    )
    year_start = models.PositiveSmallIntegerField(
        default=date.today().year,
        choices=YEAR_CHOICES,
        verbose_name='Год начала',
    )
    year_end = models.PositiveSmallIntegerField(
        default=date.today().year,
        choices=YEAR_CHOICES,
        verbose_name='Год окончания',
    )
    essentials = models.TextField(
        default='',
        blank=True,
        verbose_name='Обязаности',
    )
    link_company = models.URLField(
        default='',
        blank=True,
        verbose_name='Сайт компании',
    )

    def __str__(self):
        return self.company

    class Meta:
        verbose_name = 'Опыт работы'
        verbose_name_plural = 'Опыт работы'


class Skill(models.Model):
    name = models.CharField(
        default='',
        max_length=150,
        verbose_name='Навык',
    )
    level = models.PositiveSmallIntegerField(
        default=0,
        validators=[
            MaxValueValidator(100),
            MinValueValidator(1)
        ],
        verbose_name='Уровень',
    )

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'Навык'
        verbose_name_plural = 'Навыки'


class Education(models.Model):
    university = models.CharField(
        default='',
        max_length=150,
        verbose_name='Университет',
    )
    specialization = models.CharField(
        default='',
        max_length=150,
        verbose_name='Специализация',
    )
    year_start = models.PositiveSmallIntegerField(
        default=date.today().year,
        choices=YEAR_CHOICES,
        verbose_name='Год начала',
    )
    year_end = models.PositiveSmallIntegerField(
        default=date.today().year,
        choices=YEAR_CHOICES,
        verbose_name='Год окончания',
    )

    def __str__(self):
        return self.university

    class Meta:
        verbose_name = 'Образование'
        verbose_name_plural = 'Образование'


class Language(models.Model):
    name = models.CharField(
        default='',
        max_length=150,
        verbose_name='Язык',
    )
    level = models.DecimalField(
        max_digits=2,
        decimal_places=1,
        default=1,
        verbose_name='Уровень',
        validators=[
            MaxValueValidator(5),
            MinValueValidator(1),
        ]
    )

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'Язык'
        verbose_name_plural = 'Языки'


class Music4Code(models.Model):
    title = models.CharField(
        default='',
        verbose_name='Название плейлиста',
        max_length=255,
    )
    link = models.URLField(
        default='',
        verbose_name='Ссылка на плейлист',
    )

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = 'Музыка для кодинга'
        verbose_name_plural = 'Музыка для кодинга'
