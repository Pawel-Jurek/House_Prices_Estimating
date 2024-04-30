import os
import numpy as np
import json
import pickle

addresses = None
data_columns = None
model = None

def get_addresses(city):
    # todo zrobić faktyczny podział dzielnic względem miast
    cities = ['kraków', 'poznań','warszawa']
    index = cities.index(city.lower())
    return addresses[index*10:(index+1)*10]

def get_estimated_price(city, address, floor, rooms, sq, year):
    try:
        address_index = data_columns.index(address.lower())
        city_index = data_columns.index(city.lower())
    except:
        address_index = -1
        city_index = -1
    x = np.zeros(len(data_columns))
    x[0] = floor
    x[1] = rooms
    x[2] = sq
    x[3] = year
    if address_index >= 0:
        x[address_index] = 1
    if city_index >= 0:
        x[city_index] = 1
    return round(model.predict([x])[0],2)

def load_artifacts():
    global data_columns
    global addresses
    global model

    modeling_dir = os.path.join(os.path.dirname(__file__), '..', '..', 'modeling')
    
    columns_path = os.path.join(modeling_dir, 'columns.json')
    with open(columns_path, 'r') as file:
        data_columns = json.load(file)['data_columns']
        addresses = data_columns[4:]
    
    model_path = os.path.join(modeling_dir, 'house_prices_model.pickle')
    with open(model_path, 'rb') as file:
        model = pickle.load(file)


load_artifacts()