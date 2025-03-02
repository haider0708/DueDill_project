from Imports import *

def fetch_cmc100_index():
    """Fetch the latest CoinMarketCap 100 Index value and constituent data."""
    url = "https://pro-api.coinmarketcap.com/v3/index/cmc100-latest"
    return fetch_data_from_api(url)

def main():
    cmc100_data = fetch_cmc100_index()  # Fetch data from the CoinMarketCap 100 Index API
    if cmc100_data:
        save_json('cmc100_latest.json', cmc100_data)  # Save the data to a JSON file

if __name__ == "__main__":
    main()