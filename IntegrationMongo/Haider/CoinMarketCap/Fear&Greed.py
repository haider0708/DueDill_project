from Imports import *

# Function to fetch Crypto Fear and Greed latest data
def fetch_fear_and_greed_latest():
    url = "https://pro-api.coinmarketcap.com/v3/fear-and-greed/latest"
    return fetch_data_from_api(url)


if __name__ == "__main__":
    # Fetch the latest Crypto Fear and Greed data
    fear_and_greed_data = fetch_fear_and_greed_latest()

    # If data was successfully fetched, save it to a JSON file
    if fear_and_greed_data:
        save_json('fear_and_greed_latest.json', fear_and_greed_data)
    else:
        print("❌ Failed to fetch the Fear and Greed data.")