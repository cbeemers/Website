from django.db import models
from django.contrib.auth.models import User, AbstractUser
from django.db.models.signals import post_save
from django.dispatch import receiver


class Email(models.Model):
    subject = models.CharField(max_length=120, blank=True)
    return_address = models.CharField(max_length=120, blank=True)
    content = models.TextField(blank=True)


class Money(models.Model):
    header = models.CharField(max_length=120, blank=True)
    data = models.CharField(max_length=120, blank=True)