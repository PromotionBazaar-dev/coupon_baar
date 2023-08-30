from django.contrib import admin
from couponapp.models import *

# Register your models here.
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('category_id', 'category_name',)

class ContactAdmin(admin.ModelAdmin):
    list_display = ('name', 'email',)

class StoreAdmin(admin.ModelAdmin):
    list_display = ('store_id','Store_name', 'total_offers', 'logo', 'category',)

class CouponAdmin(admin.ModelAdmin):
    list_display = ('coupon_id', 'Store_name', 'coupon_code', 'Category', 'valid_date', 'discount',)

class SubscribeAdmin(admin.ModelAdmin):
    list_display = ('email',)

admin.site.register(Store, StoreAdmin)
admin.site.register(Contact, ContactAdmin)
admin.site.register(Category, CategoryAdmin)
admin.site.register(Coupon, CouponAdmin)
admin.site.register(Subscribe, SubscribeAdmin)
