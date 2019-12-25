from django.urls import path
from .views import (
    home_view,
    welcome_view,
)

app_name = 'pages'
urlpatterns = [
    path('home/', home_view.as_view(), name='home-view'),
    path('', welcome_view.as_view(), name='welcome-view')

]