import nested_admin
from django.contrib import admin
from marketBackend.apps.market.models import (
    ImageAlbum,
    Image,
    Product,
    CustomUser,
    ProductCategory,
    ProductBrand,
)

class ImageInline(nested_admin.NestedTabularInline):
    model = Image
    extra = 1
    readonly_fields = ["preview"]

    def preview(self, obj):
        if obj.image:
            return f'<img src="{obj.image.url}" width="100" />'
        return "(No image)"
    preview.allow_tags = True
    preview.short_description = "Preview"


class ImageAlbumInline(nested_admin.NestedStackedInline):
    model = ImageAlbum
    extra = 1
    inlines = [ImageInline]

class ProductAdmin(nested_admin.NestedModelAdmin):
    filter_horizontal = ("categories",)
    inlines = [ImageAlbumInline]
    list_display = ("title", "brand", "price", "quantity", "created_at", "updated_at")
    search_fields = ("title", "barcode", "vinCode", "url")
    list_filter = ("brand", "categories")


class ImageAlbumAdmin(admin.ModelAdmin):
    inlines = [ImageInline]

admin.site.register(Product, ProductAdmin)
admin.site.register(ImageAlbum, ImageAlbumAdmin)
admin.site.register(CustomUser)
admin.site.register(ProductCategory)
admin.site.register(ProductBrand)