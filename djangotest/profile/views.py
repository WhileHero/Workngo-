from django.shortcuts import render, get_object_or_404
from django.contrib.auth.decorators import login_required
from .models import Info
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
import json

@login_required
def profile_info(request):
    profile = get_object_or_404(Info, user=request.user)
    applied_jobs = profile.applied_jobs.all()
    context = {
        'profile': profile,
        'applied_jobs': applied_jobs
    }
    return render(request, 'info.html', {
        'user': request.user,
    })

@login_required
@require_http_methods(["POST"])
def update_biography(request):
    try:
        data = json.loads(request.body)
        new_biography = data.get('biography', '').strip()
        
        # Обновляем биографию пользователя
        request.user.info.biography = new_biography
        request.user.info.save()
        
        return JsonResponse({'success': True})
    except Exception as e:
        return JsonResponse({'success': False, 'error': str(e)})