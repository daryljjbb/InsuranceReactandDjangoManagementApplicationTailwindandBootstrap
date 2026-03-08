from rest_framework import serializers
from .models import Customer,Policy,Invoice, Payment





class PaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payment
        fields = "__all__"

    def validate(self, data):
        invoice = data["invoice"]
        amount = data["amount"]

        if amount <= 0:
            raise serializers.ValidationError({"amount": "Payment must be greater than 0."})

        if amount > invoice.balance_due:
            raise serializers.ValidationError(
                {"amount": "Payment cannot exceed remaining balance."}
            )

        return data

    def create(self, validated_data):
        request = self.context.get("request")
        if request and request.user.is_authenticated:
            validated_data["user"] = request.user

        payment = super().create(validated_data)
        invoice = payment.invoice

        total_paid = sum(p.amount for p in invoice.payments.all())
        invoice.balance_due = invoice.total_amount - total_paid
        invoice.save()  # triggers status logic

        return payment


class InvoiceSerializer(serializers.ModelSerializer):
    payments = PaymentSerializer(many=True, read_only=True)

    class Meta:
        model = Invoice
        fields = "__all__"
        read_only_fields = [
            "user",
            "invoice_number",
            "balance_due",
            "status",
            "total_amount",
        ]

    def create(self, validated_data):
        request = self.context.get("request")
        if request and request.user.is_authenticated:
            validated_data["user"] = request.user

        invoice = super().create(validated_data)
        invoice.save()  # ensure billing logic + totals run
        return invoice

    def update(self, instance, validated_data):
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        return instance
    

# ----------------------------------------------------------------
# Policy Serializer
# ----------------------------------------------------------------
class PolicySerializer(serializers.ModelSerializer):
    invoices = InvoiceSerializer(many=True, read_only=True)
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
