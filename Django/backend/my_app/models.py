from django.db import models
from django.utils import timezone
from django.contrib.auth.models import User
from django.conf import settings
import uuid
# Create your models here.

# Create your models here.
# ------------------------------------------------------------
# Customer Model - stores basic patient information
# ------------------------------------------------------------
class Customer(models.Model):
    GENDER_CHOICES = [
        ("Male", "Male"),
        ("Female", "Female"),
        ("Other", "Other"),
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE)

    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    gender = models.CharField(max_length=10, choices=GENDER_CHOICES)
    date_of_birth = models.DateField()
    phone = models.CharField(max_length=15, blank=True, null=True)
    email = models.EmailField(blank=True, null=True)
    address1 = models.CharField(max_length=255, blank=True)
    address2 = models.CharField(max_length=255, blank=True)
    city = models.CharField(max_length=100, blank=True)
    state = models.CharField(max_length=50, blank=True)
    zip_code = models.CharField(max_length=20, blank=True)



    def __str__(self):
        return f"{self.first_name} {self.last_name}"


class Policy(models.Model):

    POLICY_TYPE = [
        ("auto", "Auto"),
        ("home", "Home"),
        ("life", "Life"),
    ]
    customer = models.ForeignKey(
        Customer,
        related_name="policies",
        on_delete=models.CASCADE
    )
    policy_number = models.CharField(max_length=255)
    policy_type = models.CharField(
        max_length=20,
        choices=POLICY_TYPE,
        default="auto"
    )
    effective_date = models.DateField()
    expiration_date = models.DateField()
    premium_amount = models.DecimalField(max_digits=10, decimal_places=2)

    # This links the invoice to a specific user
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL, 
        on_delete=models.CASCADE,
        related_name="policies",
        null=True, # Allow existing ones to be null for now
        blank=True
    )

    def __str__(self):
        return self.name
    

class Invoice(models.Model):
    STATUS_CHOICES = [
        ('unpaid', 'Unpaid'),
        ('partial', 'Partial Paid'),
        ('paid', 'Paid in Full'),
    ]

    policy = models.ForeignKey(Policy, related_name="invoices", on_delete=models.CASCADE)
    invoice_number = models.CharField(max_length=50, blank=True)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    agency_fee = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    total_amount = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    balance_due = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='unpaid')  # 👈 new
    issue_date = models.DateField()
    due_date = models.DateField()
    billing_type = models.CharField(
    max_length=20,
    choices=[
        ('direct', 'Direct Bill'),
        ('agency', 'Agency Bill'),
    ],
    default='agency'
)



      # This links the invoice to a specific user
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL, 
        on_delete=models.CASCADE,
        related_name="invoices",
        null=True, # Allow existing ones to be null for now
        blank=True
    )

    def save(self, *args, **kwargs):
        # Auto-generate invoice number
        if not self.invoice_number:
            self.invoice_number = str(uuid.uuid4())[:8]

        # BILLING TYPE LOGIC
        if self.billing_type == 'direct':
            # Carrier bills the premium → agency only collects agency fee
            self.amount = 0
            self.total_amount = self.agency_fee
        else:
            # Agency bills full amount
            self.total_amount = self.amount + self.agency_fee

        # BALANCE + STATUS LOGIC
        if not self.pk or self.payments.count() == 0:
            self.balance_due = self.total_amount
            self.status = 'unpaid'
        else:
            if self.balance_due <= 0:
                self.status = 'paid'
                self.balance_due = 0
            elif self.balance_due < self.total_amount:
                self.status = 'partial'
            else:
                self.status = 'unpaid'

        super().save(*args, **kwargs)

    
    @property
    def customer(self):
            return self.policy.customer
    

class Payment(models.Model):
    invoice = models.ForeignKey(Invoice, related_name="payments", on_delete=models.CASCADE)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    payment_date = models.DateField()
    method = models.CharField(max_length=50)  # e.g. "Credit Card", "Cash", "Bank Transfer"

      # This links the invoice to a specific user
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL, 
        on_delete=models.CASCADE,
        related_name="payments",
        null=True, # Allow existing ones to be null for now
        blank=True
    )

