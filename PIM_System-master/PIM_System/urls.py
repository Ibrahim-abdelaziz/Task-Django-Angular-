
from django.contrib import admin
from django.urls import path, include


urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('pim_app.urls'), name='pim'),
    path('api-auth/', include('rest_framework.urls')),


]
