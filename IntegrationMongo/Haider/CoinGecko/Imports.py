import requests
import csv
import os
from datetime import datetime
import pandas as pd
import json
import time

BASE_URL = "https://api.coingecko.com/api/v3/"
headers = {
    "accept": "application/json",
    "x-cg-demo-api-key": "CG-r4rg1uwVRUGJW1dHm2zu5Evf"
}


def save_json(filename, data):
    """Save data to a JSON file."""
    try:
        with open(filename, 'w', encoding='utf-8') as f:
            json.dump(data, f, indent=4, ensure_ascii=False)
        print(f"✅ Successfully saved data to {filename}")
    except Exception as e:
        print(f"❌ Error saving {filename}: {e}")


def fetch_data_from_api(url, params=None, max_retries=5, wait_time=10):
    """Fetch data from CoinMarketCap API with retry logic and rate limiting."""
    for attempt in range(max_retries):
        response = requests.get(url, headers=headers, params=params)

        if response.status_code == 200:
            return response.json()

        elif response.status_code == 429:
            print(f"⚠️ Rate limit reached. Retrying in {wait_time} seconds...")
            time.sleep(wait_time)  # Wait before retrying

        else:
            print(f"❌ Error fetching data from {url}: {response.status_code} - {response.text}")
            break  # Exit loop on non-retryable errors

    return None  # Return None after max retries


def split_into_batches(data_list, batch_size=50):
    """Split a list into smaller batches to avoid URL length limits."""
    return [data_list[i:i + batch_size] for i in range(0, len(data_list), batch_size)]
