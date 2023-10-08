from django.db import models

# Create your models here.


class GroceryItems(models.Model):
    product_name = models.CharField(max_length=250,unique=True)
    quantity = models.PositiveIntegerField()
    unit_price = models.DecimalField(max_digits=10,decimal_places=2)
    price = models.DecimalField(max_digits=10,decimal_places=2)
    date = models.DateField(auto_now_add=True)

    def __str__(self) -> str:
        return self.product_name
    
    