# Generated by Django 3.2.9 on 2022-01-02 12:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('market', '0012_auto_20220102_1401'),
    ]

    operations = [
        migrations.AlterField(
            model_name='image',
            name='name',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
    ]
