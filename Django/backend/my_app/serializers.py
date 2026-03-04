from rest_framework import serializers
from .models import Customer

# ----------------------------------------------------------------
# Customer Serializer
# ----------------------------------------------------------------
class CustomerSerializer(serializers.ModelSerializer):
    # This helps when you want to include nested relationships later (optional)
    class Meta:
        model = Customer
        fields = "__all__"  # all customer fields
        read_only_fields = ["user"]