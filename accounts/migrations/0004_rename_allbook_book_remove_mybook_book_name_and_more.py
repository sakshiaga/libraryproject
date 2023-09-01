# Generated by Django 4.2.4 on 2023-08-30 15:55

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):
    dependencies = [
        ("accounts", "0003_mybook"),
    ]

    operations = [
        migrations.RenameModel(
            old_name="Allbook",
            new_name="Book",
        ),
        migrations.RemoveField(
            model_name="mybook",
            name="book_name",
        ),
        migrations.AddField(
            model_name="mybook",
            name="book",
            field=models.ForeignKey(
                default=1,
                on_delete=django.db.models.deletion.CASCADE,
                to="accounts.book",
            ),
            preserve_default=False,
        ),
    ]