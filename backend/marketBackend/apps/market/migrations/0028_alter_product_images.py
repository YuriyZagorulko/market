# Generated by Django 4.2.7 on 2024-03-09 12:11

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('market', '0027_alter_product_brand'),
    ]

    operations = [
        migrations.AlterField(
            model_name='product',
            name='images',
            field=models.OneToOneField(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='model', to='market.imagealbum'),
        ),
    ]