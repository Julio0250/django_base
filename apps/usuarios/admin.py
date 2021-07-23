#django
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

#own
from .models import *

# Register your models here.
admin.site.register(Usuario, UserAdmin)