from django.urls import path
from inventarios import views

urlpatterns=[
   path('user', views.userApi),
   path('user/<int:id>', views.userApi),
   path('area', views.areaApi),
   path('area/<int:id>', views.areaApi),
   path('type', views.typeApi),
   path('type/<int:id>', views.typeApi),
   path('state', views.stateApi),
   path('state/<int:id>', views.stateApi),
   path('product', views.productApi),
   path('product/<int:id>', views.productApi)
]