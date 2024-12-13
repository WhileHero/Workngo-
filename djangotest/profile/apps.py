# Импортируем AppConfig из Django для настройки приложения
from django.apps import AppConfig

class ProfileConfig(AppConfig):
    # Указываем имя приложения
    name = 'profile'
    # Указываем значение по умолчанию для автоматического создания полей (опционально)
    default_auto_field = 'django.db.models.BigAutoField'

    def ready(self):
        """
        Метод ready() вызывается при загрузке приложения.
        Здесь мы импортируем файл signals.py, чтобы сигналы были зарегистрированы.
        """
        import profile.signals  # Импортируем сигналы для регистрации приемников