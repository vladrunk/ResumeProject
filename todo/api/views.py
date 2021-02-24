from rest_framework import viewsets
from rest_framework.permissions import AllowAny

from .serializers import ToDoSerializer
from ..models import ToDo


class ToDoViewSet(viewsets.ModelViewSet):
    queryset = ToDo.objects.all()
    serializer_class = ToDoSerializer
    permission_classes = [AllowAny]
