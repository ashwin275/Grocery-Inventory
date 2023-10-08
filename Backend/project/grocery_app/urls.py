from django.urls import path
from . import views
urlpatterns = [
    path('',views.GroceryBackendApi,name=''),
    path('grocery_items/',views.GroceryItemApiView.as_view(),name='grocery_items')
]
