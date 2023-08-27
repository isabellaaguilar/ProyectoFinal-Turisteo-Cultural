from api.models import User
from django.contrib.auth.password_validation import validate_password
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

from api.models import Actividad
from api.models import TipoEvento, ActividadTipo

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'fecha_nacimiento','nacional')



# class ActividadSerializer(serializers.ModelSerializer):
#         class Meta2:
#          model = Actividad
#          fields = ('nombre', 'longitud', 'latitud', 'fecha','descripcion','img1','img2')

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod

    # def get_token2(cls, act):
    #     token2 = super().get_token(act)
        
    #     # These are claims, you can add custom claims
    #     token2['nombre'] = act.nombre
    #     token2['longitud'] = act.longitud
    #     token2['latitud'] = act.latitud
    #     token2['fecha'] = act.fecha
    #     token2['descripcion'] = act.descripcion
    #     token2['img1'] = act.profile.bio
    #     token2['img2'] = act.profile.bio

    #     # ...
    #     return token2


    def get_token(cls, user):
        token = super().get_token(user)
        
        # These are claims, you can add custom claims
        token['full_name'] = user.profile.full_name
        token['username'] = user.username
        token['email'] = user.email
        token['fecha_nacimiento'] = user.fecha_nacimiento
        token['nacional'] = user.nacional

        token['bio'] = user.profile.bio
        token['image'] = str(user.profile.image)
        token['verified'] = user.profile.verified
        # ...
        return token
    

class TipoEventoActividadSerializer(serializers.Serializer):  # Debes heredar de serializers.Serializer
    def to_representation(self, validated_data):
        return {'value':validated_data.id, 'label': validated_data.nombre}
    

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(
        write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = User
        fields = ('email', 'username','fecha_nacimiento', 'password', 'password2','nacional')

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError(
                {"password": "Password fields didn't match."})

        return attrs
  
      

    def create(self, validated_data):
        print(validated_data)
        print('das')
        user = User.objects.create(
            username=validated_data['username'],
            email=validated_data['email'],
            fecha_nacimiento = validated_data['fecha_nacimiento'],
            
            nacional = validated_data['nacional']

        )

        user.set_password(validated_data['password'])
        user.save()

        return user
    


class TipoEventoSerializer(serializers.ModelSerializer):
    class Meta:
        model = TipoEvento
        fields = '__all__'


class RegisterSerializerActividad(serializers.ModelSerializer):
    class Meta:
        model = Actividad
        fields = ('nombre', 'longitud', 'latitud', 'fecha', 'descripcion', 'img1', 'img2')

    def create(self, validated_data):
    
        tipo_eventos_a_registrar = self.context['request'].data.get('tipoEventosARegistrar', "")

        act = Actividad.objects.create(
            nombre=validated_data['nombre'],
            longitud=validated_data['longitud'],
            latitud=validated_data['latitud'],
            fecha=validated_data['fecha'],
            descripcion=validated_data['descripcion'],
            img1=validated_data['img1'],
            img2=validated_data['img2'],
        )

        act.save()

        for tipo_evento_id in tipo_eventos_a_registrar.split(","):
            tipo_evento_instance = TipoEvento.objects.get(id=tipo_evento_id)

            actividad_tipo = ActividadTipo.objects.create(
                tipoevento=tipo_evento_instance,
            )

            actividad_tipo.idactividades.add(act)  # Agregar la relación many-to-many a través de la instancia de ActividadTipo

        return act