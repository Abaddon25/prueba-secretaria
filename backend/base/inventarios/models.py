from django.db import models

class Users(models.Model):
    Name = models.CharField(max_length=250)
    Email = models.EmailField(max_length=255)
    Password = models.CharField(max_length=25)


class Areas(models.Model):
    Name = models.CharField(max_length=100)
    Description = models.CharField(max_length=255)


class Types(models.Model):
    Name = models.CharField(max_length=100)
    Description = models.CharField(max_length=255)
 

class States(models.Model):
    Name = models.CharField(max_length=100)
    Description = models.CharField(max_length=255)


class Products(models.Model):
    Name = models.CharField(max_length=100)
    Description = models.CharField(max_length=255)
    Serial = models.CharField(max_length=255)
    Price = models.DecimalField(max_digits=15, decimal_places=2)
    Quantity = models.IntegerField(default=0)
    Date = models.DateField()
    Type = models.ForeignKey(Types, on_delete=models.CASCADE, null=True)
    State = models.ForeignKey(States, on_delete=models.CASCADE, null=True)
    Area = models.ForeignKey(Areas, on_delete=models.CASCADE, null=True)
    User = models.ForeignKey(Users, on_delete=models.CASCADE, null=True)