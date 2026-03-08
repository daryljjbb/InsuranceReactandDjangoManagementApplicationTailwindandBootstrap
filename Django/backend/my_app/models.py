from django.db import models
from django.utils import timezone
from django.contrib.auth.models import User
from django.conf import settings

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
    