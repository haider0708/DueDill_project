from Imports import *


# Function to save data to CSV
def save_to_csv(data, filename, mode='w'):
    """Generic CSV saver with dynamic header handling."""
    try:
        if not data or 'data' not in data:
            print(f"No data to save for {filename}")
            return

        dataset = data['data']  # Extract actual data

        # If dataset is a dictionary (ID-based), convert it to a list
        if isinstance(dataset, dict):
            dataset = list(dataset.values())

        # Flatten the data
        processed_data = [flatten_item(item) for item in dataset]

        # Dynamically determine fieldnames
        all_keys = set()
        for item in processed_data:
            all_keys.update(item.keys())

        # Write to CSV
        file_exists = os.path.exists(filename)
        with open(filename, mode, newline='', encoding='utf-8') as f:
            writer = csv.DictWriter(f, fieldnames=list(all_keys))

            # Write header only if file doesn't exist or in write mode
            if mode == 'w' or not file_exists:
                writer.writeheader()

            writer.writerows(processed_data)

        print(f"Successfully saved {len(processed_data)} records to {filename}")

    except Exception as e:
        print(f"Error saving {filename}: {str(e)}")


def flatten_item(item, parent_key=''):
    """Recursively flatten nested dictionaries"""
    items = {}
    for k, v in item.items():
        new_key = f"{parent_key}_{k}" if parent_key else k

        if isinstance(v, dict):
            items.update(flatten_item(v, new_key))
        elif isinstance(v, list):
            items[new_key] = '; '.join(map(str, v))
        else:
            items[new_key] = v
    return items


# Fetch and process functions
def fetch_all_dex_ids():
    url = "https://pro-api.coinmarketcap.com/v4/dex/listings/quotes"
    response = requests.get(url, headers=headers)
    return response.json() if response.status_code == 200 else None


def fetch_dex_metadata(dex_ids):
    ids_str = ",".join(dex_ids)
    url = "https://pro-api.coinmarketcap.com/v4/dex/listings/info"
    params = {
        "id": ids_str,
    }
    response = requests.get(url, headers=headers, params=params)
    return response.json() if response.status_code == 200 else None


def fetch_network_id_map():
    url = "https://pro-api.coinmarketcap.com/v4/dex/networks/list"
    response = requests.get(url, headers=headers)
    return response.json() if response.status_code == 200 else None


def fetch_OHLCV_Historical(dex_ids):
    ids_str = ",".join(dex_ids)
    url = "https://pro-api.coinmarketcap.com/v4/dex/pairs/ohlcv/historical"
    params = {
        "id": ids_str,
    }
    response = requests.get(url, headers=headers, params=params)
    return response.json() if response.status_code == 200 else None


def fetch_OHLCV_Latest(dex_ids):
    ids_str = ",".join(dex_ids)
    url = "https://pro-api.coinmarketcap.com/v4/dex/pairs/ohlcv/latest"
    params = {
        "id": ids_str,
    }
    response = requests.get(url, headers=headers, params=params)
    return response.json() if response.status_code == 200 else None


def fetch_quotes_Latest(dex_ids):
    ids_str = ",".join(dex_ids)
    url = "https://pro-api.coinmarketcap.com/v4/dex/pairs/quotes/latest"
    params = {
        "id": ids_str,
    }
    response = requests.get(url, headers=headers, params=params)
    return response.json() if response.status_code == 200 else None


def fetch_Trades_Latest(dex_ids):
    ids_str = ",".join(dex_ids)
    url = "https://pro-api.coinmarketcap.com/v4/dex/pairs/trade/latest"
    params = {
        "id": ids_str,
    }
    response = requests.get(url, headers=headers, params=params)
    return response.json() if response.status_code == 200 else None


def fetch_PairsListing_Latest(dex_ids):
    ids_str = ",".join(dex_ids)
    url = "https://pro-api.coinmarketcap.com/v4/dex/spot-pairs/latest"
    params = {
        "id": ids_str,
    }
    response = requests.get(url, headers=headers, params=params)
    return response.json() if response.status_code == 200 else None


def fetch_cmc100_historical():
    url = "https://pro-api.coinmarketcap.com/v3/index/cmc100-historical"
    response = requests.get(url, headers=headers)
    return response.json() if response.status_code == 200 else None


def fetch_cmc100_latest():
    url = "https://pro-api.coinmarketcap.com/v3/index/cmc100-latest"
    response = requests.get(url, headers=headers)
    return response.json() if response.status_code == 200 else None


def get_dex_ids():
    dex_ids = fetch_all_dex_ids()
    if dex_ids and 'data' in dex_ids:
        return [str(d['id']) for d in dex_ids['data']]
    else:
        # Fallback to network IDs
        network_map = fetch_network_id_map()
        if network_map and 'data' in network_map:
            return [str(network['id']) for network in network_map['data']]
        else:
            return []


def get_dex_ids_from_csv(filename):
    """Retrieve Dex IDs from the CSV file."""
    dex_ids = []
    try:
        with open(filename, mode='r', newline='', encoding='utf-8') as file:
            reader = csv.DictReader(file)
            for row in reader:
                dex_ids.append(row.get('id'))  # Assuming the column name is 'id'
    except Exception as e:
        print(f"Error reading {filename}: {str(e)}")
    return dex_ids


def get_network_ids_from_csv(filename):
    """Retrieve Network IDs from the CSV file."""
    network_ids = []
    try:
        with open(filename, mode='r', newline='', encoding='utf-8') as file:
            reader = csv.DictReader(file)
            for row in reader:
                network_ids.append(row.get('id'))  # Assuming the column name is 'id'
    except Exception as e:
        print(f"Error reading {filename}: {str(e)}")
    return network_ids


def main():
    try:
        # Fetch all Dex IDs and save to CSV
        dex_ids = fetch_all_dex_ids()
        if dex_ids and 'data' in dex_ids:
            save_to_csv(dex_ids, 'dex_ids.csv', mode='w')
        else:
            print("No Dex IDs fetched.")

        # Fetch Network IDs and save to CSV
        network_map = fetch_network_id_map()
        if network_map and 'data' in network_map:
            save_to_csv(network_map, 'network_ids.csv', mode='w')
        else:
            print("No Network IDs fetched.")

        # Read Dex IDs and Network IDs from CSV
        dex_ids_from_csv = get_dex_ids_from_csv('dex_ids.csv')
        network_ids_from_csv = get_network_ids_from_csv('network_ids.csv')

        if not dex_ids_from_csv:
            print("No Dex IDs to process.")
            return

        # Fetch and save all data to CSV
        dex_metadata = fetch_dex_metadata(dex_ids_from_csv)
        save_to_csv(dex_metadata, 'dex_metadata.csv')

        print("Dex Metadata saved to CSV.")

        # Optionally, you can fetch data for Network IDs as well.
        # For example, you could call fetch_dex_metadata with network_ids_from_csv
        print("Processing for Network IDs could be added similarly.")

        print("All data fetched and saved to CSV.")

    except Exception as e:
        print(f"Execution error: {str(e)}")


if __name__ == "__main__":
    main()