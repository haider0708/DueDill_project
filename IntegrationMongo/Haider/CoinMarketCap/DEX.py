from Imports import *

def fetch_all_dex_ids():
    """Fetch all available DEXs and their metadata."""
    url = "https://pro-api.coinmarketcap.com/v4/dex/listings/quotes"
    data = fetch_data_from_api(url)

    if data and "data" in data:
        dex_ids = list(set(str(dex["id"]) for dex in data["data"]))  # Ensure IDs are strings
        return dex_ids, data
    return [], None

def fetch_dex_metadata(dex_ids, batch_size=50, delay=10):
    """Fetch metadata for DEXs in batches to avoid long URL errors."""
    url = "https://pro-api.coinmarketcap.com/v4/dex/listings/info"
    batched_data = {}

    for batch in split_into_batches(dex_ids, batch_size):
        params = {
            "id": ",".join(map(str, batch)),  # Ensure IDs are strings and comma-separated
            "aux": "urls,logo,description,date_launched,notice"  # Include optional metadata
        }

        response = fetch_data_from_api(url, params)

        if response:
            # Debugging: Print response structure
            print(f"Response Keys: {response.keys()}")
            print(f"Sample Data: {response.get('data', [])[:5]}")  # Show first 5 items (as a list)

            if isinstance(response.get("data"), list):
                # If the response data is a list, iterate over it and build the dictionary
                for dex in response["data"]:
                    dex_id = str(dex.get("id"))
                    if dex_id:  # Ensure there's a valid DEX ID
                        batched_data[dex_id] = dex  # Update with the DEX ID as the key
            else:
                print("Unexpected response format: Expected a list for 'data'")

        print(f"Waiting {delay} seconds before the next batch...")
        time.sleep(delay)  # Avoid hitting rate limits

    return batched_data

def fetch_network_id_map():
    """Fetch blockchain networks that DEXs operate on."""
    url = "https://pro-api.coinmarketcap.com/v4/dex/networks/list"
    return fetch_data_from_api(url)

def main():
    # Fetch all available DEXs and save
    dex_ids, dex_data = fetch_all_dex_ids()
    if dex_data:
        save_json('dex_listings.json', dex_data)

    if not dex_ids:
        print("❌ No valid DEX IDs found. Exiting.")
        return

    print(f"📊 Total Unique DEXs Found: {len(dex_ids)}")

    # Fetch DEX metadata in batches and save
    dex_metadata = fetch_dex_metadata(dex_ids, batch_size=20, delay=10)
    if dex_metadata:
        save_json('dex_metadata.json', dex_metadata)

    # Fetch and save network ID map
    network_map = fetch_network_id_map()
    if network_map:
        save_json('dex_networks.json', network_map)

if __name__ == "__main__":
    network_map = fetch_network_id_map()
    if network_map:
        with open('dex_networks.json', 'w') as f:
            json.dump(network_map, f, indent=4)
        print("Successfully saved networks map to 'dex_networks.json'")

