from django.db import models
from .image import ImageAlbum
class Product(models.Model):

    title = models.CharField(max_length=300)
    price = models.IntegerField()
    description = models.TextField(max_length=2000, help_text="This is the description of the product")
    images = models.OneToOneField(ImageAlbum, related_name='model', on_delete=models.CASCADE) #album
    # barcode = models.CharField(max_length=150)
    # productCode = models.CharField(max_length=150)
    # url = models.CharField(max_length=150, unique=True)
    # def save(self, *args, **kwargs): # set values before save
    #     if self.url:
    #         self.url = self.id
    #     super().save(*args, **kwargs)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)