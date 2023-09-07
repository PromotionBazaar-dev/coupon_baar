from django.db import models
from datetime import datetime
from django.utils.text import slugify

# Create your models here.
class Category(models.Model):
    category_id = models.AutoField(primary_key=True)
    category_name = models.CharField(max_length=100, default="")
    slug = models.SlugField(unique=True, null=True, blank=True)
    category_image = models.ImageField(upload_to = 'category/images', default = "")

    def save(self, *args, **kwargs):
        self.slug = slugify(self.category_name)
        super(Category, self).save(*args, **kwargs)

    def __str__(self):
        return self.category_name
    
class Store(models.Model):
    store_id = models.AutoField(primary_key=True)
    Store_name = models.CharField(max_length=100, default = "")
    slug = models.SlugField(unique=True, null=True, blank=True)
    total_offers = models.IntegerField(default = 0)
    logo = models.ImageField(upload_to = 'store/images', default = "")
    store_description = models.TextField(default = "")
    category = models.ForeignKey(Category, on_delete = models.CASCADE)

    def save(self, *args, **kwargs):
        self.slug = slugify(self.Store_name)
        super(Store, self).save(*args, **kwargs)


    def __str__(self):
        return self.Store_name
    
class Coupon(models.Model):
    coupon_id = models.AutoField(primary_key=True)
    coupon_code = models.CharField(max_length=100, null = True)
    Store_name = models.ForeignKey(Store, on_delete=models.CASCADE)
    Category =  models.ForeignKey(Category, on_delete=models.CASCADE)
    store_logo = models.ImageField(upload_to = 'coupon/images', default = "")
    tracking_urls = models.URLField(max_length=200)
    valid_date = models.DateField(null=True, blank = True)
    coupon_description = models.TextField(default = "")
    discount = models.CharField(max_length = 200, null = True)

    def __str__(self):
        return self.coupon_code
    
class Contact(models.Model):
    name = models.CharField(max_length = 100)
    email = models.EmailField()
    message = models.TextField()

    def __str__(self):
        return self.name
    
class Subscribe(models.Model):
    email = models.EmailField()

    def __str__(self):
        return self.email