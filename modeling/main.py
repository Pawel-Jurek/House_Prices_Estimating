import pandas as pd
import requests
from api_key import MAPS_KEY

# koordynacje dla których dzielnica została już określona
coordinates = {}

# wykaz wszystkich dzielnic z naszych miast
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


def set_neighborhoods(df):
    global coordinates
    addresses_to_remove = []
    for index in df.index:
        city = df.at[index, "city"]
        city_neighborhoods = neighborhoods.get(city)
        address = df.at[index, "address"]
        latitude = round(df.at[index, "latitude"], 7)
        longitude = round(df.at[index, "longitude"], 7)
        coords = (latitude, longitude)
        # sprawdzenie czy wskazane koordynacje nie występują już w słowniku. Jeśli już są, to korzystamy z gotowych wartości
        if coords in coordinates.keys():
                df.at[index, "address"] = coordinates[coords]
        else:        
            address_parts = address.strip().split(" ")
            for i in range(len(address_parts)):
                #import ipdb; ipdb.set_trace() #debugger
                # sprawdzenie czy pierwszy człon znajduje się w nawie dzielic z danego miasta
                if address_parts[i] in city_neighborhoods or any(address_parts[i] in city_neighborhoods[j] for j in range(len(city_neighborhoods))):
                    # jeśli tak, to jest szansa, że trafiliśmy na nazwę dwuczłonową, dlatego trzeba to zweryfikować w pierwszej kolejności
                    if i+1 < len(address_parts) and f'{address_parts[i]} {address_parts[i+1]}' in city_neighborhoods:
                        df.at[index, "address"] = f'{address_parts[i]} {address_parts[i+1]}'
                    else:
                        df.at[index, "address"] = address_parts[i]
                    break
                else:
                    # wpisać tutaj continue jeśli chce się puszczać wszystko od nowa bez załadowanych koordynacji, żeby nie marnować requestów api
                    # najpierw dane się pouzupełniają między sobą i tablicą koordynacji, a później resztę trzeba pobrać z api
                    url = f"https://maps.googleapis.com/maps/api/geocode/json?latlng={latitude},{longitude}&key={MAPS_KEY}"
                    response = requests.get(url)
                    if response.status_code == 200:
                        data = response.json()
                        for result in data['results'][0]['address_components']:
                                for neighborhood in city_neighborhoods:
                                    if neighborhood == result.get('long_name', ''):
                                        df.at[index, "address"] = neighborhood
                                        break
                        addresses_to_remove.append(address)
                    else:
                        print("Błąd: Nie udało się pobrać danych z API")
                        break
           
        if coords not in coordinates.keys():
            coordinates[coords] = df.at[index, "address"]
    
    # wywalamy linie, których dzielnice nie zostały rozpoznane
    for address in addresses_to_remove:
        df.drop(df[df.address == address].index, inplace=True)

    return df


    
def main():
    global coordinates

    # załadowanie koordynacji z pliku
    try:
        with open("coordinates.txt", "r", encoding="utf-8") as file:
            lines = file.readlines()

        if lines:
            for line in lines:
                data = line.strip().split(", ")
                latitude, longitude, neighborhood = float(data[0]), float(data[1]), data[2]
                if (latitude, longitude) not in coordinates.keys():
                    coordinates[(latitude, longitude)] = neighborhood

    except FileNotFoundError:
        pass
        

    pd.set_option('display.max_columns', None)
    df = pd.read_csv("temp_df.csv", encoding="utf-8")

    df2 = set_neighborhoods(df)

    # wyświetlanie ilości unikatowych dzielnic w naszym df
    print(f'Krk:{len(df2[df2.city == "Kraków"].address.unique())}')
    print(f'WWa:{len(df2[df2.city == "Warszawa"].address.unique())}')
    print(f'Pzn:{len(df2[df2.city == "Poznań"].address.unique())}')

    # wyświetlanie wszystkich dzielnic w naszym df
    '''
    print("Krw")
    print(df2[(df2.city == "Kraków")].address.unique())
    print("Wwa")
    print(df2[(df2.city == "Warszawa")].address.unique())
    print("Pzn")
    print(df2[(df2.city == "Poznań")].address.unique())
    '''

    # załadowanie koordynacji do pliku
    with open("coordinates.txt", "w", encoding="utf-8") as file:
        for key, value in coordinates.items():
            if key[0] and key[1] and value:
                file.write(f"{key[0]}, {key[1]}, {value}\n")


    # zapisanie wynikowego df z podziałem na dzielnice do pliku
    df2.to_csv("neighborhood_df.csv", index=False, encoding='utf-8')

if __name__ == '__main__':
    main()