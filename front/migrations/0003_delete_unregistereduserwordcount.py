# Generated by Django 4.2.7 on 2023-11-17 01:43

from django.db import migrations


class Migration(migrations.Migration):
    dependencies = [
        ("front", "0002_unregistereduserwordcount_and_more"),
    ]

    operations = [
        migrations.DeleteModel(
            name="UnregisteredUserWordCount",
        ),
    ]
