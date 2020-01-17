from django import forms
from .models import Search

class SearchForm(forms.ModelForm):
    company = forms.CharField(label='',required=True, 
        widget=forms.Textarea(
            attrs={
                "placeholder" : "Company name to search for",
                'rows': 1,
                
            }
        )
    )

    class Meta:
        model = Search
        fields = [
            'company'
        ]

