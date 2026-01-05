from django.contrib import admin
from django.urls import path,include
urlpatterns = [
    path('api/admin/', admin.site.urls), #管理画面
    path('api/accounts/',include('accounts.urls')), #アカウント画面
    path('api/home_manager/',include('home_manager.urls')), #アプリ画面
    
]
