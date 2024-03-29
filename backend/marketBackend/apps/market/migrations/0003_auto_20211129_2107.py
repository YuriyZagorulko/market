# Generated by Django 3.2.9 on 2021-11-29 19:07

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('market', '0002_customuser_phone'),
    ]

    operations = [
        migrations.AddField(
            model_name='customuser',
            name='birthday',
            field=models.DateField(default=datetime.date.today, verbose_name='Date'),
        ),
        migrations.AddField(
            model_name='customuser',
            name='is_verified',
            field=models.BooleanField(default=False, verbose_name='is verified'),
        ),
    ]
