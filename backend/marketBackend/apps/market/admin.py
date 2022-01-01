from django.contrib import admin
from marketBackend.apps.market.models import  ImageAlbum,Image,Product, CustomUser

admin.site.register(ImageAlbum)
admin.site.register(Product)
admin.site.register(Image)
admin.site.register(CustomUser)
