from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse

from inventarios.models import Users, Areas, Types, States, Products
from inventarios.serializers import UserSerializer, AreaSerializer, TypeSerializer, StateSerializer, ProductSerializer

@csrf_exempt
def userApi(request, id=0):
   if request.method=='GET':
      users = Users.objects.all()
      users_serializer = UserSerializer(users, many=True)
      return JsonResponse(users_serializer.data, safe=False)
   elif request.method=='POST':
      user = JSONParser().parse(request)
      user_serializer = UserSerializer(data=user)
      if user_serializer.is_valid():
         user_serializer.save()
         return JsonResponse("Creacion exitosa", safe=False)
      return JsonResponse("Error en la creacion", safe=False)
   elif request.method=='PUT':
      user_data = JSONParser().parse(request)
      user = Users.objects.get(id=user_data['id'])
      user_serializer = UserSerializer(user, data=user_data)
      if user_serializer.is_valid():
         user_serializer.save()
         return JsonResponse("Actualizacion exitosa", safe=False)
      return JsonResponse("Error en la actualizacion", safe=False)
   elif request.method=='DELETE':
      try:
         user = Users.objects.get(id=id)
         user.delete()
         return JsonResponse("Eliminacion exitosa", safe=False)
      except Users.DoesNotExist:
         return JsonResponse("Id de usuario no existe", safe=False)
         
@csrf_exempt
def areaApi(request, id=0):
   if request.method=='GET':
      areas = Areas.objects.all()
      areas_serializer = AreaSerializer(areas, many=True)
      return JsonResponse(areas_serializer.data, safe=False)
   elif request.method=='POST':
      area = JSONParser().parse(request)
      area_serializer = AreaSerializer(data=area)
      if area_serializer.is_valid():
         area_serializer.save()
         return JsonResponse("Creacion exitosa", safe=False)
      return JsonResponse("Error en la creacion", safe=False)
   elif request.method=='PUT':
      area_data = JSONParser().parse(request)
      area = Areas.objects.get(id=area_data['id'])
      area_serializer = AreaSerializer(area, data=area_data)
      if area_serializer.is_valid():
         area_serializer.save()
         return JsonResponse("Actualizacion exitosa", safe=False)
      return JsonResponse("Error en la actualizacion", safe=False)
   elif request.method=='DELETE':
      try:
         area = Areas.objects.get(id=id)
         area.delete()
         return JsonResponse("Eliminacion exitosa", safe=False)
      except Areas.DoesNotExist:
         return JsonResponse("Id de area no existe", safe=False)

@csrf_exempt
def typeApi(request, id=0):
   if request.method=='GET':
      types = Types.objects.all()
      types_serializer = TypeSerializer(types, many=True)
      return JsonResponse(types_serializer.data, safe=False)
   elif request.method=='POST':
      type = JSONParser().parse(request)
      type_serializer = TypeSerializer(data=type)
      if type_serializer.is_valid():
         type_serializer.save()
         return JsonResponse("Creacion exitosa", safe=False)
      return JsonResponse("Error en la creacion", safe=False)
   elif request.method=='PUT':
      type_data = JSONParser().parse(request)
      type = Types.objects.get(id=type_data['id'])
      type_serializer = TypeSerializer(type, data=type_data)
      if type_serializer.is_valid():
         type_serializer.save()
         return JsonResponse("Actualizacion exitosa", safe=False)
      return JsonResponse("Error en la actualizacion", safe=False)
   elif request.method=='DELETE':
      try:
         type = Types.objects.get(id=id)
         type.delete()
         return JsonResponse("Eliminacion exitosa", safe=False)
      except Types.DoesNotExist:
         return JsonResponse("Id de tipo no existe", safe=False)

@csrf_exempt
def stateApi(request, id=0):
   if request.method=='GET':
      states = States.objects.all()
      states_serializer = StateSerializer(states, many=True)
      return JsonResponse(states_serializer.data, safe=False)
   elif request.method=='POST':
      state = JSONParser().parse(request)
      state_serializer = StateSerializer(data=state)
      if state_serializer.is_valid():
         state_serializer.save()
         return JsonResponse("Creacion exitosa", safe=False)
      return JsonResponse("Error en la creacion", safe=False)
   elif request.method=='PUT':
      state_data = JSONParser().parse(request)
      state = States.objects.get(id=state_data['id'])
      state_serializer = StateSerializer(state, data=state_data)
      if state_serializer.is_valid():
         state_serializer.save()
         return JsonResponse("Actualizacion exitosa", safe=False)
      return JsonResponse("Error en la actualizacion", safe=False)
   elif request.method=='DELETE':
      try:
         state = States.objects.get(id=id)
         state.delete()
         return JsonResponse("Eliminacion exitosa", safe=False)
      except States.DoesNotExist:
         return JsonResponse("Id de estado no existe", safe=False)

@csrf_exempt
def productApi(request, id=0):
   if request.method=='GET':
      products = Products.objects.all()
      products_serializer = ProductSerializer(products, many=True)
      return JsonResponse(products_serializer.data, safe=False)
   elif request.method=='POST':
      product = JSONParser().parse(request)
      product_serializer = ProductSerializer(data=product)
      print(product_serializer)
      if product_serializer.is_valid():
         product_serializer.save()
         return JsonResponse("Creacion exitosa", safe=False)
      return JsonResponse("Error en la creacion", safe=False)
   elif request.method=='PUT':
      product_data = JSONParser().parse(request)
      product = Products.objects.get(id=product_data['id'])
      product_serializer = ProductSerializer(product, data=product_data)
      if product_serializer.is_valid():
         product_serializer.save()
         return JsonResponse("Actualizacion exitosa", safe=False)
      return JsonResponse("Error en la actualizacion", safe=False)
   elif request.method=='DELETE':
      try:
         product = Products.objects.get(id=id)
         product.delete()
         return JsonResponse("Eliminacion exitosa", safe=False)
      except Products.DoesNotExist:
         return JsonResponse("Id de producto no existe", safe=False)
         
       
    
