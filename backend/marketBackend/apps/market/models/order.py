from django.db import models

class Order(models.Model):

    class OrderType(models.TextChoices):
        Justin = 'JUSTIN'
        NewPost = 'NEW_POST'
        NewPostCourier = 'NEW_POST_COURIER'

    orderType = models.CharField(
        max_length=2,
        choices=OrderType.choices,
    )

    def is_upperclass(self):
        return self.year_in_school in {
            self.YearInSchool.JUNIOR,
            self.YearInSchool.SENIOR,
        }