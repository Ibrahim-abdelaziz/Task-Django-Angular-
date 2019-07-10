from rest_framework import serializers
from .models import Category, Product
class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id','name',]

class ProductSerializer(serializers.ModelSerializer):
    categories = CategorySerializer(many=True, required=False)
    class Meta:
        model = Product
        fields = ['id', 'name', 'product_Code', 'price', 'quantity', 'categories']

        def create(self, validated_data):
            category_data = validated_data.pop('categories')
            product = Product.objects.create(**validated_data)
            dicti = {}
            for items in category_data:
                for key, value in items.items():
                    dicti[key] = value
            if 'id' in dicti:
                x = product.categories.get_or_create(id=dicti['id'])
                product.categories.set(x)
            return product

        def update(self, instance, validated_data):
            if 'categories' in validated_data:
                category_data = validated_data.pop('categories')

            instance.product_code = validated_data.get('product_code', instance.product_code)
            instance.name = validated_data.get('name', instance.name)
            instance.quantity = validated_data.get('quantity', instance.quantity)
            instance.price = validated_data.get('price', instance.price)
            instance.categories = validated_data.get('categories', instance.categories)

            instance.save()
            return instance




