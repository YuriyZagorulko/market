# Generated by Django 3.2.9 on 2021-12-27 16:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('market', '0007_customuser_is_staff'),
    ]

    operations = [
        migrations.AlterField(
            model_name='product',
            name='barcode',
            field=models.CharField(default='', max_length=150, unique=True),
        ),
        migrations.AlterField(
            model_name='product',
            name='discountPrice',
            field=models.IntegerField(blank=True),
        ),
    ]
