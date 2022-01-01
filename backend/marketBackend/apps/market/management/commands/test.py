from django.core.management.base import BaseCommand, CommandError
from marketBackend.secret import NP_API_KEY
import requests
import json
class Command(BaseCommand):
    help = 'Closes the specified poll for voting'
    def handle(self, *args, **options):
        with open("media/storage/NP_Offices.json") as file:
            # data = json.load(file)
            # self.stdout.write(str(data["info"]))
            searchStr = 'ТараЩАнська'.lower()
            try:
                arr = []
                content = json.load(file)
                for office in content["data"]:
                    if searchStr in office["Description"].lower():
                        arr.append(office["Description"])
                print(str(arr))
            except:
                print("An exception occurred")