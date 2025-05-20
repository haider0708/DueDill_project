# Crypto Watch

Welcome to **Crypto Watch**, a front-end due diligence application built with TypeScript and JavaScript using Next.js by Vercel. This project is designed to provide users with a trusted platform to inspect digital assets and restore confidence in the cryptocurrency world.

## 🚀 Features

- **Real-Time Dashboard**: View up-to-the-minute cryptocurrency prices and market data.
- **User Authentication**: Secure login and signup functionality to protect user accounts.
- **About Section**: Detailed information on Real-Time Data, Advanced Analysis, and Security First, along with mission, team, and technology insights.
- **Chatbot**: Upload files and ask questions, with responses generated using RAG techniques and report generation in PPTX format.
- **Coin Analysis**: Analyze specific digital assets with AI-powered price forecasts and volatility analysis.
- **Crypto Education**: Learn about blockchain technology, trading strategies, and more with an interactive assistant.
- **Smart Contract Security Check**: Assess Ethereum blockchain vulnerabilities with detailed analysis.

## 📦 Installation

### ✅ Prerequisites

- Node.js (v14 or later)
- npm or yarn
- Git

### 🔧 Setup Instructions

1. **Clone the Repository**
   ```bash
   git https://github.com/haider0708/DueDill_project.git
   cd crypto-watch
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```
   or
   ```bash
   yarn install
   ```

3. **Run the Development Server**
   ```bash
   npm run dev
   ```
   or
   ```bash
   yarn dev
   ```

4. **Access the App**
   Open `http://localhost:3000` in your browser.

## 🧠 How It Works

- **Dashboard**: Displays real-time crypto prices and market caps, updated dynamically.
- **Authentication**: Users can sign up or log in to access personalized features.
- **Coin Analysis**: Select a cryptocurrency to view detailed insights, including price trends and risks.
- **Chatbot**: Upload files, ask questions, and generate a PPTX report summarizing the analysis.
- **Education**: Explore resources and ask the assistant for guidance on crypto topics.

## 📂 Project Structure

```
crypto-watch/
├── pages/
│   ├── index.js
│   ├── dashboard.js
│   ├── about.js
│   ├── chatbot.js
│   ├── coin-analysis.js
│   ├── education.js
│   └── security-check.js
├── components/
├── public/
├── styles/
├── package.json
├── tsconfig.json
├── next.config.js
└── README.md
```

## 📜 Requirements

Example `package.json` dependencies:
```json
{
  "dependencies": {
    "next": "^12.0.0",
    "react": "^17.0.2",
    "react-dom": "^17.0.2",
    "typescript": "^4.5.2"
  },
  "devDependencies": {
    "@types/node": "^17.0.0",
    "@types/react": "^17.0.2"
  }
}
```

## 🔐 Environment Variables

Create a `.env.local` file with:
```
NEXT_PUBLIC_API_URL=http://localhost:8000
```

> **Warning**: Do not commit sensitive data to GitHub!

## 🛠️ Built With

- **Next.js**: Framework by Vercel for server-side rendering and static site generation.
- **TypeScript**: Adds static typing for better code reliability.
- **JavaScript**: Core scripting language for interactivity.

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

MIT License © 2025 FIDUCIA

## 🙏 Special Thanks

This project aims to enhance transparency and trust in the crypto ecosystem. Made with 💻, 🧠, and ☕ by FIDUCIA.
