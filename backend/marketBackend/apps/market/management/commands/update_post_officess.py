from django.core.management.base import BaseCommand, CommandError
from marketBackend.secret import NP_API_KEY
import requests
import json
class Command(BaseCommand):
    help = 'Closes the specified poll for voting'
    def handle(self, *args, **options):
        post_data = str(json.dumps({
            "modelName": "AddressGeneral",
            "calledMethod": "getWarehouses",
            "methodProperties": {
                 "Language": "ru"
            },
            "apiKey": NP_API_KEY
        })).encode('utf-8')
        response = requests.post('https://api.novaposhta.ua/v2.0/json/AddressGeneral/getSettlements', data=post_data)
        with open("media/storage/NP_Offices.json", "w") as out:
            content = str(json.dumps(json.loads(response.content)))
            out.write(content)
        self.stdout.write(self.style.SUCCESS('Test message'))