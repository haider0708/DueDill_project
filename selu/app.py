from flask import Flask, render_template, request
import pandas as pd
import json
import ollama

app = Flask(__name__)

# Define base path for the data
base_path = r""

# Load the market and news data
# Load crypto listings from JSON file
with open("crypto_listing.json", "r") as f:
    listings_data = json.load(f)["data"]  # Get the list inside "data"
news_data = pd.read_csv("news_data.csv")

def get_crypto_data(symbol, listings_data, news_df):
    crypto_info = next((item for item in listings_data if item['symbol'].lower() == symbol.lower()), None)
    if not crypto_info:
        return None, None
    news_related = news_df[news_df['trading_pair_or_currencies'].str.lower().str.contains(symbol.lower(), na=False)].sort_values(by="time", ascending=False).head(5)

    return crypto_info, news_related.to_dict(orient='records')


# Function to ask LLaMA about risk
def ask_llama_about_risk(symbol, market_info, news_related):
    prompt = f"""
You are a financial risk analyst. A user is asking about the RISK of investing in the cryptocurrency '{symbol}'.

Here is the market data:
{json.dumps(market_info, indent=2)}

Here are recent news articles:
{json.dumps(news_related, indent=2)}

Based on this information, tell me:
- Is this cryptocurrency risky?
- Why or why not?
- Summarize the decision in a single line at the end: RISK LEVEL = [LOW/MEDIUM/HIGH]

Limit your response to **no more than 4 to 5 concise lines**.
Don't forget to give The latest value of the coin.
"""

    response = ollama.chat(
        model='llama3.2',
        messages=[{"role": "user", "content": prompt}]
    )
    return response['message']['content']

# Route to handle the form input and display risk
@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        symbol = request.form['symbol']  # Get the symbol from the form
        market_info, news_related = get_crypto_data(symbol, listings_data, news_data)
        print(market_info)
        print(news_related)
        if market_info is None:
            risk_level = "No data available for the provided symbol."
        else:
            risk_level = ask_llama_about_risk(symbol, market_info, news_related)
        
        return render_template('result.html', risk_level=risk_level, symbol=symbol)


    return render_template('index.html')

if __name__ == '__main__':
    app.run(debug=True)
