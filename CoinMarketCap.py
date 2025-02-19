from Imports import *

# Function to fetch global metrics quotes (latest)
def fetch_global_metrics_quotes_latest():
    url = "https://pro-api.coinmarketcap.com/v1/global-metrics/quotes/latest"
    response = requests.get(url, headers=headers)
    return response.json() if response.status_code == 200 else None

# Function to fetch fiat mapping
def fetch_fiat_map():
    url = "https://pro-api.coinmarketcap.com/v1/fiat/map"
    response = requests.get(url, headers=headers)
    return response.json() if response.status_code == 200 else None


def save_global_metrics_to_csv(data, filename='global_metrics.csv'):
    try:
        global_data = data['data']

        # Extract and merge USD quote data
        usd_quote = global_data.get('quote', {}).get('USD', {})
        for key, value in usd_quote.items():
            if key != 'last_updated':  # Avoid duplicate timestamp
                global_data[f'usd_{key}'] = value

        # Prepare CSV data
        csv_columns = global_data.keys()
        file_exists = os.path.isfile(filename)

        with open(filename, 'a', newline='') as csvfile:
            writer = csv.DictWriter(csvfile, fieldnames=csv_columns)
            if not file_exists:
                writer.writeheader()
            writer.writerow(global_data)

        print(f"Successfully saved global metrics to {filename}")

    except Exception as e:
        print(f"Error saving global metrics: {str(e)}")


def save_fiat_map_to_csv(data, filename='fiat_map.csv'):
    try:
        fiats = data['data']
        if not fiats:
            print("No fiat data available")
            return

        # Get fieldnames from the first item
        csv_columns = fiats[0].keys()

        # Open the file with UTF-8 encoding
        with open(filename, 'w', newline='', encoding='utf-8') as csvfile:
            writer = csv.DictWriter(csvfile, fieldnames=csv_columns)
            writer.writeheader()
            for fiat in fiats:
                writer.writerow(fiat)

        print(f"Successfully saved fiat map to {filename}")

    except Exception as e:
        print(f"Error saving fiat map: {str(e)}")



if __name__ == "__main__":
    # Fetch and save global metrics
    global_metrics = fetch_global_metrics_quotes_latest()
    if global_metrics:
        save_global_metrics_to_csv(global_metrics)
    else:
        print("Failed to fetch global metrics")

    # Fetch and save fiat map
    fiat_map = fetch_fiat_map()
    if fiat_map:
        save_fiat_map_to_csv(fiat_map)
    else:
        print("Failed to fetch fiat map")



