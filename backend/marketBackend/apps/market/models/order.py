from django.db import models
from .product import Product
from .custom_user  import CustomUser

class Order(models.Model):
    class OrderType(models.TextChoices):
        Justin = 'JUSTIN'
        NewPost = 'NEW_POST'
        NewPostCourier = 'NEW_POST_COURIER'
    class OrderType(models.TextChoices):
        Completed = 'COMPLETED'
        Canceled = 'CANCELED'
        OnHold = 'ON_HOLD'
        Processing = 'PROCESSING'
        Delivered = 'DELIVERED'
        
    
    internalNotes = models.CharField( max_length=1000, blank=True, default='')    
    orderType = models.CharField(max_length=100, choices=OrderType.choices)
    orderStatus = models.CharField(max_length=50, choices=OrderType.choices, default=OrderType.Processing)
    recipientName = models.CharField(max_length=100)
    recipientSecondName = models.CharField(max_length=100)
    recipientSurname = models.CharField(max_length=100)
    phoneNumber = models.CharField(max_length=100)
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, blank=True, null=True)
    street = models.CharField( max_length=1000, blank=True, default='')
    city = models.CharField( max_length=1000, blank=True, default='')
    house = models.CharField( max_length=100, blank=True, default='')
    officeRef = models.CharField( max_length=100, blank=True, default='')
    officeDescription = models.CharField( max_length=1000, blank=True, default='')
    apartment = models.CharField( max_length=100, blank=True, default='')

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


class OrderDetails(models.Model):
    quantity = models.IntegerField(default=1)
    order = models.ForeignKey(Order, related_name="details", on_delete=models.CASCADE)
    product = models.ForeignKey(Product, related_name="products", on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)