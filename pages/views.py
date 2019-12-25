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

def games_view(request):
    context = {}
    return render(request, 'pages/games.html', context)

def money_view(request):
    context = {}
    return render(request, 'pages/money.html', context)