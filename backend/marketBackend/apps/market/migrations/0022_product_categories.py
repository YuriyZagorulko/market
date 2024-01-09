# Generated by Django 4.2.7 on 2024-01-04 22:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('market', '0021_product_vendorcodeavdtrade_alter_order_ordertype'),
    ]

    operations = [
        migrations.AddField(
            model_name='product',
            name='categories',
            field=models.ManyToManyField(blank=True, null=True, related_name='categories', to='market.productcategory'),
        ),
    ]
