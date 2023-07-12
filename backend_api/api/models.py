from django.db import models
from django.db.models.signals import post_save
from django.contrib.auth.models import AbstractUser



class User(AbstractUser):
    username = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    fecha_nacimiento = models.CharField(max_length=10, blank=True, null=True)

    # es_extranjera = models.BooleanField(default=False)
    # if es_extranjera==True:
    #     es_extranjera: "Nacional"
    # else:   
    #     es_extranjera: "Extranjera"


    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    # def save(self, *args, **kwargs):
    #     if self.fecha_nacimiento:
    #         try:
    #             datetime.strptime(self.fecha_nacimiento, '%Y-%m-%d')
    #         except ValueError:
    #             raise ValueError('El formato de fecha de nacimiento no es válido. Utiliza el formato YYYY-MM-DD.')
    #     super().save(*args, **kwargs)

    def profile(self):
        profile = Profile.objects.get(user=self)

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    full_name = models.CharField(max_length=1000)
    bio = models.CharField(max_length=100)
    image = models.ImageField(upload_to="user_images", default="default.jpg")
    verified = models.BooleanField(default=False)

def create_user_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)

def save_user_profile(sender, instance, **kwargs):
    instance.profile.save()

post_save.connect(create_user_profile, sender=User)
post_save.connect(save_user_profile, sender=User)

