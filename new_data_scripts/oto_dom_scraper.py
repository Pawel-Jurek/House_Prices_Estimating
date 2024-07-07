import pandas as pd
import requests
from bs4 import BeautifulSoup
import datetime
import os
import django
import sys

current_path = os.path.dirname(os.path.abspath(__file__))
project_root = os.path.abspath(os.path.join(current_path, '..', 'apartament_valuation'))
sys.path.append(project_root)

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "apartament_valuation.settings")
django.setup()

neighborhoods = {
    "Kraków": [
        'Stare Miasto', 
        'Grzegórzki', 
        'Prądnik Czerwony', 
        'Prądnik Biały', 
        'Krowodrza', 
        'Bronowice', 
        'Zwierzyniec', 
        'Dębniki', 
        'Łagiewniki-Borek Fałęcki',
        'Swoszowice', 
        'Podgórze Duchackie', 
        'Bieżanów-Prokocim', 
        'Podgórze', 
        'Czyżyny', 
        'Mistrzejowice', 
        'Bieńczyce', 
        'Wzgórza Krzesławickie', 
        'Nowa Huta'
        ],

    "Warszawa":[
        'Bemowo', 
        'Białołęka', 
        'Bielany', 
        'Mokotów', 
        'Ochota', 
        'Praga-Południe', 
        'Praga-Północ', 
        'Rembertów', 
        'Śródmieście', 
        'Targówek', 
        'Ursus', 
        'Ursynów', 
        'Wawer', 
        'Wesoła', 
        'Wilanów', 
        'Włochy', 
        'Wola', 
        'Żoliborz'

], "Poznań":[
        'Stare Miasto',
        'Nowe Miasto',
        'Wilda',
        'Grunwald',
        'Jeżyce'
]}




from valuation.models import Apartment

def get_page_content(url):
    headers = {'User-Agent': 'Mozilla/5.0'}
    response = requests.get(url, headers=headers)
    response.raise_for_status() 
    return response.text


def get_data_from_text(details, first, second):
    first_pos = details.text.find(first) + len(first)
    second_pos = details.text[first_pos:].find(second) + first_pos
    return details.text[first_pos: second_pos].replace(" ", "").replace('\xa0', '')

def parse_apartments(html, city, year):
    soup = BeautifulSoup(html, 'html.parser')
    apartments = []
    listing_elements = soup.select('ul.css-rqwdxd li article[data-cy="listing-item"]')
    i = 1
    for element in listing_elements:
        try:
            price = element.select_one('span.css-1uwck7i')
            address = element.select_one('p.css-1dvtw4c')
            details = element.select_one('div.css-1c1kq07')
            link_element = element.select_one('a')
        
            if not link_element or not price or not address or not details:
                continue

            price = price.text.replace('\xa0', '').replace('zł', '').replace(',', '.').replace(' ', '')
            district = address.text.split(", ")[-3]
            floor = get_data_from_text(details, "Piętro", "piętro")
            rooms = get_data_from_text(details, "pokoi", "poko")
            sq = get_data_from_text(details, "Powierzchnia", "m")
            price_per_sq = get_data_from_text(details, "kwadratowy", "zł")
            offer_url = "https://www.otodom.pl" + link_element['href']
            apartment = {
                'district': district if district in neighborhoods[city] else None,
                'city': city,
                'floor': int(floor) if floor.isdigit() else 0,
                'price': float(price),
                'rooms': int(rooms) if rooms.isdigit() else 1,
                'sq': float(sq),
                'price_per_sq': float(price_per_sq),
                'year': year,
                'offer_url': offer_url
            }
            apartments.append(apartment)
            i += 1
        except Exception as e:
            print(f"Error parsing apartment: {e}")

    return apartments

def validate_apartment_data(data):
    required_fields = ['district', 'city', 'price', 'rooms', 'sq', 'price_per_sq', 'offer_url']
    for field in required_fields:
        if not data.get(field):
            return False
    return True

def import_apartments_to_db(apartments):
    for data in apartments:
        if not validate_apartment_data(data):
            continue

        try:
            existing_apartment = Apartment.objects.get(offer_url=data['offer_url'])
            if existing_apartment.price != data['price'] or existing_apartment.price_per_sq != data['price_per_sq']:
                existing_apartment.price = data['price']
                existing_apartment.price_per_sq = data['price_per_sq']
                existing_apartment.update_date = datetime.date.today()
                existing_apartment.save()

        except Apartment.DoesNotExist:
            Apartment.objects.create(
                district=data['district'],
                city=data['city'],
                floor=data['floor'],
                price=data['price'],
                rooms=data['rooms'],
                sq=data['sq'],
                year=data['year'],
                price_per_sq=data['price_per_sq'],
                update_date=datetime.date.today(),
                offer_url=data['offer_url']
            )


def get_total_pages(html):
    soup = BeautifulSoup(html, 'html.parser')
    pagination = soup.select('ul[data-cy="frontend.search.base-pagination.nexus-pagination"] li')
    if pagination:
        page_numbers = [int(li.text) for li in pagination if li.text.isdigit()]
        if page_numbers:
            return max(page_numbers)
    return 1

def scrape_apartments(base_url, years):
    for year in years:
        page = 1
        first_page_html = get_page_content(f"{base_url[1]}&buildYearMin={year}&buildYearMax={year}&page=1")
        total_pages = get_total_pages(first_page_html)
        print(f"Total pages for year {year}: {total_pages}")
        
        for page in range(1, total_pages + 1):
            url = f"{base_url[1]}&buildYearMin={year}&buildYearMax={year}&page={page}"
            print(f"Scraping URL: {url}")
            html = get_page_content(url)
            apartments = parse_apartments(html, base_url[0], year)
            if apartments:
                import_apartments_to_db(apartments)
            else:
                break

if __name__ == "__main__":
    base_urls = [
            ["Poznań", "https://www.otodom.pl/pl/wyniki/sprzedaz/mieszkanie/wielkopolskie/poznan/poznan/poznan?limit=72&ownerTypeSingleSelect=ALL&by=DEFAULT&direction=DESC&viewType=listing"],
            ["Kraków", "https://www.otodom.pl/pl/wyniki/sprzedaz/mieszkanie/malopolskie/krakow/krakow/krakow?limit=72&ownerTypeSingleSelect=ALL&by=DEFAULT&direction=DESC&viewType=listing"],
            ["Warszawa", "https://www.otodom.pl/pl/wyniki/sprzedaz/mieszkanie/mazowieckie/warszawa/warszawa/warszawa?limit=72&ownerTypeSingleSelect=ALL&by=DEFAULT&direction=DESC&viewType=listing"]
        ]

    years = list(range(1900, 2025))

    for base_url in base_urls:
        scrape_apartments(base_url, years)
