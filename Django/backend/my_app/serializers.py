from rest_framework import serializers
from .models import Customer,Policy


# ----------------------------------------------------------------
# Policy Serializer
# ----------------------------------------------------------------
class PolicySerializer(serializers.ModelSerializer):
    # This helps when you want to include nested relationships later (optional)
    class Meta:
        model = Policy
        fields = "__all__"  # all customer fields
        read_only_fields = ["user"]


# ----------------------------------------------------------------
# Customer Serializer
# ----------------------------------------------------------------
class CustomerSerializer(serializers.ModelSerializer):
    policies = PolicySerializer(many=True, read_only=True)
    # This helps when you want to include nested relationships later (optional)
    class Meta:
        model = Customer
        fields = "__all__"  # all customer fields
        read_only_fields = ["user"]

