from django.contrib import admin
from django.urls import path,include
from .views import health_check,csrf

urlpatterns = [
    path('api/csrf/', csrf),  #CSRFトークン取得用URL
    path('health/', health_check), #ヘルスチェック用URL
    path('api/admin/', admin.site.urls), #管理画面
    path('api/accounts/',include('accounts.urls')), #アカウント画面
    path('api/home_manager/',include('home_manager.urls')), #アプリ画面
    
]
