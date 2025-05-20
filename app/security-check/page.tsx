"use client"

import { Badge } from "@/components/ui/badge"
import { useState } from "react"
import { useAuth } from "@/hooks/use-auth"
import { redirect } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, CheckCircle, AlertCircle, Code, AlertTriangle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"

// Vulnerability labels mapping
const VULNERABILITY_LABELS = {
  0: "access-control",
  1: "arithmetic",
  2: "other",
  3: "reentrancy",
  4: "safe",
  5: "unchecked-calls",
}

// Vulnerability descriptions
const VULNERABILITY_DESCRIPTIONS = {
  "access-control": "Issues with contract permissions and access restrictions",
  arithmetic: "Potential arithmetic bugs like overflow/underflow",
  other: "Miscellaneous vulnerabilities not in other categories",
  reentrancy: "Vulnerabilities allowing attackers to re-enter contracts",
  safe: "No known vulnerabilities detected",
  "unchecked-calls": "External calls without proper error handling",
}

// Vulnerability severity levels
const VULNERABILITY_SEVERITY = {
  "access-control": "high",
  arithmetic: "medium",
  other: "medium",
  reentrancy: "critical",
  safe: "none",
  "unchecked-calls": "high",
}

type PredictionResult = {
  [key: string]: number
}

type AnalysisResult = {
  label: string
  value: number
  description: string
  severity: string
}

export default function SecurityCheckPage() {
  const { user } = useAuth()
  const [securityKey, setSecurityKey] = useState("")
  const [isChecking, setIsChecking] = useState(false)
  const [isSecured, setIsSecured] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [analysisResults, setAnalysisResults] = useState<AnalysisResult[] | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  // Redirect if not logged in
  if (!user) {
    redirect("/login?redirect=/security-check")
  }

  const handleSecurityCheck = async () => {
    setIsChecking(true)
    setError(null)
    setAnalysisResults(null)

    if (!securityKey.trim()) {
      setError("Please enter a security key or bytecode")
      setIsChecking(false)
      return
    }

    try {
      setIsAnalyzing(true)

      // Call the prediction endpoint
      const response = await fetch("http://127.0.0.1:8000/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          bytecode: securityKey,
        }),
      })

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`)
      }

      const data = await response.json()

      // Process the prediction results
      if (data.predictions) {
        const results: AnalysisResult[] = []

        // Convert predictions to analysis results
        Object.entries(data.predictions).forEach(([key, value]) => {
          const numericKey = Number.parseInt(key)
          const label = VULNERABILITY_LABELS[numericKey as keyof typeof VULNERABILITY_LABELS] || "unknown"

          results.push({
            label,
            value: value as number,
            description:
              VULNERABILITY_DESCRIPTIONS[label as keyof typeof VULNERABILITY_DESCRIPTIONS] ||
              "Unknown vulnerability type",
            severity: VULNERABILITY_SEVERITY[label as keyof typeof VULNERABILITY_SEVERITY] || "unknown",
          })
        })

        setAnalysisResults(results)

        // Check if any vulnerabilities were found
        const hasVulnerabilities = results.some((result) => result.value > 0 && result.label !== "safe")

        setIsSecured(!hasVulnerabilities)
      } else {
        throw new Error("Invalid response format")
      }
    } catch (err) {
      console.error("Error during security check:", err)
      setError(`Failed to analyze bytecode: ${err instanceof Error ? err.message : "Unknown error"}`)
    } finally {
      setIsChecking(false)
      setIsAnalyzing(false)
    }
  }

  const generateEthereumBytecode = () => {
    setIsGenerating(true)

    // Simulate bytecode generation
    setTimeout(() => {
      // This is an example of Ethereum contract bytecode (simplified for demo)
      const bytecode =
        "0x608060405234801561001057600080fd5b50610150806100206000396000f3fe608060405234801561001057600080fd5b50600436106100365760003560e01c80632e64cec11461003b5780636057361d14610059575b600080fd5b610043610075565b60405161005091906100d9565b60405180910390f35b610073600480360381019061006e919061009d565b61007e565b005b60008054905090565b8060008190555050565b60008135905061009781610103565b92915050565b6000602082840312156100b3576100b26100fe565b5b60006100c184828501610088565b91505092915050565b6100d3816100f4565b82525050565b60006020820190506100ee60008301846100ca565b92915050565b6000819050919050565b600080fd5b61010c816100f4565b811461011757600080fd5b5056fea2646970667358221220223b571f95c2a5e25a4c3a4231a6f6c72d3a3ad8c3ca4b3f3f698ad99636870264736f6c63430008070033"

      setSecurityKey(bytecode)
      setIsGenerating(false)
    }, 1000)
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "bg-red-500"
      case "high":
        return "bg-orange-500"
      case "medium":
        return "bg-yellow-500"
      case "low":
        return "bg-blue-500"
      case "none":
        return "bg-green-500"
      default:
        return "bg-gray-500"
    }
  }

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case "critical":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Critical</Badge>
      case "high":
        return <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-100">High</Badge>
      case "medium":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Medium</Badge>
      case "low":
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Low</Badge>
      case "none":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">None</Badge>
      default:
        return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">Unknown</Badge>
    }
  }

  return (
    <div className="container py-12 max-w-md">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">Security Verification</h1>

      <Card className="bg-white border-gray-200 shadow-lg">
        <CardHeader className="text-center border-b border-gray-100 bg-gray-50">
          <div className="mx-auto mb-4 p-3 bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center">
            <Shield className="h-8 w-8 text-primary" />
          </div>
          <CardTitle className="text-xl text-gray-800">Smart Contract Security Check</CardTitle>
          <CardDescription className="text-gray-500">
            Analyze Ethereum smart contract bytecode for potential vulnerabilities
          </CardDescription>
        </CardHeader>

        <CardContent className="pt-6">
          {isSecured && analysisResults ? (
            <div className="text-center">
              <div className="mx-auto mb-4 p-3 bg-green-100 rounded-full w-16 h-16 flex items-center justify-center">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-green-600 mb-2">Contract Secure</h3>
              <p className="text-gray-600 mb-6">No critical vulnerabilities detected in the analyzed smart contract.</p>

              <div className="space-y-4">
                <h4 className="font-medium text-gray-700 text-left">Vulnerability Analysis Results:</h4>
                {analysisResults.map((result, index) => (
                  <div key={index} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="flex justify-between items-center mb-2">
                      <h5 className="font-medium text-gray-800 capitalize">{result.label}</h5>
                      {getSeverityBadge(result.severity)}
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{result.description}</p>
                    <div className="flex items-center gap-2">
                      <div className="text-sm font-medium text-gray-700 w-10">{result.value}</div>
                      <Progress
                        value={result.value * 100}
                        className="h-2"
                        indicatorClassName={result.value > 0 ? getSeverityColor(result.severity) : "bg-gray-200"}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : !isSecured && analysisResults ? (
            <div className="text-center">
              <div className="mx-auto mb-4 p-3 bg-red-100 rounded-full w-16 h-16 flex items-center justify-center">
                <AlertTriangle className="h-8 w-8 text-red-600" />
              </div>
              <h3 className="text-xl font-bold text-red-600 mb-2">Vulnerabilities Detected</h3>
              <p className="text-gray-600 mb-6">
                The analyzed smart contract contains potential security vulnerabilities.
              </p>

              <div className="space-y-4">
                <h4 className="font-medium text-gray-700 text-left">Vulnerability Analysis Results:</h4>
                {analysisResults.map((result, index) => (
                  <div key={index} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="flex justify-between items-center mb-2">
                      <h5 className="font-medium text-gray-800 capitalize">{result.label}</h5>
                      {getSeverityBadge(result.severity)}
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{result.description}</p>
                    <div className="flex items-center gap-2">
                      <div className="text-sm font-medium text-gray-700 w-10">{result.value}</div>
                      <Progress
                        value={result.value * 100}
                        className="h-2"
                        indicatorClassName={result.value > 0 ? getSeverityColor(result.severity) : "bg-gray-200"}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <>
              {error && (
                <Alert variant="destructive" className="mb-4 bg-red-50 border-red-200 text-red-800">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="security-key" className="text-sm font-medium text-gray-700">
                    Contract Bytecode
                  </label>
                  <Input
                    id="security-key"
                    type="text"
                    placeholder="Enter Ethereum contract bytecode"
                    value={securityKey}
                    onChange={(e) => setSecurityKey(e.target.value)}
                    className="bg-white border-gray-200 font-mono text-xs"
                  />
                </div>
                <p className="text-xs text-gray-500">
                  Enter the bytecode of an Ethereum smart contract to analyze it for potential security vulnerabilities.
                </p>
              </div>
            </>
          )}

          {isAnalyzing && (
            <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
              <div className="flex items-center gap-3 mb-3">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
                <p className="text-sm font-medium text-primary">Analyzing smart contract...</p>
              </div>
              <Progress value={undefined} className="h-1" />
            </div>
          )}
        </CardContent>

        {!analysisResults && (
          <>
            <CardFooter className="border-t border-gray-100 bg-gray-50">
              <Button
                onClick={handleSecurityCheck}
                disabled={isChecking || !securityKey.trim()}
                className="w-full bg-primary hover:bg-primary/90"
              >
                {isChecking ? "Analyzing..." : "Security Check"}
              </Button>
            </CardFooter>

            <div className="px-6 pb-6">
              <Separator className="my-4" />

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-medium text-gray-700">Developer Tools</h4>
                  <Badge variant="outline" className="bg-gray-100 text-gray-700">
                    Beta
                  </Badge>
                </div>

                <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <h5 className="text-sm font-medium text-gray-700 mb-2">Ethereum Contract Verification</h5>
                  <p className="text-xs text-gray-500 mb-3">
                    Generate an example of deployed Ethereum smart contract bytecode for testing purposes.
                  </p>
                  <Button
                    onClick={generateEthereumBytecode}
                    disabled={isGenerating}
                    variant="outline"
                    className="w-full border-gray-200 text-gray-700 hover:bg-gray-100 flex items-center justify-center gap-2"
                  >
                    <Code className="h-4 w-4" />
                    {isGenerating ? "Generating Bytecode..." : "Generate Ethereum Bytecode"}
                  </Button>
                </div>

                <p className="text-xs text-gray-400 italic">
                  Note: This is for demonstration purposes only. In a production environment, you would verify actual
                  contract bytecode.
                </p>
              </div>
            </div>
          </>
        )}
      </Card>
    </div>
  )
}
