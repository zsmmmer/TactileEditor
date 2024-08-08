from django.db import models

# Create your models here.
from django.db import models

class Drawing(models.Model):
    name = models.CharField(max_length=100)
    svg_content = models.TextField()

    def __str__(self):
        return self.name