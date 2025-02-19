import requests
import csv
import os
from datetime import datetime
import pandas as pd

api_key = '419dc95e-f466-4c08-8c15-8873aa8511b0'
BASE_URL = "https://pro-api.coinmarketcap.com"
API_KEY = '419dc95e-f466-4c08-8c15-8873aa8511b0'
headers = {
    'X-CMC_PRO_API_KEY': api_key,
    'Accept': 'application/json',
}

