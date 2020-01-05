from django.db import models
from django.contrib.auth.models import User, AbstractUser
from django.db.models.signals import post_save
from django.dispatch import receiver

# Create your models here.

# class Profile(models.Model):
#     user = models.OneToOneField(User, on_delete=models.CASCADE)
#     bio = models.TextField(max_length=400, blank=True)
#     avatar = models.ImageField(upload_to='avatars/', null=True, blank=True)

    # @receiver(post_save, sender=User)
    # def create_user_profile(self, sender, instance, created, **kwargs):
    #     if created:
    #         Profile.objects.create(user=instance)

    # @receiver(post_save, sender=User)
    # def save_user_profile(self, sender, instance, **kwargs):
    #     instance.profile.save()


# class User(AbstractUser):
#     bio = models.TextField(max_length=400, blank=True)
#     avatar = models.ImageField(upload_to='avatars/', null=True, blank=True)


class Email(models.Model):
    subject = models.CharField(max_length=120, blank=True)
    return_address = models.CharField(max_length=120, blank=True)
    content = models.TextField(blank=True)


