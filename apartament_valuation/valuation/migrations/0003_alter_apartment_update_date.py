# Generated by Django 5.0.4 on 2024-07-03 23:29

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('valuation', '0002_apartment_update_date'),
    ]

    operations = [
        migrations.AlterField(
            model_name='apartment',
            name='update_date',
            field=models.DateField(default=datetime.date.today),
        ),
    ]