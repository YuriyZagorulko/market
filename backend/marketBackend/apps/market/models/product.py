from django.db import connections, models
from .image import ImageAlbum

class ProductBrand(models.Model):
    
    def __str__(self):
        return self.name
        
    name = models.CharField(max_length=300, editable=True, unique=True, default='')
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

class ProductCategory(models.Model):
    
    def __str__(self):
        return self.name
        
    name = models.CharField(max_length=300, editable=True,  default='')
    name_UA = models.CharField(max_length=300, editable=True,  default='')
    parentCategory = models.ForeignKey('self', on_delete=models.DO_NOTHING, blank=True, null=True)
    keyWord = models.CharField(max_length=300, unique=True, editable=True, default='')
    isRootCategory = models.BooleanField(blank=True, null=True)
    image = models.ImageField(upload_to='images/', default='default-image.jpeg')

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

class Product(models.Model):
    title = models.CharField(max_length=300)
    price = models.IntegerField()
    description = models.TextField(max_length=2000, help_text="This is the description of the product")
    images = models.OneToOneField(ImageAlbum, related_name='model', blank=True, null=True, on_delete=models.CASCADE) #album
    shortDescription = models.TextField(max_length=300, default='')
    categories = models.ManyToManyField(ProductCategory, related_name='categories', blank=True, null=True)
    brand = models.ForeignKey(ProductBrand, null=True, default=None, blank=True, on_delete=models.DO_NOTHING) 
    
    barcode = models.CharField(max_length=150, unique=True, blank=True, null=True)
    vinCode = models.CharField(max_length=150, unique=True, blank=True, null=True)
    discountPrice = models.IntegerField(blank=True, null=True)
    url = models.CharField(max_length=150, unique=True, blank=True, null=True)
    minAmount = models.IntegerField(default=1)
    characteristics = models.JSONField(blank=True, null=True)
    suppliers = models.TextField(max_length=2000, blank=True, null=True)
    quantity = models.IntegerField(blank=True, null=True)
    vendorCodeAVDTrade = models.CharField(max_length=150, unique=True, blank=True, null=True)

    def save(self, *args, **kwargs): # set values before save
        print(self.id)
        super().save(*args, **kwargs)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)