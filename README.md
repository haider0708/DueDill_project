# 🛡️ Crypto Due Diligence API

Welcome to the **Crypto Due Diligence API**, a robust and intelligent backend service designed to analyze, evaluate, and report on digital assets and cryptocurrencies. This tool empowers analysts, investors, and researchers to perform thorough due diligence using a combination of static data (e.g., whitepapers, team info, platform metadata) and dynamic AI-powered insights.

## 🚀 Features

- 🔍 Extracts coin names from user prompts automatically.
- 📡 Fetches real-time data from CoinGecko API.
- 📘 Analyzes whitepapers and project metadata.
- 🧠 Uses Retrieval-Augmented Generation (RAG) for accurate, context-aware answers.
- 📊 Provides structured due diligence insights, suitable for reports and presentations.
- 🖼️ (Upcoming) PowerPoint/PDF generation with custom templates.

## 📦 Installation

### ✅ Prerequisites

- Python 3.10+
- `pip`
- Git
- [Poetry](https://python-poetry.org/docs/) *(optional)*
- Optional: `Docker` (for containerized deployment)

### 🔧 Setup Instructions

1. **Clone the Repository**
   ```bash
   git clone https://github.com/your-username/crypto-due-diligence.git
   cd crypto-due-diligence
   ```

2. **Create and Activate Virtual Environment**
   ```bash
   python -m venv venv
   source venv/bin/activate  # Windows: venv\Scripts\activate
   ```

3. **Install Dependencies**
   ```bash
   pip install -r requirements.txt
   ```
   OR if using Poetry:
   ```bash
   poetry install
   ```

4. **Run the Server**
   ```bash
   uvicorn app.main:app --reload
   ```

5. **Access the API**
   Visit `http://127.0.0.1:8000/docs` for the Swagger UI.

## 🧠 How It Works

For a sample query like:
```
Tell me if Polygon is a safe investment and who is behind it.
```

The system will:
1. Identify "Polygon" as the coin.
2. Fetch CoinGecko data and matching document embeddings.
3. Retrieve relevant chunks using ChromaDB.
4. Send data to an LLM (Gemma or OpenAI).
5. Return a detailed response with reasoning, risks, team details, and investment insights.

## 📂 Project Structure

```
crypto-due-diligence/
├── app/
│   ├── main.py
│   ├── routers/
│   ├── services/
│   ├── utils/
│   ├── models/
├── embeddings/
├── requirements.txt
├── .env
├── Dockerfile
├── README.md
└── .github/workflows/ci.yml
```

## 📜 Requirements

Example `requirements.txt`:
```
fastapi
uvicorn
openai
pydantic
python-dotenv
requests
tqdm
langchain
chromadb
sentence-transformers
PyMuPDF
```

> **Note**: Add any additional libraries used in your RAG or whitepaper processing pipeline.

## 🔐 Environment Variables

Create a `.env` file with:
```
OPENAI_API_KEY=your-openai-api-key
COINGECKO_API_URL=https://api.coingecko.com/api/v3
MODEL_PROVIDER=gemma  # or openai
```

> **Warning**: Never commit your real API keys to GitHub!

## 🐳 Docker Setup

Example `Dockerfile`:
```dockerfile
FROM python:3.10

WORKDIR /app

COPY . /app

RUN pip install --no-cache-dir -r requirements.txt

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
```

## ⚙️ GitHub Actions CI

The `.github/workflows/ci.yml` ensures code quality:
```yaml
name: CI

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v3
    - name: Set up Python
      uses: actions/setup-python@v4
      with:
        python-version: 3.10
    - name: Install dependencies
      run: |
        python -m pip install --upgrade pip
        pip install -r requirements.txt
    - name: Lint with flake8
      run: |
        pip install flake8
        flake8 app/ --max-line-length=120
```

## 🔍 Example API Usage

**Endpoint**: `POST /analyze`

**Request**:
```json
{
  "query": "Is Solana a good long-term investment?"
}
```

**Response**:
```json
{
  "coin": "Solana",
  "summary": "Solana is a high-performance blockchain...",
  "team": "Led by Anatoly Yakovenko...",
  "platform": "Layer 1, Proof-of-History...",
  "risks": "Network outages, centralization concerns...",
  "investment_outlook": "High potential but moderate risk..."
}
```

## 🔮 Roadmap

- ✅ PDF & PowerPoint generation
- 🧾 Inline source references
- ⚠️ Smart contract audit checks
- 🧠 GPT-4 or Gemma-12B integrations
- 🔄 Real-time streaming answers
- 🌍 Multi-language support

## 🤝 Contributing

We welcome contributions! To contribute:
1. Create a feature branch:
   ```bash
   git checkout -b feature/your-feature
   ```
2. Commit your changes:
   ```bash
   git commit -am "Add new feature"
   ```
3. Push to the branch:
   ```bash
   git push origin feature/your-feature
   ```
4. Open a pull request.

## 📜 License

MIT License © 2025 [Your Name or Organization]

## 🧠 Built With

- FastAPI
- Uvicorn
- LangChain or LlamaIndex
- ChromaDB
- CoinGecko API
- Gemma
- OpenAI
- PyMuPDF

## 🙏 Special Thanks

This project aims to bring clarity and transparency to the digital asset space. Every crypto project has a story—our mission is to uncover and tell it responsibly.

Made with 💻, 🧠, and ☕ by [Your Name]
