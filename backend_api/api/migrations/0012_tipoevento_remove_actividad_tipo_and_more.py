# Generated by Django 4.0.1 on 2023-08-07 18:58

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0011_actividad_actividadtipo_usuarioactividad_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='TipoEvento',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nombre', models.CharField(max_length=100)),
                ('descripcion', models.TextField()),
            ],
        ),
        migrations.RemoveField(
            model_name='actividad',
            name='tipo',
        ),
        migrations.RemoveField(
            model_name='actividadtipo',
            name='nombre',
        ),
        migrations.AddField(
            model_name='actividadtipo',
            name='idactividades',
            field=models.ManyToManyField(to='api.Actividad'),
        ),
        migrations.AlterField(
            model_name='actividad',
            name='latitud',
            field=models.DecimalField(decimal_places=6, max_digits=10),
        ),
        migrations.AlterField(
            model_name='actividad',
            name='longitud',
            field=models.DecimalField(decimal_places=6, max_digits=10),
        ),
        migrations.AddField(
            model_name='actividadtipo',
            name='tipoevento',
            field=models.ForeignKey(default=0, on_delete=django.db.models.deletion.CASCADE, to='api.tipoevento'),
            preserve_default=False,
        ),
    ]
