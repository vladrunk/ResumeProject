from rest_framework import serializers
from ..models import ToDo


class ToDoSerializer(serializers.ModelSerializer):
    slug = serializers.SlugField(read_only=True, required=False)

    class Meta:
        model = ToDo
        fields = '__all__'
        read_only_fields = ('slug',)
