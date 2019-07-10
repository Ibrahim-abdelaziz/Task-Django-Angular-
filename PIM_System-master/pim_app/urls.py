from django.urls import path, include
from . import views
from rest_framework import routers

router = routers.DefaultRouter()
#router.register('Categories', views.CategoryListView)
router.register('Category', views.CategoryListView)
router.register('Products', views.ProductViewSet)

app_name = 'pim'

urlpatterns = [
    path('', include(router.urls)),
    #path('', views.CategoryListView),



]
