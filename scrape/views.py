from django.shortcuts import render, redirect
from .forms import SearchForm
from .stock import get_abbrev, get_data
# Create your views here.


def scrape_view(request):
    form = SearchForm(request.POST or None)
    context = {'form': form}
    if request.method == 'POST':
        company = request.POST.get('company', '')
        abbrev = get_abbrev(company)
        data = get_data(abbrev)
        context = {
            'form': form,
            'data' : data,
            
        }
        return render(request, 'scrape/scrape.html', context)


    return render(request, 'scrape/scrape.html', context)