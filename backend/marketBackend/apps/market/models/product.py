from django.db import models
from .image import ImageAlbum
class Product(models.Model):

    title = models.CharField(max_length=300)
    price = models.IntegerField()
    description = models.TextField(max_length=2000, help_text="This is the description of the product")
    images = models.OneToOneField(ImageAlbum, related_name='model', on_delete=models.CASCADE)
    # barcode = models.CharField(max_length=150)
    # productCode = models.CharField(max_length=150)


    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)