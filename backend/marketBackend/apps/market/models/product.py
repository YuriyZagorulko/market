from django.db import models
from .image import ImageAlbum

class ProductCategory(models.Model):
    name: models.CharField(max_length=200)
    parentCategory: models.ForeignKey('self', related_name='parentCategory', on_delete=models.CASCADE)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

class Product(models.Model):
    title = models.CharField(max_length=300)
    price = models.IntegerField()
    description = models.TextField(max_length=2000, help_text="This is the description of the product")
    images = models.OneToOneField(ImageAlbum, related_name='model', on_delete=models.CASCADE) #album
    # shortDescription = models.TextField(max_length=2000)
    # category = models.OneToOneField(ProductCategory, related_name='category', on_delete=models.CASCADE)
    # barcode = models.CharField(max_length=150)
    # productCode = models.CharField(max_length=150)
    # discountPrice = models.IntegerField()
    # url = models.CharField(max_length=150, unique=True)
    # minAmount = models.IntegerField()
    # def save(self, *args, **kwargs): # set values before save
    #     if self.url:
    #         self.url = self.id
    #     super().save(*args, **kwargs)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)