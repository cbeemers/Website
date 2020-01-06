from django.shortcuts import render

from django.shortcuts import render, redirect
from .forms import SignupForm, ProfileForm
from django.template.loader import get_template
from django.core.mail import EmailMessage, send_mail
from django.contrib import messages
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth import login, logout, authenticate
from django.contrib.auth.models import User
from django.db import IntegrityError
from pages.views import home_view



# Create your views here.


def account_logout(request):

    logout(request)
    return redirect(home_view)


def account_view(request):
    form = ProfileForm
    # if form.is_valid():
    # form.save()
    context = {
        'form': form
    }
    return render(request, 'accounts/account.html', context)


def register(request):
    form = SignupForm
    if request.method == "POST":
        form = SignupForm(request.POST)

        if form.is_valid():
            # form.save()
            try:
                email = request.POST.get('email', '')
                user = User.objects.create_user(request.POST.get('username',''), email, request.POST.get('password', ''))
                user.save()
                login(request, user)
                send_mail(
                    'Account Created!',
                    'Thank you for creating an account with my website and I hope you will stay up to date with the continuous changes I plan to make.',
                    email,
                    [email],
                    fail_silently=False,
                )
                return redirect(home_view)
            except IntegrityError:
                messages.info(request, "Invalid sign in")

            # login(request, user)
            
    
    context = {
        'form' : form
    }

    return render(request, "accounts/signup.html", context)


def login_view(request):
    form = SignupForm


    if request.method == 'POST':
        try:
            user = authenticate(email= request.POST.get('email',''), username=request.POST.get('username', ''), password=request.POST.get('password', ''))
            login(request, user)
            return redirect(home_view)
        except AttributeError:
            messages.info(request, "User not found")


    return render(request, 'accounts/login.html', {'form': form})