# Generated by Django 3.2.5 on 2021-07-16 09:53

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='ImageAlbum',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
            ],
        ),
        migrations.CreateModel(
            name='Order',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('orderType', models.CharField(choices=[('JUSTIN', 'Justin'), ('NEW_POST', 'Newpost'), ('NEW_POST_COURIER', 'Newpostcourier')], max_length=100)),
                ('recipientName', models.CharField(max_length=100)),
                ('recipientSecondName', models.CharField(max_length=100)),
                ('recipientSurname', models.CharField(max_length=100)),
                ('phoneNumber', models.CharField(max_length=100)),
                ('street', models.CharField(blank=True, default=None, max_length=1000)),
                ('city', models.CharField(blank=True, default=None, max_length=1000)),
                ('house', models.CharField(blank=True, default=None, max_length=100)),
                ('officeRef', models.CharField(blank=True, default=None, max_length=100)),
                ('officeDescription', models.CharField(blank=True, default=None, max_length=1000)),
                ('apartment', models.CharField(blank=True, default=None, max_length=100)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('user', models.ForeignKey(blank=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='ProductCategory',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
            ],
        ),
        migrations.CreateModel(
            name='Product',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=300)),
                ('price', models.IntegerField()),
                ('description', models.TextField(help_text='This is the description of the product', max_length=2000)),
                ('shortDescription', models.TextField(default='', max_length=2000)),
                ('barcode', models.CharField(default='', max_length=150)),
                ('productCode', models.CharField(default='', max_length=150)),
                ('discountPrice', models.IntegerField(blank=True, default=None)),
                ('url', models.CharField(blank=True, default='', max_length=150, unique=True)),
                ('minAmount', models.IntegerField(default=1)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('images', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='model', to='market.imagealbum')),
            ],
        ),
        migrations.CreateModel(
            name='OrderDetails',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('quantity', models.IntegerField(default=1)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('order', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='market.order')),
                ('product', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='market.product')),
            ],
        ),
        migrations.CreateModel(
            name='Image',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('image', models.ImageField(upload_to='images/')),
                ('default', models.BooleanField(default=False)),
                ('width', models.FloatField(default=100)),
                ('length', models.FloatField(default=100)),
                ('album', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='images', to='market.imagealbum')),
            ],
        ),
    ]
