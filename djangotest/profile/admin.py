from django.contrib import admin

# Register your models here.

# Импортируем модель Info из текущего приложения
from .models import Info

# Создаем класс админки для модели Info
class ProfileAdmin(admin.ModelAdmin):
    # Определяем поля, которые будут отображаться в списке объектов
    list_display = ('user', 'patronymic')
    
    # Добавляем возможность поиска по указанным полям
    search_fields = ('user__username', 'user__first_name', 'user__last_name', 'patronymic')
    
    # Опционально: Добавляем фильтры по определенным полям
    list_filter = ('user__is_active', 'user__is_staff')

# Регистрируем модель Info вместе с настроенным классом админки
admin.site.register(Info, ProfileAdmin)