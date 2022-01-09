from django.db import models


class ImageAlbum(models.Model):
    def default(self):
        return self.images.filter(default=True).first()
class Image(models.Model):
    name = models.CharField(max_length=255, blank=True, null=True) # blank=True, default=None
    image = models.ImageField(upload_to='images/')
    default = models.BooleanField(default=False)
    width = models.FloatField(default=100)
    length = models.FloatField(default=100)
    album = models.ForeignKey(ImageAlbum, related_name='images', on_delete=models.CASCADE)
    # created_at = models.DateTimeField(auto_now_add=True)
    # updated_at = models.DateTimeField(auto_now=True)