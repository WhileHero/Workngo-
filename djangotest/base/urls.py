from django.urls import path, include
from . import views
from rest_framework.routers import DefaultRouter
from base.api import JobViewSet

# Создаем роутер для автоматического создания URL-маршрутов
router = DefaultRouter()
# Регистрируем ViewSet с префиксом 'jobs'
# Это создаст URLs типа:
# GET /api/jobs/ - список всех вакансий
# GET /api/jobs/{id}/ - детали конкретной вакансии
# POST /api/jobs/ - создание новой вакансии
# и т.д.
router.register(r'jobs', JobViewSet)

urlpatterns = [
    path('search/', views.job_search, name="job_search"),  # Страница поиска вакансий
    path('apply/<int:pk>/', views.apply_job, name='apply_job'),  # Подача заявления на вакансию
    path('api/', include(router.urls)),
]