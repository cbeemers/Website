from django import forms
from .models import Email, Signup

class ContactForm(forms.ModelForm):
    subject = forms.CharField(label='',required=True, 
        widget=forms.Textarea(
            attrs={
                "placeholder" : "Subject",
                "cols" : 100,
                "rows" : 1
            }
        )
    )

    return_address = forms.EmailField(label='', required=True,
        widget=forms.Textarea(
            attrs={
                "placeholder" : "Your Email",
                "cols" : 100,
                "rows" : 1
            }
        )
    )

    content = forms.CharField(label='', required=True, 
        widget=forms.Textarea(
            attrs={
                "cols" : 100, 
            }
        )
    )
    class Meta:
        model = Email
        fields = [
            'subject',
            'return_address',
            'content',
        ]

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