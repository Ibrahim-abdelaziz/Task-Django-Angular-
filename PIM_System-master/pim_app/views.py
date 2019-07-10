from django.contrib.auth.models import User
from django.shortcuts import render, get_object_or_404
from rest_framework.response import Response
from .models import Category, Product
from rest_framework import viewsets
from .serializers import CategorySerializer, ProductSerializer
from django.core.paginator import Paginator
from rest_framework.permissions import (AllowAny,)

# CategoryListView
class CategoryListView(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = (AllowAny,)



class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = (AllowAny,)

def product_list(request, pk):
    categories = Category.objects.all()
    product = Product.objects.all()

    category = get_object_or_404(Category, pk=pk)
    products = product.filter(categories=category)

    # Pagination
    paginator = Paginator(products, 7)
    page = request.GET.get('page')
    products = paginator.get_page(page)

    context = {
        'category': category,
        'categories': categories,
        'products': products,
        'products': products
        }
    return render(request,'pim/detail.html',context)




