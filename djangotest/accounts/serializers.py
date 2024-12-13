from rest_framework import serializers
from django.contrib.auth.models import User

class UserSerializer(serializers.ModelSerializer):
    patronymic = serializers.CharField(required=False, allow_blank=True)  

    class Meta:
        model = User
        fields = ('id', 'username', 'password', 'first_name', 'last_name', 'patronymic')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        patronymic = validated_data.pop('patronymic', '')  
        user = User.objects.create_user(
            username=validated_data['username'],
            password=validated_data['password'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name']
        )
        user._patronymic = patronymic
        user.save()
        return user