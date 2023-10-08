from django.http import HttpResponse
from rest_framework.response import Response
from rest_framework import status
import datetime
from rest_framework.decorators import APIView
from rest_framework.exceptions import NotFound
from .serializers import GroceryItemSerializer
from .models import GroceryItems
from django.db.models import Sum

# Create your views here.


def GroceryBackendApi(request):
    now = datetime.datetime.now()

    formatted_time = now.strftime("%I:%M %p")
    formatted_date = now.strftime("%d-%m-%y")
    html = """
    <html>
    <head>
    <style>
    body {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        margin: 0;
        background-color: #f5f5f5;
        font-family: Arial, sans-serif;
    }
    .container {
        text-align: center;
        padding: 20px;
        background-color: #ffffff;
        border-radius: 8px;
        box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
    }
    h1 {
        font-size: 28px;
        margin-bottom: 10px;
    }
    p {
        font-size: 18px;
        color: #666666;
    }
    </style>
    </head>
    <body>
    <div class="container">
        <h1>Welcome to Grocery Inventory API </h1>
  
        <p>Time: %s<br>Date: %s</p>
    </div>
    </body>
    </html>
    """ % (formatted_date, formatted_time)
    return HttpResponse(html)


class GroceryItemApiView(APIView):
    def post(self, request):
        try:
            if not request.data:
                return Response({
                    'error': 'no data provide',
                    'details': 'provide a valid data'
                }, status=status.HTTP_400_BAD_REQUEST)

            serializer = GroceryItemSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response({'message': 'Grocery Item Successfully Added', 'payload': serializer.data}, status=status.HTTP_201_CREATED)
            else:
                return Response({'error': 'invalid data', 'details': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def get(self, request):

        try:
            grocery_item_instance = GroceryItems.objects.all().order_by('id')
            
            
            if not grocery_item_instance:
                return Response({'message': 'No grocery items founds please add .', 'payload': []}, status=status.HTTP_200_OK)
            serializer = GroceryItemSerializer(
                grocery_item_instance, many=True)
            total_sum = GroceryItems.objects.aggregate(total_sum=(Sum("price")))['total_sum'] or 0
            total_sum = '{:.2f}'.format(total_sum)
            
            return Response({'message': 'Grocery Items successfully retrieved.', 'payload': serializer.data,'total_sum': total_sum}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
