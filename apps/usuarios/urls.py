from django.conf.urls import url
from django.contrib.auth import views as auth_views
from django.contrib.auth.decorators import login_required
from django.urls import path

app_name = 'usuarios'
urlpatterns = [

    #Seguridad
    path('login/', auth_views.LoginView.as_view(template_name="usuarios/login.html"), name='login'),
    path('logout/', auth_views.LogoutView.as_view(), name='logout'),

]
