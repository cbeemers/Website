from django import forms
from .models import Email, Money

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


class MoneyForm(forms.ModelForm):

    header = forms.CharField(label='',required=True, 
        widget=forms.Textarea(
            attrs={
                "placeholder" : "Header being added to",
                "cols" : 100,
                "rows" : 1
            }
        )
    )

    data = forms.EmailField(label='', required=True,
        widget=forms.Textarea(
            attrs={
                "placeholder" : "Data added",
                "cols" : 100,
                "rows" : 1
            }
        )
    )

    class Meta:
        model = Money
        fields = [
            'header',
            'data'
        ]