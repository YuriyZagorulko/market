from django.db import models
from .image import ImageAlbum
class Product(models.Model):

    title = models.CharField(max_length=300)
    price = models.IntegerField()
    description = models.TextField(max_length=2000, help_text="This is the description of the product")
    images = models.OneToOneField(ImageAlbum, related_name='model', on_delete=models.CASCADE)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    # def save(self, *args, **kwargs):
    #
    #     if self.pk is None:
    #         small=rescale_image(self.image,width=100,height=100)
    #         self.image_small=SimpleUploadedFile(name,small_pic)
    #     super().save(*args, **kwargs)