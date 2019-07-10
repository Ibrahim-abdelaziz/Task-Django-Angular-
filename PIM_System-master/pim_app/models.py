from django.db import models
from django.urls import reverse
# Create your models here.

class Category(models.Model):
    name = models.CharField(max_length=100, blank=True, null=True)
    categories = models.ManyToManyField('self', related_name='categories', blank=True)

    def __str__(self):
        return self.name

    def get_absolute_url(self):
        return reverse("category_detail", kwargs={'pk': self.pk})

class Product(models.Model):
    name = models.CharField(max_length=200)
    product_Code = models.CharField(blank=True, null=True, max_length=200)
    price = models.DecimalField(max_digits=20, decimal_places=2, default=0.00)
    quantity = models.PositiveIntegerField(default=1)
    categories = models.ManyToManyField(Category, related_name='products',blank=True)

    def __str__(self):
        return self.name


