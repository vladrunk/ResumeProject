from django.contrib import admin

from .models import ToDo


@admin.register(ToDo)
class ToDoAdmin(admin.ModelAdmin):
    prepopulated_fields = {'slug': ('title',)}
    fields = ('title', 'slug')
    list_display = ['id', 'title', 'edit', 'ip_edit']
