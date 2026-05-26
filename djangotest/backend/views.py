from django.shortcuts import render

def home(request):
    """Отображает главную страницу."""
    return render(request, 'home.html')