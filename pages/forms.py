from django import forms
from .models import Email

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