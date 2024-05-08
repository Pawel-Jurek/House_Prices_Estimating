from django.http import JsonResponse
from django.shortcuts import render
from .util import get_estimated_price, get_addresses
from django.views.decorators.csrf import csrf_exempt
import json

def index(request):
    return render(request, 'index.html')

def addresses(request, city):
    if request.method == 'GET':
         return JsonResponse({'addresses': get_addresses(city)}, status=200)
    else:
        return JsonResponse({'error': 'Wrong request method'}, status=405)

# chwilowe wyłączenie tokenu do testów
@csrf_exempt
def valuation(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        district = data.get("district")
        sq = data.get("sq")
        city = data.get("city")
        floor = data.get("floor")
        rooms = data.get("rooms")
        year = data.get("year")
        model = data.get("model")
        #print(sq, district, city, floor, rooms, year)


        # Przykładowe dane do testowania
        '''
        sq = 74.05
        address = 'Podgórze'
        city = 'Kraków'
        floor = 2.0
        rooms = 3.0
        year = 2021.0
        '''
    
        if sq and district and city and floor != None and rooms and year and model:
            return JsonResponse({'price': get_estimated_price(city, district, floor, rooms, sq, year, model)}, status=200)
        else:
            return JsonResponse({'error': 'Missing data'}, status=400)
    else:
        return JsonResponse({'error': 'Wrong request method'}, status=405)
        