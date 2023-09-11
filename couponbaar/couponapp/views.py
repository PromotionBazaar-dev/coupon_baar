from django.shortcuts import render, redirect, HttpResponse
from django.contrib import messages
from couponapp.models import *
from math import ceil
from django.db import models
from django.views.decorators.csrf import csrf_exempt



# Create your views here.
def Index(request):
    stores = Store.objects.all()
    coupons = Coupon.objects.all()
    categories = Category.objects.all()
    context = {'stores': stores, 'coupons': coupons, 'categories': categories}
    return render(request, 'couponapp/index.html', context)

def category(request):
    categories = Category.objects.all()
    coupons = Coupon.objects.all()
    context = {'categories': categories, 'coupons': coupons}
    return render(request, 'couponapp/category.html', context)

def store(request):
    stores = Store.objects.all()
    coupons = Coupon.objects.all()
    categories = Category.objects.all()
    context = {'stores': stores, 'coupons': coupons, 'categories': categories}
    return render(request, 'couponapp/store.html', context)

def categorydetailsview(request, slug):
    categories = Category.objects.filter(slug=slug)
    print(categories, 'categories')
    for cat in categories:
        print(cat.category_image, 'category image')
    if categories:
        stores = Store.objects.filter(category__slug=slug)
        coupons = Coupon.objects.filter(Category__in=list(categories.values_list('category_id', flat=True)))
        context = {'stores': stores, 'categories': categories, 'coupons': coupons}
        return render(request, 'couponapp/categorydetails.html', context)
    else:
        stores = Store.objects.all()
        coupons = Coupon.objects.all()
        categories = Category.objects.all()
        context = {'stores': stores, 'coupons': coupons, 'categories': categories}
        return render(request, 'couponapp/categorydetails.html')


def storedetailsview(request, slug):
    stores = Store.objects.filter(slug=slug)
    if stores:
        category_name = Category.objects.filter(slug=slug)
        coupons = Coupon.objects.filter(Store_name__in=list(stores.values_list('store_id', flat=True)))
        context = {'stores': stores, 'coupons': coupons, 'category_name': category_name}
        return render(request, 'couponapp/storedetails.html', context)
    else:
        messages.warning(request, 'No store found')
        return render(request, 'couponapp/storedetails.html')
    
@csrf_exempt
def Contact_us(request):
    stores = Store.objects.all()
    coupons = Coupon.objects.all()
    categories = Category.objects.all()
    context = {'stores': stores, 'coupons': coupons, 'categories': categories}
    return render(request, 'couponapp/contact.html', context)

def licence(request):
    return render(request, 'couponapp/licence.html')

def privacyandpolicy(request):
    return render(request, 'couponapp/privacyandpolicy.html')

def termsofservice(request):
    return render(request, 'couponapp/termsofservice.html')

