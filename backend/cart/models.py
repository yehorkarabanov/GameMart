from django.db import models
from django.db.models.signals import pre_save
from django.dispatch import receiver
from django.utils import timezone
from account.models import CustomUser
from products.models import Product
from django.db import IntegrityError


class Cart(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='carts')
    game = models.ForeignKey(Product, on_delete=models.CASCADE)
    amount = models.IntegerField()
    # paid = models.BooleanField(default=False)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    # paid_time = models.DateTimeField(null=True, blank=True)

    class Meta:
        unique_together = ['user', 'game']

    def save(self, *args, **kwargs):
        try:
            super().save(*args, **kwargs)
        except IntegrityError as e:
            if "unique constraint" in str(e).lower():
                pass


# @receiver(pre_save, sender=Cart)
# def update_paid_dates(sender, instance, **kwargs):
#     if instance.pk is None:
#         return
#
#     try:
#         obj = sender._default_manager.get(pk=instance.pk)
#     except sender.DoesNotExist:
#         return
#
#     if instance.paid and not obj.paid:
#         instance.paid_time = timezone.now()
