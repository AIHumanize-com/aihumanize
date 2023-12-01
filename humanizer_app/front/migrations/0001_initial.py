# Generated by Django 4.2.7 on 2023-11-28 17:40

from django.db import migrations, models


class Migration(migrations.Migration):
    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="DetectRequestCounter",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("ip_address", models.CharField(max_length=45)),
                ("request_count", models.IntegerField(default=0)),
                ("last_request_time", models.DateTimeField(auto_now=True)),
            ],
        ),
        migrations.CreateModel(
            name="UnregisteredUserWordCount",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("ip_address", models.CharField(max_length=45)),
                ("word_count", models.IntegerField(default=0)),
            ],
        ),
    ]