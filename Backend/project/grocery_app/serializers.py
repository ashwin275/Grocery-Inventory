from rest_framework import serializers
from .models import GroceryItems


class GroceryItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = GroceryItems
        fields = "__all__"
        read_only_fields = ['price']


    def create(self, validated_data):
        validated_data['price'] = validated_data['unit_price'] * validated_data['quantity']
        return super().create(validated_data)
    