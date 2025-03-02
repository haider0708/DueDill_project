from Imports import *

def fetch_exchange_id_map():
    """Fetch blockchain networks that DEXs operate on."""
    url = "https://pro-api.coinmarketcap.com/v1/exchange/map"
    return fetch_data_from_api(url)

def fetch_exchange_metadata(exchange_ids):
    """Fetch metadata for exchanges using their CoinMarketCap IDs."""
    url = "https://pro-api.coinmarketcap.com/v1/exchange/info"
    params = {'id': exchange_ids}  # Pass comma-separated exchange IDs
    return fetch_data_from_api(url, params=params)

def get_all_exchange_metadata():
    """Fetch exchange map and metadata."""
    # Step 1: Fetch exchange map
    exchange_map = fetch_exchange_id_map()
    if not exchange_map:
        print("❌ Failed to fetch exchange map.")
        return

    # Step 2: Extract exchange IDs (assuming exchange_map['data'] is a list of exchanges)
    exchange_ids = [str(exchange['id']) for exchange in exchange_map['data']]
    exchange_ids_str = ','.join(exchange_ids)  # Create a comma-separated string of IDs

    # Step 3: Fetch metadata for all exchanges
    exchange_metadata = fetch_exchange_metadata(exchange_ids_str)

    if exchange_metadata:
        # Save the metadata to a JSON file
        save_json('exchange_metadata.json', exchange_metadata)
        print("✅ Successfully saved exchange metadata to 'exchange_metadata.json'")
    else:
        print("❌ Failed to fetch exchange metadata.")

def fetch_exchange_assets(exchange_id):
    """Fetch exchange assets for a given CoinMarketCap exchange ID."""
    url = "https://pro-api.coinmarketcap.com/v1/exchange/assets"
    params = {'id': exchange_id}  # Pass the exchange ID as a string
    return fetch_data_from_api(url, params=params)

if __name__ == "__main__":
    #exchange_map = fetch_exchange_id_map()
    # if exchange_map:
    #    with open('exchange_map.json', 'w') as f:
    #        json.dump(exchange_map, f, indent=4)
    #    print("Successfully saved networks map to 'exchange_map.json'")

    #get_all_exchange_metadata()

    exchange_id = "270"  # Example exchange ID (replace with your desired exchange ID)

    # Fetch the exchange assets for the given ID
    exchange_assets = fetch_exchange_assets(exchange_id)

    if exchange_assets:
        # Save the exchange assets data to a JSON file
        save_json(f'exchange_{exchange_id}_assets.json', exchange_assets)
        print(f"✅ Successfully saved assets data for exchange {exchange_id} to 'exchange_{exchange_id}_assets.json'")
    else:
        print(f"❌ Failed to fetch exchange assets for exchange {exchange_id}.")