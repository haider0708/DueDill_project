import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Lightbulb, Clock } from "lucide-react"
import { EducationChatbot } from "@/components/education-chatbot"

export default function EducationPage() {
  return (
    <div className="container py-8 max-w-5xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2 text-gray-800">Crypto Education</h1>
          <p className="text-gray-600">Learn about cryptocurrency, blockchain technology, and trading strategies</p>
        </div>
        <Badge variant="outline" className="px-3 py-1 bg-primary/10 text-primary border-primary/20">
          <BookOpen className="h-4 w-4 mr-1" />
          Educational Resources
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Tabs defaultValue="basics" className="w-full">
            <TabsList className="bg-white mb-6 w-full justify-start">
              <TabsTrigger value="basics" className="data-[state=active]:bg-gray-100 text-gray-700">
                Crypto Basics
              </TabsTrigger>
              <TabsTrigger value="trading" className="data-[state=active]:bg-gray-100 text-gray-700">
                Trading Strategies
              </TabsTrigger>
              <TabsTrigger value="security" className="data-[state=active]:bg-gray-100 text-gray-700">
                Security Tips
              </TabsTrigger>
            </TabsList>

            <TabsContent value="basics">
              <div className="space-y-6">
                <Card className="bg-white border-gray-200 text-gray-800">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>What is Blockchain Technology?</CardTitle>
                        <CardDescription className="text-gray-500">The foundation of cryptocurrencies</CardDescription>
                      </div>
                      <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100">Beginner</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="prose max-w-none text-gray-700">
                      <p>
                        Blockchain is a distributed ledger technology that enables secure, transparent, and immutable
                        record-keeping without the need for a central authority. It serves as the foundation for
                        cryptocurrencies like Bitcoin and Ethereum.
                      </p>
                      <h3>Key Features of Blockchain:</h3>
                      <ul>
                        <li>
                          <strong>Decentralization:</strong> No single entity has control over the entire network
                        </li>
                        <li>
                          <strong>Transparency:</strong> All transactions are visible to network participants
                        </li>
                        <li>
                          <strong>Immutability:</strong> Once recorded, data cannot be altered retroactively
                        </li>
                        <li>
                          <strong>Security:</strong> Cryptographic techniques ensure data integrity
                        </li>
                      </ul>
                      <p>
                        Blockchain technology has applications beyond cryptocurrencies, including supply chain
                        management, voting systems, and digital identity verification.
                      </p>
                    </div>
                    <div className="flex items-center mt-4 text-sm text-gray-500">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>5 min read</span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white border-gray-200 text-gray-800">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>Understanding Cryptocurrency Wallets</CardTitle>
                        <CardDescription className="text-gray-500">How to store your digital assets</CardDescription>
                      </div>
                      <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100">Beginner</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="prose max-w-none text-gray-700">
                      <p>
                        Cryptocurrency wallets are tools that allow you to interact with blockchain networks. Despite
                        their name, they don't actually store your cryptocurrencies. Instead, they store your private
                        keys, which are needed to access and manage your digital assets on the blockchain.
                      </p>
                      <h3>Types of Cryptocurrency Wallets:</h3>
                      <ul>
                        <li>
                          <strong>Hot Wallets:</strong> Connected to the internet (mobile apps, desktop software, web
                          wallets)
                        </li>
                        <li>
                          <strong>Cold Wallets:</strong> Offline storage solutions (hardware wallets, paper wallets)
                        </li>
                        <li>
                          <strong>Custodial Wallets:</strong> Third-party services that manage your keys
                        </li>
                        <li>
                          <strong>Non-custodial Wallets:</strong> You maintain full control of your private keys
                        </li>
                      </ul>
                      <p>
                        When choosing a wallet, consider factors like security, convenience, supported cryptocurrencies,
                        and your specific needs as an investor or trader.
                      </p>
                    </div>
                    <div className="flex items-center mt-4 text-sm text-gray-500">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>7 min read</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="trading">
              <div className="space-y-6">
                <Card className="bg-white border-gray-200 text-gray-800">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>Technical Analysis Fundamentals</CardTitle>
                        <CardDescription className="text-gray-500">
                          Reading charts and identifying patterns
                        </CardDescription>
                      </div>
                      <Badge className="bg-yellow-100 text-yellow-700 hover:bg-yellow-100">Intermediate</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="prose max-w-none text-gray-700">
                      <p>
                        Technical analysis is a trading methodology that involves analyzing statistical trends gathered
                        from trading activity, such as price movement and volume. Unlike fundamental analysis, which
                        focuses on a cryptocurrency's underlying value, technical analysis focuses on patterns of price
                        movements, trading signals, and various analytical charting tools.
                      </p>
                      <h3>Key Technical Analysis Concepts:</h3>
                      <ul>
                        <li>
                          <strong>Support and Resistance:</strong> Price levels where a cryptocurrency has historically
                          had difficulty falling below (support) or rising above (resistance)
                        </li>
                        <li>
                          <strong>Trend Lines:</strong> Lines drawn on charts to indicate the direction of price
                          movement
                        </li>
                        <li>
                          <strong>Moving Averages:</strong> Average price of a cryptocurrency over a specific time
                          period
                        </li>
                        <li>
                          <strong>Chart Patterns:</strong> Recognizable patterns in price charts that may indicate
                          future price movements
                        </li>
                      </ul>
                      <p>
                        While technical analysis can be a powerful tool, it's important to remember that past
                        performance doesn't guarantee future results, especially in the volatile cryptocurrency market.
                      </p>
                    </div>
                    <div className="flex items-center mt-4 text-sm text-gray-500">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>10 min read</span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white border-gray-200 text-gray-800">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>Risk Management Strategies</CardTitle>
                        <CardDescription className="text-gray-500">Protecting your investment</CardDescription>
                      </div>
                      <Badge className="bg-yellow-100 text-yellow-700 hover:bg-yellow-100">Intermediate</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="prose max-w-none text-gray-700">
                      <p>
                        Risk management is crucial in cryptocurrency trading due to the market's high volatility.
                        Implementing effective risk management strategies can help protect your capital and ensure
                        long-term trading success.
                      </p>
                      <h3>Essential Risk Management Techniques:</h3>
                      <ul>
                        <li>
                          <strong>Position Sizing:</strong> Only risking a small percentage of your portfolio on any
                          single trade
                        </li>
                        <li>
                          <strong>Stop-Loss Orders:</strong> Setting predetermined exit points to limit potential losses
                        </li>
                        <li>
                          <strong>Take-Profit Orders:</strong> Setting price targets to secure profits
                        </li>
                        <li>
                          <strong>Diversification:</strong> Spreading investments across different cryptocurrencies
                        </li>
                        <li>
                          <strong>Risk-Reward Ratio:</strong> Ensuring potential profits outweigh potential losses
                        </li>
                      </ul>
                      <p>
                        Remember that preserving capital should be your primary concern. Even the most sophisticated
                        trading strategies can fail if proper risk management isn't in place.
                      </p>
                    </div>
                    <div className="flex items-center mt-4 text-sm text-gray-500">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>8 min read</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="security">
              <div className="space-y-6">
                <Card className="bg-white border-gray-200 text-gray-800">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>Protecting Your Crypto Assets</CardTitle>
                        <CardDescription className="text-gray-500">Essential security practices</CardDescription>
                      </div>
                      <Badge className="bg-green-100 text-green-700 hover:bg-green-100">All Levels</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="prose max-w-none text-gray-700">
                      <p>
                        Security is paramount when dealing with cryptocurrencies. Unlike traditional financial systems,
                        cryptocurrency transactions are irreversible, and there's often no central authority to help
                        recover lost or stolen funds.
                      </p>
                      <h3>Best Practices for Crypto Security:</h3>
                      <ul>
                        <li>
                          <strong>Use Hardware Wallets:</strong> Store significant amounts in cold storage devices like
                          Ledger or Trezor
                        </li>
                        <li>
                          <strong>Enable Two-Factor Authentication (2FA):</strong> Add an extra layer of security to all
                          your accounts
                        </li>
                        <li>
                          <strong>Create Strong, Unique Passwords:</strong> Use a password manager to generate and store
                          complex passwords
                        </li>
                        <li>
                          <strong>Beware of Phishing Attempts:</strong> Always verify website URLs and email senders
                        </li>
                        <li>
                          <strong>Keep Software Updated:</strong> Ensure your devices and wallet software are up to date
                        </li>
                        <li>
                          <strong>Backup Your Wallet:</strong> Securely store your recovery phrases and private keys
                        </li>
                      </ul>
                      <p>
                        Remember: in the world of cryptocurrency, you are your own bank. With that freedom comes the
                        responsibility to implement proper security measures.
                      </p>
                    </div>
                    <div className="flex items-center mt-4 text-sm text-gray-500">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>6 min read</span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white border-gray-200 text-gray-800">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>Recognizing Crypto Scams</CardTitle>
                        <CardDescription className="text-gray-500">Common frauds and how to avoid them</CardDescription>
                      </div>
                      <Badge className="bg-green-100 text-green-700 hover:bg-green-100">All Levels</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="prose max-w-none text-gray-700">
                      <p>
                        The cryptocurrency space, while innovative, has unfortunately attracted numerous scammers and
                        fraudsters. Being able to identify common scams is essential for protecting your investments.
                      </p>
                      <h3>Common Cryptocurrency Scams:</h3>
                      <ul>
                        <li>
                          <strong>Fake ICOs/Token Sales:</strong> Fraudulent projects that disappear after collecting
                          funds
                        </li>
                        <li>
                          <strong>Pump and Dump Schemes:</strong> Artificially inflating a coin's price before selling
                          off holdings
                        </li>
                        <li>
                          <strong>Phishing Attacks:</strong> Fake websites or emails designed to steal your private keys
                          or login credentials
                        </li>
                        <li>
                          <strong>Ponzi/Pyramid Schemes:</strong> Projects promising unrealistic returns that rely on
                          new investors to pay earlier ones
                        </li>
                        <li>
                          <strong>Fake Exchanges:</strong> Fraudulent platforms that steal deposited funds
                        </li>
                        <li>
                          <strong>Giveaway Scams:</strong> False promises of returning more cryptocurrency than you send
                        </li>
                      </ul>
                      <p>
                        Always conduct thorough research before investing, be skeptical of promises that sound too good
                        to be true, and never share your private keys or recovery phrases with anyone.
                      </p>
                    </div>
                    <div className="flex items-center mt-4 text-sm text-gray-500">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>9 min read</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <div className="lg:col-span-1">
          <Card className="bg-white border-gray-200 text-gray-800 sticky top-20">
            <CardHeader className="border-b border-gray-100">
              <CardTitle className="flex items-center text-lg">
                <Lightbulb className="h-5 w-5 mr-2 text-primary" />
                Education Assistant
              </CardTitle>
              <CardDescription className="text-gray-500">
                Have questions about crypto? Our assistant can help!
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <EducationChatbot />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
