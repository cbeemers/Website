from django.shortcuts import render
from .forms import ContactForm
from django.template.loader import get_template
from django.core.mail import EmailMessage
from django.contrib import messages

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

def contact_view(request):
    form_class = ContactForm(request.POST or None)
    context = {
        'form' : form_class
    }

    if request.method == 'POST':
        subject = request.POST.get('subject', '')
        contact_email = request.POST.get('return_address', '')
        content = request.POST.get('content', '')

        template = get_template('pages/contact_template.txt')

        context = {
            'subject': subject, 
            'return_address' : contact_email,
            'content' : content,
            }
        content_template = template.render(context)
        email = EmailMessage(
            "New contact form submission",
            content,
            "Your website" + '',
            ['cbeems13@gmail.com'],
            headers = {'Reply-To': contact_email}
        )
        email.send()
        if form_class.is_valid():
            form_class.save()
        messages.info(request, 'Message Sent!')

    return render(request, 'pages/contact.html', { 'form' : form_class })
