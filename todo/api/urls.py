from rest_framework import routers
from .views import ToDoViewSet

router = routers.SimpleRouter()
router.register('todos', ToDoViewSet, basename='todos')

urlpatterns = []
urlpatterns += router.urls
