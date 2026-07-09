from django.urls import path
from .views import CartView, CartAddItemView, CartItemDetailView

urlpatterns = [
    path("", CartView.as_view(), name="cart"),
    path("add/", CartAddItemView.as_view(), name="cart-add"),
    path("items/<int:item_id>/", CartItemDetailView.as_view(), name="cart-item-detail"),
]
