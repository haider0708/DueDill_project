from Imports import *

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