from Imports import *

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
