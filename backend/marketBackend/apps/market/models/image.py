from django.db import models

class ImageAlbum(models.Model):
    # Link album to a single product
    product = models.OneToOneField(
        "market.Product",
        related_name="album",
        on_delete=models.CASCADE,
        null=True,  # optional if some albums are not linked yet
        blank=True,
    )

    def default(self):
        return self.images.filter(default=True).first()


class Image(models.Model):
    name = models.CharField(max_length=255, blank=True, null=True)
    image = models.ImageField(upload_to='images/')
    default = models.BooleanField(default=False)
    width = models.FloatField(default=100)
    length = models.FloatField(default=100)
    album = models.ForeignKey(
        ImageAlbum,
        related_name='images',
        on_delete=models.CASCADE
    )

    # Optional: timestamps
    # created_at = models.DateTimeField(auto_now_add=True)
    # updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name or "Image"