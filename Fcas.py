from Imports import *


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
