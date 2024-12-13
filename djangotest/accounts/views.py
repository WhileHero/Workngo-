from django.shortcuts import render, redirect
from django.contrib.auth import login
from .forms import RegistrationForm
from django.contrib import messages
from profile.models import Info
from django.views.decorators.csrf import csrf_protect

@csrf_protect
def register(request):
    if request.method == 'POST':
        form = RegistrationForm(request.POST)
        if form.is_valid():
            user = form.save(commit=False)
            # Сохраняем поля first_name и last_name в модели User
            user.first_name = form.cleaned_data.get('first_name')
            user.last_name = form.cleaned_data.get('last_name')
            user.save()
            # Сохраняем patronymic в модели Info через сигнал
            patronymic = form.cleaned_data.get('patronymic')
            # Профиль создаётся автоматически сигналом, добавим patronymic
            profile = Info.objects.get(user=user)
            if patronymic:
                profile.patronymic = patronymic
                profile.save()
            login(request, user)  # Автоматический вход после регистрации
            messages.success(request, 'Регистрация прошла успешно!')
            print('Регистрация прошла успешно!')
            return redirect('home')
    else:
        form = RegistrationForm()
    return render(request, 'register.html', {'form': form})