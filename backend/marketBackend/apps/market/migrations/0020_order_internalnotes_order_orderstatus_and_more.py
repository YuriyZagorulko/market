# Generated by Django 4.0.1 on 2022-09-09 16:58

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('market', '0019_product_quantity_product_suppliers'),
    ]

    operations = [
        migrations.AddField(
            model_name='order',
            name='internalNotes',
            field=models.CharField(blank=True, default='', max_length=1000),
        ),
        migrations.AddField(
            model_name='order',
            name='orderStatus',
            field=models.CharField(choices=[('COMPLETED', 'Completed'), ('CANCELED', 'Canceled'), ('ON_HOLD', 'Onhold'), ('PROCESSING', 'Processing'), ('DELIVERED', 'Delivered')], default='PROCESSING', max_length=50),
        ),
        migrations.AlterField(
            model_name='order',
            name='orderType',
            field=models.CharField(choices=[('COMPLETED', 'Completed'), ('CANCELED', 'Canceled'), ('ON_HOLD', 'Onhold'), ('PROCESSING', 'Processing'), ('DELIVERED', 'Delivered')], max_length=100),
        ),
        migrations.AlterField(
            model_name='orderdetails',
            name='order',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='details', to='market.order'),
        ),
        migrations.AlterField(
            model_name='orderdetails',
            name='product',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='products', to='market.product'),
        ),
    ]
