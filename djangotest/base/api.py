from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Jobs
from .serializers import JobSerializer

# ViewSet автоматически создает CRUD endpoints для модели Jobs
class JobViewSet(viewsets.ModelViewSet):
    # Получаем все объекты модели Jobs
    queryset = Jobs.objects.all()
    # Указываем, какой сериализатор использовать
    serializer_class = JobSerializer

    @action(detail=False, methods=['get'])
    def search(self, request):
        title = request.query_params.get('title', '')
        min_salary = request.query_params.get('min_salary', '')
        city = request.query_params.get('city', '')
        available_days = request.query_params.getlist('available_days', [])
        max_hours = request.query_params.get('max_hours', '')

        jobs = self.get_queryset()

        if title:
            jobs = jobs.filter(title__icontains=title)
        if city:
            jobs = jobs.filter(location__iregex=rf'г\. {city}')
        if min_salary:
            jobs = jobs.filter(salary__gte=int(min_salary))
        if available_days:
            jobs = jobs.filter(work_days__contains=available_days)
        if max_hours:
            jobs = jobs.filter(work_hours_duration__lte=int(max_hours))

        serializer = self.get_serializer(jobs, many=True)
        return Response(serializer.data)