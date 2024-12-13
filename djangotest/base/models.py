from django.db import models
from django.contrib.postgres.fields import ArrayField
from datetime import time

# Create your models here.


class Jobs(models.Model):
    DAYS_CHOICES = [
        ('ПН', 'Понедельник'),
        ('ВТ', 'Вторник'),
        ('СР', 'Среда'),
        ('ЧТ', 'Четверг'),
        ('ПТ', 'Пятница'),
        ('СБ', 'Суббота'),
        ('ВС', 'Воскресенье'),
    ]

    title = models.CharField(max_length=200)
    company = models.CharField(max_length=200)
    location = models.CharField(max_length=200)
    description = models.TextField(null=True)
    work_days = ArrayField(
        models.CharField(max_length=2, choices=DAYS_CHOICES),
        default=list,
        blank=True,
        help_text="Выберите дни работы"
    )
    work_hours_start = models.TimeField(
        help_text="Время начала работы",
        default=time(9, 0)  # 9:00 по умолчанию
    )
    work_hours_duration = models.IntegerField(
        help_text="Длительность смены в часах",
        default=8  # 8 часов по умолчанию
    )
    salary = models.CharField(max_length=200)

    def __str__(self):
        return self.title