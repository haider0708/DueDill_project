from Imports import *

# Function to fetch exchange info   check the parameters
def fetch_exchange_info():
    url = "https://pro-api.coinmarketcap.com/v1/exchange/info"
    response = requests.get(url, headers=headers)
    return response.json() if response.status_code == 200 else None

# Function to fetch exchange map data
def fetch_exchange_map():
    url = "https://pro-api.coinmarketcap.com/v1/exchange/map"
    response = requests.get(url, headers=headers)
    return response.json() if response.status_code == 200 else None

def fetch_exchange_map():
    url = "https://pro-api.coinmarketcap.com/v1/exchange/map"
    response = requests.get(url, headers=headers)
    return response.json() if response.status_code == 200 else None

def fetch_Exchange_Assets(dex_ids):
    ids_str = ",".join(dex_ids)
    url = "https://pro-api.coinmarketcap.com/v1/exchange/assets"
    params = {
        "id": ids_str,
    }
    response = requests.get(url, headers=headers, params=params)
    return response.json() if response.status_code == 200 else None

def fetch_Exchange_Metadata(dex_ids):
    ids_str = ",".join(dex_ids)
    url = "https://pro-api.coinmarketcap.com/v1/exchange/info"
    params = {
        "id": ids_str,
    }
    response = requests.get(url, headers=headers, params=params)
    return response.json() if response.status_code == 200 else None