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
    email = forms.CharField(label='',required=True, 
        widget=forms.Textarea(
            attrs={
                "placeholder" : "Email",
                "cols" : 50,
                "rows" : 1
            }
        )
    )

    password = forms.EmailField(label='', required=True,
        widget=forms.Textarea(
            attrs={
                "placeholder" : "Password",
                "cols" : 50,
                "rows" : 1
            }
        )
    )

    class Meta:
        model = Signup
        fields = [
            'email',
            'password',
        ]