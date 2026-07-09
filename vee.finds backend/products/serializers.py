from rest_framework import serializers
from .models import Category, Product, ProductImage


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ["id", "name", "slug"]


class ProductImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImage
        fields = ["id", "image", "is_main"]


class ProductSerializer(serializers.ModelSerializer):
    images = ProductImageSerializer(many=True, read_only=True)
    category_name = serializers.CharField(source="category.name", read_only=True)

    class Meta:
        model = Product
        fields = [
            "id", "name", "description", "price", "stock",
            "is_active", "category", "category_name", "images",
            "created_at",
        ]


class ProductWriteSerializer(serializers.ModelSerializer):
    """Used by staff to add/edit products (with description + price)."""
    uploaded_images = serializers.ListField(
        child=serializers.ImageField(), write_only=True, required=False
    )

    class Meta:
        model = Product
        fields = [
            "id", "name", "description", "price", "stock",
            "is_active", "category", "uploaded_images",
        ]

    def create(self, validated_data):
        images = validated_data.pop("uploaded_images", [])
        product = Product.objects.create(**validated_data)
        for i, img in enumerate(images):
            ProductImage.objects.create(product=product, image=img, is_main=(i == 0))
        return product
