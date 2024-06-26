import os
import numpy as np
import json
import pickle
import sys
sys.stdout.reconfigure(encoding='utf-8')
sys.stderr.reconfigure(encoding='utf-8')


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


addresses = None
data_columns = None
model_lr = None # sklearn LinearRegression model
model_tf = None # tensorflow model

def get_addresses(city):
    return neighborhoods[city.capitalize()]

def get_estimated_price(city, district, floor, rooms, sq, year, model_name):
    try:
        district_index = data_columns.index(district.lower())
        city_index = data_columns.index(city.lower())
    except:
        district_index = -1
        city_index = -1
    x = np.zeros(len(data_columns))
    x[0] = floor
    x[1] = rooms
    x[2] = sq
    x[3] = year
    if district_index >= 0:
        x[district_index] = 1
    if city_index >= 0:
        x[city_index] = 1
    if model_name == "tf":
        x = x.reshape(1, -1)
        return round(model_tf.predict(x)[0][0],2).astype(float)
    else:
        return round(model_lr.predict([x])[0],2)

    

def load_artifacts():
    global data_columns
    global addresses
    global model_lr
    global model_tf

    modeling_dir = os.path.join(os.path.dirname(__file__), '..', '..', 'modeling')
    
    columns_path = os.path.join(modeling_dir, 'columns.json')
    with open(columns_path, 'r') as file:
        data_columns = json.load(file)['data_columns']
        addresses = data_columns[4:]
    
    model_lr_path = os.path.join(modeling_dir, 'house_prices_model.pickle')
    with open(model_lr_path, 'rb') as file:
        model_lr = pickle.load(file)

    model_tf_path = os.path.join(modeling_dir, 'house_prices_ann_model.pickle')
    with open(model_tf_path, 'rb') as file:
        model_tf = pickle.load(file)


load_artifacts()