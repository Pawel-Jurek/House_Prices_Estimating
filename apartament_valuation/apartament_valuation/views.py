from django.http import JsonResponse
from django.shortcuts import render
from .util import get_estimated_price, get_addresses
#from django.views.decorators.csrf import csrf_exempt

def index(request):
    return render(request, 'index.html')

def addresses(request, city):
    if request.method == 'GET':
         return JsonResponse({'addresses': get_addresses(city)}, status=200)
    else:
        return JsonResponse({'error': 'Wrong request method'}, status=405)

# chwilowe wyłączenie tokenu do testów
#@csrf_exempt
def valuation(request):
    if request.method == 'POST':
        
        sq = request.POST["sq"]
        address = request.POST["address"]
        city = request.POST["city"]
        floor = request.POST["floor"]
        rooms = request.POST["rooms"]
        year = request.POST["year"]
        
        # Przykładowe dane do testowania
        '''  
        sq = 74.05
        address = 'Podgórze'
        city = 'Kraków'
        floor = 2.0
        rooms = 3.0
        year = 2021.0
        '''
    
        if sq and address and city and floor and rooms and year:
            return JsonResponse({'price': get_estimated_price(city, address, floor, rooms, sq, year)}, status=200)
        else:
            return JsonResponse({'error': 'Missing data'}, status=400)
    else:
        return JsonResponse({'error': 'Wrong request method'}, status=405)
        