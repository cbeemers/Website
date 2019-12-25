from django.shortcuts import render

# Create your views here.

def home_view(request):
    context = {

    }
    return render(request, 'pages/home.html', context)

def welcome_view(request):
    context = {

    }
    return render(request, 'pages/welcome.html', context)