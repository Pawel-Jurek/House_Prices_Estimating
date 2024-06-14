from django.db import models

class Apartment(models.Model):
    district = models.CharField(max_length=255)
    city = models.CharField(max_length=255)
    floor = models.IntegerField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    rooms = models.IntegerField()
    sq = models.DecimalField(max_digits=10, decimal_places=2)
    year = models.IntegerField()
    price_per_sq = models.DecimalField(max_digits=10, decimal_places=2)
    
    def __str__(self):
        return f'{self.city}: {self.district} price: {self.price}'
