from django.db import connections, models
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
    shortDescription = models.TextField(max_length=2000, default='')
    # category = models.OneToOneField(ProductCategory, related_name='category', on_delete=models.CASCADE)
    barcode = models.CharField(max_length=150, default='')
    productCode = models.CharField(max_length=150, default='')
    discountPrice = models.IntegerField(blank=True, default=None)
    url = models.CharField(max_length=150, unique=True, default='', blank=True)
    minAmount = models.IntegerField(default=1)
    def save(self, *args, **kwargs): # set values before save
        print(self.id)
        if self.url:
            self.url = self.id
        super().save(*args, **kwargs)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)