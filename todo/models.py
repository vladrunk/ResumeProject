from django.db import models, IntegrityError
from django.utils import timezone
from pytils.translit import slugify


class ToDoQuerySet(models.QuerySet):

    def find_by_title(self, title):
        return self.filter(title__icontains=title)

    def find_by_slug(self, slug):
        return self.filter(slug__icontains=slug)


class ToDoManager(models.Manager):

    def get_queryset(self):
        return ToDoQuerySet(self.model, using=self._db)

    def find_by_title(self, title):
        return super(ToDoManager, self).find_by_title(title)

    def find_by_slug(self, slug):
        return super(ToDoManager, self).find_by_slug(slug)


class ToDo(models.Model):
    title = models.CharField(
        max_length=255,
        verbose_name='Описание',
    )
    slug = models.SlugField(
        verbose_name='Идентификатор',
        unique=True,
    )
    edit = models.DateTimeField(
        verbose_name="Измененно",
        auto_now=True,
    )
    ip_edit = models.GenericIPAddressField(
        verbose_name="IP",
    )

    objects = ToDoManager()

    def save(self, *args, **kwargs):
        self.slug = slugify(self.title)
        try:
            super(ToDo, self).save(*args, **kwargs)
        except IntegrityError as err:
            self.slug = slugify(f"{self.title} {len(ToDo.objects.filter(slug__icontains=self.slug))}")
            super(ToDo, self).save(*args, **kwargs)

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = 'Список дел'
        verbose_name_plural = 'Список дел'
