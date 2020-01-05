from django.shortcuts import render, redirect
from .forms import ContactForm
from django.template.loader import get_template
from django.core.mail import EmailMessage, send_mail
from django.contrib import messages
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth import login, logout, authenticate
from django.contrib.auth.models import User
from django.db import IntegrityError


# Create your views here.


def home_view(request):
    form_class = ContactForm
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

def email_view(request):
    return

def snake_view(request):
    context = {}
    return render(request, 'pages/games/snake.html', context)

def brickbreak_view(request):
    context = {}
    return render(request, 'pages/games/brickbreak.html', context)

def contact_view(request):
    form = ContactForm(request.POST or None)
    context = {
        'form' : form
    }

    if request.method == 'POST':
        subject = request.POST.get('subject', '')
        contact_email = request.POST.get('return_address', '')
        content = request.POST.get('content', '')

        if form.is_valid():
            form.save()
        messages.info(request, 'Message Sent!')

        send_mail(
            subject,
            contact_email + '\n' + content,
            contact_email,
            ['cbeems13@gmail.com'],
            fail_silently=False,
        )


    return render(request, 'pages/contact.html', context)

def signup_view(request):
    form = SignupForm(request.POST or None)
    context = {
        'form' : form
    }
    return render(request, 'pages/signup.html', context)
