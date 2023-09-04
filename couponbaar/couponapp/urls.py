from django.urls import path
from . import views

urlpatterns = [
    path('', views.Index, name = 'index'),
    path('index', views.Index, name = 'index'),
    path('category', views.category, name = 'category'),
    path('category/<str:slug>', views.categorydetailsview, name = 'categorydetails'),
    path('store', views.store, name = 'store'),
    path('storedetails/<slug:slug>/', views.storedetailsview, name='storedetails'),
    path('contact', views.Contact_us, name = 'contact'),
    path('licence', views.licence, name = 'licence'),
    path('privacyandpolicy', views.privacyandpolicy, name = 'privacyandpolicy'),
    path('termsofservice', views.termsofservice, name = 'termsofservice'),
    path('BingSiteAuth', views.BingSiteAuth, name = 'BingSiteAuth'),

]
