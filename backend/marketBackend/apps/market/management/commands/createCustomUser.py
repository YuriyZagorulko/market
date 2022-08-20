from django.core.management.base import BaseCommand, CommandError
class Command(BaseCommand):

    def handle(self, *args, **options):
       username = input("username")
       
       user = User.objects.get_or_create(username=username, defaults={"blabla"}
       Residence.objects.create(user=user, next params....)