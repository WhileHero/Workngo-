from django.db import models
from django.contrib.auth.models import User
from django.urls import reverse

# Create your models here.


# Создаём модель профиля пользователя с полным именем (ФИО)
class Info(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    patronymic = models.CharField(max_length=150, blank=True, null=True)
    biography = models.TextField(blank=True, null=True)
    applied_jobs = models.ManyToManyField('base.Jobs', related_name='applicants', blank=True)

    def __str__(self):
        return f"{self.get_full_name()}'s Profile"

    def get_absolute_url(self):
        return reverse('profile_info')

    def get_full_name(self):
        """Возвращает полное имя пользователя (ФИО)."""
        first_name = self.user.first_name
        last_name = self.user.last_name
        patronymic = self.patronymic or ''
        return f"{first_name} {patronymic} {last_name}".strip()


class AppliedJob(models.Model):
    profile = models.ForeignKey(Info, on_delete=models.CASCADE)
    job = models.ForeignKey('base.Jobs', on_delete=models.CASCADE)
    applied_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.profile.user.username} applied to {self.job.title}"