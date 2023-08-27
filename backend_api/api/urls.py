from django.urls import path
from . import views
from django.contrib import admin

from rest_framework_simplejwt.views import (
    TokenRefreshView,
)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('token/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    # path('token2/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('register/', views.RegisterView.as_view(), name='auth_register'),    
    path('registerActividad/', views.RegisterViewAct.as_view(), name='register_actividad'),
    path('tipoEvento/', views.TipoEventopViewAcr.as_view(), name='obtener_tipo_eventos'),
    path('test/', views.testEndPoint, name='test'),
    path('', views.getRoutes),
]