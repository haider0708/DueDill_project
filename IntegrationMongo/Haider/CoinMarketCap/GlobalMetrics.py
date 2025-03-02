from Imports import *

def fetch_global_metrics():
    """Fetch global cryptocurrency market metrics."""
    url = "https://pro-api.coinmarketcap.com/v1/global-metrics/quotes/latest"
    params = {
        'convert': 'USD',  # You can adjust this to fetch data for other currencies or cryptos
    }
    return fetch_data_from_api(url, params=params)


def main():
    # Fetch the latest global market data
    global_metrics = fetch_global_metrics()

    if global_metrics:
        # Save the global metrics data to a file
        save_json('global_metrics.json', global_metrics)
        print("Successfully saved global market data to 'global_metrics.json'")
    else:
        print("❌ Failed to fetch global market data.")


if __name__ == "__main__":
    main()
