from django.db import models
from django.db.models.signals import post_save
from django.contrib.auth.models import AbstractUser



class User(AbstractUser):
    username = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    fecha_nacimiento = models.CharField(max_length=10, blank=True, null=True)
    nacional = models.BooleanField(default=True)



    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']


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





class TipoEvento(models.Model):
    nombre = models.CharField(max_length=100)
    descripcion = models.TextField()

class ActividadTipo(models.Model):
    tipoevento = models.ForeignKey(TipoEvento, on_delete=models.CASCADE)
    idactividades = models.ManyToManyField('Actividad')

class Actividad(models.Model):
    nombre = models.CharField(max_length=100)
    longitud = models.DecimalField(max_digits=10, decimal_places=6)
    latitud = models.DecimalField(max_digits=10, decimal_places=6)
    fecha = models.DateField()
    descripcion = models.TextField()
    img1 = models.ImageField(upload_to="actividad_images", blank=True, null=True)
    img2 = models.ImageField(upload_to="actividad_images", blank=True, null=True)

class UsuarioActividad(models.Model):
    idusuario = models.ForeignKey(User, on_delete=models.CASCADE)
    idactividad = models.ForeignKey(Actividad, on_delete=models.CASCADE)
    fecha_de_interes = models.DateField()