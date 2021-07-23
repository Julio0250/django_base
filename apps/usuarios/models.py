#django
from django.contrib.auth.models import AbstractUser
from django.db import models

#own

#3rd
from simple_history.models import HistoricalRecords

#python


# Create your models here.

class Usuario(AbstractUser):
	full_name = models.CharField(max_length=150, default='')
	def __str__(self):
		return self.username

	def save(self, *args, **kwargs):
		self.full_name = str(self.first_name)+' '+str(self.last_name)
		super().save(*args, **kwargs)