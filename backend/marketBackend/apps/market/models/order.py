from django.db import models
from .product import Product
from django.contrib.auth.models import User

class Order(models.Model):
    class OrderType(models.TextChoices):
        Justin = 'JUSTIN'
        NewPost = 'NEW_POST'
        NewPostCourier = 'NEW_POST_COURIER'
        
    orderType = models.CharField(max_length=100, choices=OrderType.choices)
    recipientName = models.CharField(max_length=100)
    recipientSecondName = models.CharField(max_length=100)
    recipientSurname = models.CharField(max_length=100)
    phoneNumber = models.CharField(max_length=100)
    user = models.ForeignKey(User, on_delete=models.CASCADE, blank=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


class OrderDetails(models.Model):
    quantity = models.IntegerField(default=1)
    order = models.ForeignKey(Order, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)