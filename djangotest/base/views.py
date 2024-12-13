from django.shortcuts import render, get_object_or_404, redirect
from django.contrib.auth.decorators import login_required
from .models import Jobs
from profile.models import Info
from django.contrib import messages
from django.db.models import Q

def job_search(request):
    """Отображает результаты поиска вакансий."""
    title = request.GET.get('title', '')
    min_salary = request.GET.get('min_salary', '')
    city = request.GET.get('city', '')
    available_days = request.GET.getlist('available_days', [])
    max_hours = request.GET.get('max_hours', '')

    jobs = Jobs.objects.all()

    if title:
        jobs = jobs.filter(title__icontains=title)
    
    if city:
        jobs = jobs.filter(location__iregex=f'г\. {city}')
    
    if min_salary:
        min_salary_value = int(min_salary)
        jobs = jobs.filter(salary__gte=min_salary_value)

    # Фильтрация по дням работы
    if available_days:
        jobs = jobs.filter(work_days__contains=available_days)

    # Фильтрация по длительности смены
    if max_hours:
        jobs = jobs.filter(work_hours_duration__lte=int(max_hours))

    jobs = jobs.order_by('-id')

    context = {
        'jobs': jobs,
        'title': title,
        'min_salary': min_salary,
        'city': city,
        'available_days': available_days,
        'max_hours': max_hours,
        'days_choices': Jobs.DAYS_CHOICES,
    }
    return render(request, 'job_search.html', context)

def job_detail(request, pk):
    job = get_object_or_404(Jobs, pk=pk)
    context = {'job': job} 
    return render(request, 'job_detail.html', context)

@login_required  # Требует, чтобы пользователь был авторизован
def apply_job(request, pk):
    """
    Обрабатывает подачу заявления на вакансию.
    
    :param request: HTTP-запрос
    :param pk: Первичный ключ вакансии
    :return: Перенаправление на страницу вакансии с сообщением об успешной подаче заявления
    """
    # Получаем объект вакансии по первичному ключу или возвращаем 404, если не найден
    job = get_object_or_404(Jobs, pk=pk)
    
    # Получаем профиль текущего пользователя
    profile = get_object_or_404(Info, user=request.user)
    
    # Проверяем, не подал ли уже пользователь заявление на эту вакансию
    if job in profile.applied_jobs.all():
        messages.info(request, 'Вы уже подали заявление на эту вакансию.')
    else:
        # Добавляем вакансию в список поданных заявлений пользователя
        profile.applied_jobs.add(job)
        messages.success(request, 'Ваше заявление успешно подано.')
    
    # Перенаправляем пользователя обратно на страницу вакансии
    return redirect('job_detail', pk=pk)