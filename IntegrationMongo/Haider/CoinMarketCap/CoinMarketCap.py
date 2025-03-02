from Imports import *


def fetch_cryptocurrency_listings_latest(params=None):
    """Fetch latest cryptocurrency listings."""
    url = "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest"
    return fetch_data_from_api(url, params)

def fetch_cryptocurrency_map():
    """Fetch cryptocurrency map with coin metadata."""
    url = "https://pro-api.coinmarketcap.com/v1/cryptocurrency/map"
    return fetch_data_from_api(url)


def fetch_cryptocurrency_info(crypto_ids, batch_size=40, delay=15):
    """Fetch metadata for cryptocurrencies in batches with rate limiting."""
    url = "https://pro-api.coinmarketcap.com/v2/cryptocurrency/info"
    batched_data = {}

    for batch in split_into_batches(crypto_ids, batch_size):
        params = {"id": ",".join(batch)}
        response = fetch_data_from_api(url, params)
        if response:
            batched_data.update(response.get("data", {}))

        print(f"Waiting {delay} seconds before the next batch...")
        time.sleep(delay)  # Rate limit delay

    return batched_data


def fetch_cryptocurrency_quotes_latest(crypto_ids, batch_size=40, delay=15):
    """Fetch latest quotes for cryptocurrencies in batches with rate limiting."""
    url = "https://pro-api.coinmarketcap.com/v2/cryptocurrency/quotes/latest"
    batched_data = {}

    for batch in split_into_batches(crypto_ids, batch_size):
        params = {"id": ",".join(batch)}
        response = fetch_data_from_api(url, params)
        if response:
            batched_data.update(response.get("data", {}))

        print(f"Waiting {delay} seconds before the next batch...")
        time.sleep(delay)  # Rate limit delay

    return batched_data

def get_coin_ids_from_map(filename='crypto_map.json'):
    """Extract all cryptocurrency IDs from the saved map JSON file."""
    try:
        with open(filename, 'r') as f:
            data = json.load(f)
        coin_ids = [str(coin['id']) for coin in data.get('data', [])]
        return coin_ids if coin_ids else None
    except Exception as e:
        print(f"Error reading coin IDs from {filename}: {e}")
        return None


def main():
    # Fetch and save cryptocurrency map
    crypto_map = fetch_cryptocurrency_map()
    if crypto_map:
        with open('crypto_map.json', 'w') as f:
            json.dump(crypto_map, f, indent=4)
        print("Successfully saved cryptocurrency map to 'crypto_map.json'")

    crypto_listing = fetch_cryptocurrency_listings_latest()
    if crypto_listing:
        with open('crypto_listing.json', 'w') as f:
            json.dump(crypto_listing, f, indent=4)
        print("Successfully saved cryptocurrency listing to 'crypto_map.json'")

    # Retrieve all coin IDs from the saved map
    coin_ids = get_coin_ids_from_map()
    if not coin_ids:
        print("No valid coin IDs found. Exiting.")
        return

    print(f"Total Coins Found: {len(coin_ids)}")

    # Fetch and save cryptocurrency info in batches
    crypto_info = fetch_cryptocurrency_info(coin_ids, batch_size=40, delay=15)
    if crypto_info:
        with open('crypto_info.json', 'w') as f:
            json.dump(crypto_info, f, indent=4)
        print("Successfully saved cryptocurrency info to 'crypto_info.json'")

    # Fetch and save cryptocurrency quotes in batches
    crypto_quotes = fetch_cryptocurrency_quotes_latest(coin_ids, batch_size=40, delay=15)
    if crypto_quotes:
        with open('crypto_quotes.json', 'w') as f:
            json.dump(crypto_quotes, f, indent=4)
        print("Successfully saved cryptocurrency quotes to 'crypto_quotes.json'")


if __name__ == "__main__":
    main()
