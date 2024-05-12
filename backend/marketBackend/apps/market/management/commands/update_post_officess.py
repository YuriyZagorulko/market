from django.core.management.base import BaseCommand, CommandError
from pathlib import Path
import requests
import json
import os

NP_API_KEY = os.environ.get('NP_API_KEY', '')

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
        Path("media/storage").mkdir(parents=True, exist_ok=True)
        with open("media/storage/NP_Offices.json", "w+") as out:
            content = str(json.dumps(json.loads(response.content)))
            out.write(content)
        self.stdout.write(self.style.SUCCESS('File was updated'))