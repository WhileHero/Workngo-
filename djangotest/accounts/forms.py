from django import forms
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User

class RegistrationForm(UserCreationForm):
    email = forms.EmailField(required=True, label='Электронная почта')
    first_name = forms.CharField(required=True, max_length=30, label='Имя')
    last_name = forms.CharField(required=True, max_length=30, label='Фамилия')
    patronymic = forms.CharField(required=False, max_length=30, label='Отчество')

    class Meta:
        model = User
        fields = ('username', 'email', 'first_name', 'last_name', 'patronymic', 'password1', 'password2')