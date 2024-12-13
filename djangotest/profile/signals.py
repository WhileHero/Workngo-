from django.db.models.signals import post_save
from django.contrib.auth.models import User
from django.dispatch import receiver
from .models import Info
from accounts.forms import RegistrationForm

@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        # Получаем отчество из временного атрибута, если оно есть
        patronymic = getattr(instance, '_patronymic', None)
        Info.objects.create(
            user=instance,
            patronymic=patronymic
        )

@receiver(post_save, sender=User)
def save_user_profile(sender, instance, **kwargs):
    try:
        # Обновляем отчество, если оно было изменено
        patronymic = getattr(instance, '_patronymic', None)
        if patronymic is not None:
            instance.info.patronymic = patronymic
        instance.info.save()
    except Info.DoesNotExist:
        Info.objects.create(
            user=instance,
            patronymic=getattr(instance, '_patronymic', None)
        )