from django import forms
from .models import Signup, UserProfile


class SignupForm(forms.ModelForm):
    email = forms.EmailField(label='',required=True, 
        widget=forms.Textarea(
            attrs={
                "placeholder" : "Email",
                "style": 'width: 400px',
                "rows" : 1
            }
        )
    )

    username = forms.CharField(label='', required=False,
        widget=forms.Textarea(
            attrs={
                "placeholder" : "Username (optional)",
                "style" : 'width: 400px',
                "rows" : 1
            }
        )
    )

    password = forms.CharField(label='', required=True,
        widget=forms.PasswordInput(
            attrs={
                "placeholder": "Password",
                "style": 'width: 400px'
                
            }
        )
    )

    class Meta:
        model = Signup
        fields = [
            'email',
            'username',
            'password',
        ]

class ProfileForm(forms.ModelForm):
    avatar = forms.ImageField()

    class Meta:
        model = UserProfile
        fields = [
            'avatar',

        ]