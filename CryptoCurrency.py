from Imports import *

def fetch_data_from_api(url, params=None):
    response = requests.get(url, headers=headers, params=params)
    if response.status_code == 200:
        return response.json()
    else:
        print(f"Error fetching data from {url}: {response.status_code}")
        return None


def fetch_cryptocurrency_map():
    """Fetch cryptocurrency map with coin metadata."""
    url = "https://pro-api.coinmarketcap.com/v1/cryptocurrency/map"
    return fetch_data_from_api(url)


def fetch_cryptocurrency_info(crypto_ids):
    """Fetch metadata for specific cryptocurrencies."""
    if not isinstance(crypto_ids, list):
        raise ValueError("crypto_ids should be a list of integers")
    ids_str = ",".join(map(str, crypto_ids))
    url = "https://pro-api.coinmarketcap.com/v2/cryptocurrency/info"
    params = {"id": ids_str}
    return fetch_data_from_api(url, params)


def fetch_cryptocurrency_listings_latest(params=None):
    """Fetch latest cryptocurrency listings."""
    url = "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest"
    return fetch_data_from_api(url, params)


def fetch_cryptocurrency_quotes_latest(crypto_ids):
    """Fetch latest quotes for specific cryptocurrencies."""
    if not isinstance(crypto_ids, list):
        raise ValueError("crypto_ids should be a list of integers")
    ids_str = ",".join(map(str, crypto_ids))
    url = "https://pro-api.coinmarketcap.com/v2/cryptocurrency/quotes/latest"
    params = {"id": ids_str}
    return fetch_data_from_api(url, params)


def get_all_categories():
    """Fetch all cryptocurrency categories."""
    url = "https://pro-api.coinmarketcap.com/v1/cryptocurrency/categories"
    return fetch_data_from_api(url)


def get_category_details(category_id):
    """Fetch details for a specific category."""
    url = "https://pro-api.coinmarketcap.com/v1/cryptocurrency/category"
    params = {"id": str(category_id)}
    return fetch_data_from_api(url, params)


# --- CSV Saving Functions ---

def save_to_csv(data, filename, mode='w'):
    """Generic CSV saver with dynamic header handling."""
    try:
        if not data or 'data' not in data:
            print(f"No data to save for {filename}")
            return

        dataset = data['data']  # Extract actual data
        if isinstance(dataset, dict):
            dataset = list(dataset.values())  # Convert dict to list if needed

        processed_data = [flatten_item(item) for item in dataset]

        # Dynamically determine fieldnames
        all_keys = {key for item in processed_data for key in item.keys()}

        file_exists = os.path.exists(filename)
        with open(filename, mode, newline='', encoding='utf-8') as f:
            writer = csv.DictWriter(f, fieldnames=list(all_keys))
            if mode == 'w' or not file_exists:
                writer.writeheader()

            writer.writerows(processed_data)

        print(f"Successfully saved {len(processed_data)} records to {filename}")

    except Exception as e:
        print(f"Error saving {filename}: {str(e)}")


def flatten_item(item, parent_key=''):
    """Recursively flatten nested dictionaries."""
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


def get_crypto_ids_as_string(filename='crypto_map.csv'):
    """Get cryptocurrency IDs from a CSV as a comma-separated string."""
    try:
        df = pd.read_csv(filename)
        if 'id' not in df.columns:
            raise ValueError("Column 'id' not found in crypto_map.csv")
        return ",".join(df['id'].astype(str))
    except Exception as e:
        print(f"Error reading {filename}: {str(e)}")
        return ""


# --- Execution Example ---

def main():
    try:
        # Step 1: Get all categories and save them to CSV
        categories = get_all_categories()
        save_to_csv(categories, 'categories.csv')

        # Step 2: Get category details
        category_id = "605e2ce9d41eae1066535f7c"
        category_details = get_category_details(category_id)
        save_to_csv(category_details, 'category_details.csv')

        # Step 3: Get cryptocurrency IDs from CSV
        crypto_ids_str = get_crypto_ids_as_string()
        if crypto_ids_str:
            crypto_ids = crypto_ids_str.split(",")

            # Step 4: Fetch and save cryptocurrency quotes
            quotes = fetch_cryptocurrency_quotes_latest(crypto_ids)
            save_to_csv(quotes, 'quotes.csv')

            # Step 5: Fetch and save cryptocurrency listings
            listings = fetch_cryptocurrency_listings_latest({'limit': 5000, 'convert': 'USD'})
            save_to_csv(listings, 'listings.csv')

            # Step 6: Fetch and save cryptocurrency map
            crypto_map = fetch_cryptocurrency_map()
            save_to_csv(crypto_map, 'crypto_map.csv')

            # Step 7: Fetch and save all cryptocurrency info
            all_crypto_info = fetch_cryptocurrency_info(crypto_ids)
            save_to_csv(all_crypto_info, 'crypto_info.csv')
        else:
            print("No valid crypto IDs found in crypto_map.csv")

    except Exception as e:
        print(f"Execution error: {str(e)}")


if __name__ == "__main__":
    main()
