# core/urls.py
# core/urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views
from .views import InvoiceViewSet, PaymentViewSet,invoice_pdf

router = DefaultRouter()
router.register(r'invoices', InvoiceViewSet, basename='invoice')
router.register(r'payments', PaymentViewSet, basename='payment')

urlpatterns = [
    path('customers/', views.CustomerListCreateView.as_view()),
    path('customers/<int:pk>/', views.CustomerDetailView.as_view()),

    path('policies/', views.PolicyListCreateView.as_view()),
    path('policies/<int:pk>/', views.PolicyDetailView.as_view()),

    path("invoices/<int:pk>/pdf/", invoice_pdf, name="invoice-pdf"),


    path('login/', views.api_login, name='api_login'),
    path('logout/', views.api_logout, name='api_logout'),
    path('register/', views.api_register, name='api_register'),
    path('me/', views.me, name='me'),

    # ⭐ This exposes:
    # GET /invoices/
    # POST /invoices/
    # GET /invoices/<id>/
    # PATCH /invoices/<id>/
    # DELETE /invoices/<id>/
    #
    # and same for payments
    path('', include(router.urls)),
]
