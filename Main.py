import json
from CoinMarketCap import *

# Function to save data to a JSON file
def save_data_to_json(data, filename):
    if data:
        with open(filename, 'w') as f:
            json.dump(data, f, indent=4)
        print(f"Data saved to {filename}")
    else:
        print("No data to save.")

# Main function to fetch data from all endpoints and store them
def main():
    # Fetch data from each endpoint
    cryptocurrency_map = fetch_cryptocurrency_map()
    cryptocurrency_info = fetch_cryptocurrency_info()
    cryptocurrency_listings_latest = fetch_cryptocurrency_listings_latest()
    cryptocurrency_quotes_latest = fetch_cryptocurrency_quotes_latest()
    exchange_info = fetch_exchange_info()
    exchange_map = fetch_exchange_map()
    global_metrics_quotes_latest = fetch_global_metrics_quotes_latest()
    cmc100_historical = fetch_cmc100_historical()
    cmc100_latest = fetch_cmc100_latest()
    fear_and_greed_historical = fetch_fear_and_greed_historical()
    fear_and_greed_latest = fetch_fear_and_greed_latest()
    fiat_map = fetch_fiat_map()
    fcas_listings_latest = fetch_fcas_listings_latest()
    fcas_quotes_latest = fetch_fcas_quotes_latest()

    # Save data to JSON files
    save_data_to_json(cryptocurrency_map, 'cryptocurrency_map.json')
    save_data_to_json(cryptocurrency_info, 'cryptocurrency_info.json')
    save_data_to_json(cryptocurrency_listings_latest, 'cryptocurrency_listings_latest.json')
    save_data_to_json(cryptocurrency_quotes_latest, 'cryptocurrency_quotes_latest.json')
    save_data_to_json(exchange_info, 'exchange_info.json')
    save_data_to_json(exchange_map, 'exchange_map.json')
    save_data_to_json(global_metrics_quotes_latest, 'global_metrics_quotes_latest.json')
    save_data_to_json(cmc100_historical, 'cmc100_historical.json')
    save_data_to_json(cmc100_latest, 'cmc100_latest.json')
    save_data_to_json(fear_and_greed_historical, 'fear_and_greed_historical.json')
    save_data_to_json(fear_and_greed_latest, 'fear_and_greed_latest.json')
    save_data_to_json(fiat_map, 'fiat_map.json')
    save_data_to_json(fcas_listings_latest, 'fcas_listings_latest.json')
    save_data_to_json(fcas_quotes_latest, 'fcas_quotes_latest.json')

# Run the main function
if __name__ == '__main__':
    main()
