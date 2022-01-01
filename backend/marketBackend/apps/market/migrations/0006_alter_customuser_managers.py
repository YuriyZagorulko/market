# Generated by Django 3.2.9 on 2021-12-26 18:13

from django.db import migrations
import marketBackend.apps.market.models.custom_user


class Migration(migrations.Migration):

    dependencies = [
        ('market', '0005_alter_customuser_managers'),
    ]

    operations = [
        migrations.AlterModelManagers(
            name='customuser',
            managers=[
                ('objects', marketBackend.apps.market.models.custom_user.CustomUserManager()),
            ],
        ),
    ]
