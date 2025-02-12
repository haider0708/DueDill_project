import requests
import json

# Define your CoinMarketCap API key
api_key = '419dc95e-f466-4c08-8c15-8873aa8511b0'

# Set the headers with your API key
headers = {
    'X-CMC_PRO_API_KEY': api_key,
    'Accept': 'application/json',
}

# Function to fetch cryptocurrency map data
def fetch_cryptocurrency_map():
    url = "https://pro-api.coinmarketcap.com/v1/cryptocurrency/map"
    response = requests.get(url, headers=headers)
    return response.json() if response.status_code == 200 else None

# Function to fetch cryptocurrency info  check the parameters
def fetch_cryptocurrency_info():
    url = "https://pro-api.coinmarketcap.com/v2/cryptocurrency/info"
    response = requests.get(url, headers=headers)
    return response.json() if response.status_code == 200 else None

# Function to fetch the latest cryptocurrency listings
def fetch_cryptocurrency_listings_latest():
    url = "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest"
    response = requests.get(url, headers=headers)
    return response.json() if response.status_code == 200 else None

# Function to fetch cryptocurrency quotes (latest) check the parameters
def fetch_cryptocurrency_quotes_latest():
    url = "https://pro-api.coinmarketcap.com/v2/cryptocurrency/quotes/latest"
    response = requests.get(url, headers=headers)
    return response.json() if response.status_code == 200 else None

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

# Function to fetch global metrics quotes (latest)
def fetch_global_metrics_quotes_latest():
    url = "https://pro-api.coinmarketcap.com/v1/global-metrics/quotes/latest"
    response = requests.get(url, headers=headers)
    return response.json() if response.status_code == 200 else None

# Function to fetch CMC 100 index historical data
def fetch_cmc100_historical():
    url = "https://pro-api.coinmarketcap.com/v3/index/cmc100-historical"
    response = requests.get(url, headers=headers)
    return response.json() if response.status_code == 200 else None

# Function to fetch CMC 100 index latest data
def fetch_cmc100_latest():
    url = "https://pro-api.coinmarketcap.com/v3/index/cmc100-latest"
    response = requests.get(url, headers=headers)
    return response.json() if response.status_code == 200 else None

# Function to fetch Crypto Fear and Greed historical data
def fetch_fear_and_greed_historical():
    url = "https://pro-api.coinmarketcap.com/v3/fear-and-greed/historical"
    response = requests.get(url, headers=headers)
    return response.json() if response.status_code == 200 else None

# Function to fetch Crypto Fear and Greed latest data
def fetch_fear_and_greed_latest():
    url = "https://pro-api.coinmarketcap.com/v3/fear-and-greed/latest"
    response = requests.get(url, headers=headers)
    return response.json() if response.status_code == 200 else None

# Function to fetch fiat mapping
def fetch_fiat_map():
    url = "https://pro-api.coinmarketcap.com/v1/fiat/map"
    response = requests.get(url, headers=headers)
    return response.json() if response.status_code == 200 else None

# Function to fetch FCAS listings (latest)
def fetch_fcas_listings_latest():
    url = "https://pro-api.coinmarketcap.com/v1/partners/flipside-crypto/fcas/listings/latest"
    response = requests.get(url, headers=headers)
    return response.json() if response.status_code == 200 else None

# Function to fetch FCAS quotes (latest)  check the parameters
def fetch_fcas_quotes_latest():
    url = "https://pro-api.coinmarketcap.com/v1/partners/flipside-crypto/fcas/quotes/latest"
    response = requests.get(url, headers=headers)
    return response.json() if response.status_code == 200 else None
