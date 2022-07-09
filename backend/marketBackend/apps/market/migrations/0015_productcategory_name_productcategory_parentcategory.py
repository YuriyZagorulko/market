# Generated by Django 4.0.1 on 2022-07-02 13:33

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('market', '0014_product_category_alter_product_shortdescription'),
    ]

    operations = [
        migrations.AddField(
            model_name='productcategory',
            name='name',
            field=models.CharField(default='', max_length=300),
        ),
        migrations.AddField(
            model_name='productcategory',
            name='parentCategory',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.DO_NOTHING, to='market.productcategory'),
        ),
    ]
