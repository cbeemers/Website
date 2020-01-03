from django.urls import path
from .views import (
    home_view,
    welcome_view,
    snake_view,
    brickbreak_view,
    account_logout
)

app_name = 'pages'
urlpatterns = [
    path('home/', home_view.as_view(), name='home-view'),
    path('', welcome_view.as_view(), name='welcome-view'),
    path('logout', account_logout, name='account-logout'),

]