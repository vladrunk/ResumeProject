from django.core.validators import MaxValueValidator, MinValueValidator
from django.db import models
from django.utils.translation import ugettext_lazy as _

from phonenumber_field.modelfields import PhoneNumberField

from datetime import date

YEAR_CHOICES = [(r, r) for r in range(2010, date.today().year + 1)]

class User(models.Model):
    first_name = models.CharField(
        default='',
        max_length=50,
        verbose_name=_('First Name'),
    )
    last_name = models.CharField(
        default='',
        max_length=50,
        verbose_name=_('Last Name'),
    )
    specialization = models.CharField(
        default='',
        max_length=255,
        verbose_name=_('Specialization'),
    )
    avatar = models.ImageField(
        upload_to='images/avatars',
        verbose_name=_('Photo'),
        help_text='180 x 180',
    )
    tg = models.CharField(
        default='',
        max_length=255,
        blank=True,
        verbose_name=_('Telegram'),
    )
    inst = models.CharField(
        default='',
        max_length=255,
        blank=True,
        verbose_name=_('Instagram'),
    )
    linkedin = models.CharField(
        default='',
        max_length=255,
        blank=True,
        verbose_name=_('LinkedIn'),
    )
    git = models.CharField(
        default='',
        max_length=255,
        blank=True,
        verbose_name=_('GitHub'),
    )
    phone = PhoneNumberField(
        default='',
        blank=True,
        verbose_name=_('Phone'),
    )
    email = models.EmailField(
        default='',
        max_length=255,
        blank=True,
        verbose_name=_('Email'),
    )
    about = models.TextField(
        default='',
        blank=False,
        verbose_name=_('About me'),
    )
    experience = models.ManyToManyField(
        verbose_name=_('Experience'),
        to='Experience',
        related_name='user_exp',
    )
    skill = models.ManyToManyField(
        verbose_name=_('Skill'),
        to='Skill',
        related_name='user_skill',
    )
    education = models.ManyToManyField(
        verbose_name=_('Education'),
        to='Education',
        related_name='user_edu',
    )
    language = models.ManyToManyField(
        verbose_name=_('Language'),
        to='Language',
        related_name='user_lang',
    )
    music = models.ManyToManyField(
        verbose_name=_('Playlist'),
        to='Music4Code',
        related_name='user_music',
    )

    def __str__(self):
        return f'{self.first_name} {self.last_name}'

    class Meta:
        verbose_name = _('User')
        verbose_name_plural = _('Users')


class Experience(models.Model):
    company = models.CharField(
        default='',
        max_length=150,
        verbose_name=_('Company'),
    )
    position = models.CharField(
        default='',
        max_length=150,
        verbose_name=_('Position'),
    )
    year_start = models.PositiveSmallIntegerField(
        default=date.today().year,
        choices=YEAR_CHOICES,
        verbose_name=_('Year of start'),
    )
    year_end = models.PositiveSmallIntegerField(
        default=date.today().year,
        choices=YEAR_CHOICES,
        verbose_name=_('Year of completion'),
    )
    essentials = models.TextField(
        default='',
        blank=True,
        verbose_name=_('Essentials'),
    )
    link = models.URLField(
        default='',
        blank=True,
        verbose_name=_('Company site'),
    )

    def __str__(self):
        return self.company

    class Meta:
        verbose_name = _('Experience')
        verbose_name_plural = _('Experiences')


class Skill(models.Model):
    title = models.CharField(
        default='',
        max_length=150,
        verbose_name=_('Title'),
    )
    level = models.PositiveSmallIntegerField(
        default=0,
        validators=[
            MaxValueValidator(100),
            MinValueValidator(1)
        ],
        verbose_name=_('Level'),
    )

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = _('Skill')
        verbose_name_plural = _('Skills')


class Education(models.Model):
    university = models.CharField(
        default='',
        max_length=150,
        verbose_name=_('University'),
    )
    specialization = models.CharField(
        default='',
        max_length=150,
        verbose_name=_('Specialization'),
    )
    year_start = models.PositiveSmallIntegerField(
        default=date.today().year,
        choices=YEAR_CHOICES,
        verbose_name=_('Year of start'),
    )
    year_end = models.PositiveSmallIntegerField(
        default=date.today().year,
        choices=YEAR_CHOICES,
        verbose_name=_('Year of completion'),
    )

    def __str__(self):
        return self.university

    class Meta:
        verbose_name = _('Education')
        verbose_name_plural = _('Educations')


class Language(models.Model):
    max_level = 5
    min_level = 1
    title = models.CharField(
        default='',
        max_length=150,
        verbose_name=_('Title'),
    )
    level = models.DecimalField(
        max_digits=2,
        decimal_places=1,
        default=1,
        verbose_name=_('Level'),
        validators=[
            MaxValueValidator(max_level),
            MinValueValidator(min_level),
        ]
    )

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = _('Language')
        verbose_name_plural = _('Languages')


class Music4Code(models.Model):
    title = models.CharField(
        default='',
        verbose_name=_('Title'),
        max_length=255,
    )
    link = models.URLField(
        default='',
        verbose_name=_('Playlist link'),
    )

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = _('Music4Code')
        verbose_name_plural = _('Musics4Code')
