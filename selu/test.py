import pandas as pd
import json

# Load market data
with open("market_data.json") as f:
    market_data = pd.json_normalize(json.load(f))

# Load news data
with open("news_data.json") as f:
    news_data = pd.json_normalize(json.load(f))

# Quick peek
print(market_data.head())
print(news_data.head())
