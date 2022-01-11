from django.db.models import fields
from rest_framework.serializers import ModelSerializer
from inventarios.models import Users, Areas, Types, States, Products

class UserSerializer(ModelSerializer):
   class Meta:
      model=Users
      fields=('id', 'Name', 'Email', 'Password')

class AreaSerializer(ModelSerializer):
   class Meta:
      model=Areas
      fields=('id', 'Name', 'Description')

class TypeSerializer(ModelSerializer):
   class Meta:
      model=Types
      fields=('id', 'Name', 'Description')

class StateSerializer(ModelSerializer):
   class Meta:
      model=States
      fields=('id', 'Name', 'Description')

class ProductSerializer(ModelSerializer):
   class Meta:
      model=Products
      fields=('id', 'Name', 'Description', 'Serial', 'Price', 'Quantity', 'Date', 'Type', 'State', 'Area', 'User')