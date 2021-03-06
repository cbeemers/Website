"""mysite URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path

from pages.views import (
    home_view,
    welcome_view,
    games_view,
    money_view,
    contact_view,
    snake_view,
    brickbreak_view,
    signup_view,
    sudoku_view,
    maze_view

)

from accounts.views import (
    account_view,
    account_logout,
    register,
    login_view,
)

# from scrape.views import scrape_view

urlpatterns = [
    path('admin/', admin.site.urls),
    # path('', welcome_view, name='welcome-view'),
    path('account', account_view, name='account-view'),
    path('account/logout', account_logout, name='account-logout'),
    path('', home_view, name='home-view'),
    path('sign-up', register, name='register'),
    path('login', login_view, name='login-view'),
    path('games/', games_view, name ='games-view'),
    path('games/brickbreak', brickbreak_view, name='brickbreak-view'),
    path('games/snake', snake_view, name='snake-view'),
    path('money/', money_view, name='money-view'),
    path('contact/', contact_view, name='contact-view'),
    path('games/sudoku', sudoku_view, name='sudoku-view'),
    path('games/maze', maze_view, name='maze-view'),
    # path('scrape', scrape_view, name='scrape-view'),

]
