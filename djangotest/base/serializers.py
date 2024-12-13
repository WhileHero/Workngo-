from rest_framework import serializers
from .models import Jobs

# Сериализатор преобразует модели Django в JSON и обратно
class JobSerializer(serializers.ModelSerializer):
    class Meta:
        model = Jobs
        # '__all__' означает, что мы хотим сериализовать все поля модели
        fields = '__all__'