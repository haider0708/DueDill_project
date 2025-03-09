from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.options import Options
import requests
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from webdriver_manager.chrome import ChromeDriverManager
import time
import pandas as pd
import re
import matplotlib.pyplot as plt
from datetime import datetime
from pymongo import MongoClient
import json
import os

#starting with binance website 
options = Options()
options.add_argument("--headless")  # Run in headless mode (no UI)
options.add_argument("--disable-gpu")
options.add_argument("--no-sandbox")
options.add_argument(
    "user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36"
)
# Set up the WebDriver
driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=options)
#driver = webdriver.Chrome(service=service)

# Open the target webpage
url = "https://www.binance.com/en/square/news/all"
driver.get(url)

# Wait for the main container to be available
WebDriverWait(driver, 5).until(EC.presence_of_element_located((By.CLASS_NAME, "css-mycpt4")))

# Regex pattern to check if time_info ends with "m" (minutes) or "h" (hours)
valid_time_pattern = re.compile(r"^\d+[mh]$")

while True:
    # Locate all news items inside the main container
    folder = driver.find_element(By.CLASS_NAME, "css-mycpt4")
    items = folder.find_elements(By.CLASS_NAME, "css-vurnku")

    for item in items:
        try:
            # Extract time_info
            time_info_element = item.find_elements(By.CLASS_NAME, "css-vyak18")
            time_info = time_info_element[0].text if time_info_element else "N/A"

            # If time_info is not "N/A" and doesn't match minutes/hours, stop
            if time_info != "N/A" and not valid_time_pattern.match(time_info):
                print(f"Stopping loop. Found different time_info: {time_info}")
                driver.quit()
                break

            # Extract title
            title_element = item.find_elements(By.TAG_NAME, "a")
            title = title_element[0].text if title_element else "N/A"

            # Extract trading pair
            trading_pair_element = item.find_elements(By.CLASS_NAME, "symbol")
            trading_pair = trading_pair_element[0].text if trading_pair_element else "N/A"

            # Extract price change
            price_change_elements = item.find_elements(By.CSS_SELECTOR, ".index, .price-decline, .price-raise")
            price_change = price_change_elements[0].text if price_change_elements else "N/A"

            # Save data
            with open("scraped_data.txt", "a", encoding="utf-8") as file:
                file.write(f"Time: {time_info}\n")
                file.write(f"Article Title: {title}\n")
                file.write(f"Trading Pair: {trading_pair}\n")
                file.write(f"Price Change: {price_change}\n")
                file.write("=" * 50 + "\n")

        except Exception as e:
            print(f"Skipping an item due to error: {e}")

    # Scroll down to load more items
    try:
        driver.execute_script("window.scrollBy(0, 3000);")
        time.sleep(0.5)  # Wait for new elements to load

        # Check if new items were loaded
        new_items = driver.find_elements(By.CLASS_NAME, "css-vurnku")
        if len(new_items) == len(items):  # No new items loaded
            break
        items = new_items  # Update item list

    except Exception as e:
        print(f"Error while scrolling: {e}")
        break

print("Scraping complete! Data saved in 'scraped_data.txt'.")
driver.quit()

#cleaning the data ( 100 % null entries )
def clean_text_file(input_file, output_file):
    with open(input_file, 'r', encoding='utf-8') as file:
        lines = file.read().split('==================================================\n')
    
    cleaned_entries = set()
    valid_entries = []
    
    for entry in lines:
        entry = entry.strip()
        if entry and "Time: N/A" not in entry:
            if entry not in cleaned_entries:
                cleaned_entries.add(entry)
                valid_entries.append(entry)
    
    with open(output_file, 'w', encoding='utf-8') as file:
        file.write("\n==================================================\n".join(valid_entries))
    

clean_text_file('scraped_data.txt', 'scraped_data_clean.txt')


# cryptopanic

api_key = "8e28de32e82845fc3c95c005932eb8ed2fc67f87"
base_url = f"https://cryptopanic.com/api/v1/posts/?auth_token={api_key}&kind=news"

# Set up Selenium WebDriver options
options = Options()
options.add_argument("--headless")  # Run in headless mode (no UI)
options.add_argument("--disable-gpu")
options.add_argument("--no-sandbox")
options.add_argument(
    "user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36"
)

# Initialize the WebDriver
driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=options)

# Fetch posts from the first 5 pages
def fetch_posts_from_multiple_pages(pages):
    all_posts = []
    
    for page in range(1, pages + 1):
        url = f"{base_url}&page={page}"
        response = requests.get(url)

        if response.status_code == 200:
            data = response.json()
            posts = data.get("results", [])

            if not posts:
                print(f"No posts found on page {page}.")
                break

            all_posts.extend(posts)
        else:
            print(f"Error: Unable to fetch posts for page {page} (status code: {response.status_code})")
            break

    return all_posts

posts = fetch_posts_from_multiple_pages(pages=10)

# Loop through the posts and scrape the article content
for i, post in enumerate(posts): 
    title = post["title"]
    link = post["url"]
    publish_date = post["published_at"]
    currency = post.get("currencies", [])  # Fix: Avoid KeyError
    currency_codes = [c["code"] for c in currency]  # Extract codes safely
    
    print(f"{i+1}. Title: {title}")

    # Open the article URL in Selenium
    driver.get(link)
    time.sleep(0.5)  # Wait for the page to load
    
    # Try to find the description-body content
    try:
        content_element = driver.find_element(By.CLASS_NAME, "description-body")
        content = content_element.text
        with open("cryptopanic.txt", "a", encoding="utf-8") as file:
            file.write(f"title: {title}"+"\n")
            file.write(f"Content: {content}"+"\n")
            file.write(f"Publish Date: {publish_date}"+"\n")
            file.write(f"Currencies: {', '.join(currency_codes) if currency_codes else 'None'}"+"\n")
            file.write("=" * 50 + "\n")
    except Exception as e:
        print(f"   Error scraping content: {e}")
    
    print("\n")

# Close the WebDriver
driver.quit()

#processing all datafiles to merge into a single dataset ( unified input )

def process_file1(file_path):
    today = datetime.utcnow().date()
    
    with open(file_path, 'r', encoding='utf-8') as file:
        data = file.read().strip().split("==================================================")

    extracted_data = []
    for entry in data:
        title_match = re.search(r"title:\s*(.+)", entry)
        content_match = re.search(r"Content:\s*(.+)", entry, re.DOTALL)
        time_match = re.search(r"Publish Date:\s*(.+)", entry)
        currencies_match = re.search(r"Currencies:\s*(.+)", entry)

        # Skip entries that don't have a publish date
        if not time_match:
            continue  

        try:
            publish_date = datetime.strptime(time_match.group(1).strip(), "%Y-%m-%dT%H:%M:%SZ").date()
        except ValueError:
            continue  # Skip entries with invalid date format

        # Skip if the publish date is not today
        if publish_date != today:
            continue  

        title = title_match.group(1).strip() if title_match else "N/A"
        content = content_match.group(1).strip() if content_match else "N/A"
        trading_pair_or_currencies = currencies_match.group(1).strip() if currencies_match else "N/A"
        publish_date_str = time_match.group(1).strip()

        extracted_data.append([title, content, publish_date_str, trading_pair_or_currencies, "N/A"])

    return extracted_data


# Function to process the second file (type 2)
def process_file2(file_path):
    with open(file_path, 'r', encoding='utf-8') as file:
        data = file.read().strip().split("==================================================")

    extracted_data = []
    for entry in data:
        title_match = re.search(r"title:\s*(.+)", entry)
        content_match = re.search(r"description:\s*(.+)", entry, re.DOTALL)
        time_match = re.search(r"time:\s*(.+)", entry)

        title = title_match.group(1).strip() if title_match else None
        content = content_match.group(1).strip() if content_match else None
        time = time_match.group(1).strip() if time_match else None

        extracted_data.append([title, content, time, "N/A", "N/A"])

    return extracted_data


# Function to process the third file (type 3)
def process_file3(file_path):
    with open(file_path, 'r', encoding='utf-8') as file:
        data = file.read().strip().split("==================================================")

    extracted_data = []
    for entry in data:
        time_match = re.search(r"Time:\s*(.+)", entry)
        title_match = re.search(r"Article Title:\s*(.+)", entry)
        content_match = re.search(r"According to (.+)", entry, re.DOTALL)
        trading_pair_match = re.search(r"Trading Pair:\s*(.+)", entry)
        price_change_match = re.search(r"Price Change:\s*(.+)", entry)

        time = time_match.group(1).strip() if time_match else None
        title = title_match.group(1).strip() if title_match else None
        content = content_match.group(1).strip() if content_match else None
        trading_pair_or_currencies = trading_pair_match.group(1).strip() if trading_pair_match else "N/A"
        price_change = price_change_match.group(1).strip() if price_change_match else "N/A"

        extracted_data.append([title, content, time, trading_pair_or_currencies, price_change])

    return extracted_data


# Read and process all files
file1_data = process_file1("cryptopanic.txt")
#file2_data = process_file2("res.txt")
file3_data = process_file3("scraped_data_clean.txt")
file3_data
# Combine all data into a single DataFrame
columns = ["title", "content", "time", "trading_pair_or_currencies", "price_change"]

df = pd.DataFrame(file1_data + file3_data, columns=columns)


# dropping duplicates 
df=df.drop_duplicates()

df = df.dropna(subset=['content'])

# replace all time values with today's date ( unified format)
def convert_to_today(_):
    return datetime.now().strftime("%Y-%m-%d")  # Format as YYYY-MM-DD

# Apply the function to the "time" column
df["time"] = df["time"].apply(convert_to_today)

import hashlib
def generate_hash(text):
    return hashlib.md5(text.encode()).hexdigest() if text else None

def clean_text(text):
    if not isinstance(text, str):  # Ensure text is a string
        return ""
    text = re.sub(r'\s+', ' ', text)  # Remove extra whitespace
    text = re.sub(r'[^\w\s.,!?]', '', text)  # Remove special characters except punctuation
    return text.strip()

def fix_encoding(text):
    if not isinstance(text, str):  # Ensure text is a string
        return ""
    return text.encode('utf-8').decode('utf-8', 'ignore')

df['cleaned_content'] = df['content'].apply(lambda x: fix_encoding(clean_text(x)))

# Generate hash for deduplication
df['hash'] = df['cleaned_content'].apply(generate_hash)

# Remove duplicates based on hash
df = df.drop_duplicates(subset=['hash'], keep='first')

print("Processing and preparation phase is complete !")

#final output in a csv file 
df.to_csv('data.csv', index=False)


# mount to mongodb

# Se connecter à MongoDB
connection_string = "mongodb+srv://nasrhamza:drgzquMCEexvUYVV@cluster0.6pqb0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
client = MongoClient(connection_string)

# Sélectionner la base de données et la collection
db = client.due_diligence
collection = db.news

# Lire le fichier CSV
df = pd.read_csv('data.csv')
# Convertir le DataFrame en une liste de dictionnaires
data = df.to_dict('records')

# Insérer les données dans la collection
collection.insert_many(data)

print("Données insérées avec succès !")


files_to_delete = [
    "cryptopanic.txt",
    "scraped_data_clean.txt",
    "scraped_data.txt",
    "data.csv"
]

for file in files_to_delete:
    if os.path.exists(file):
        os.remove(file)
        print(f"Deleted: {file}")