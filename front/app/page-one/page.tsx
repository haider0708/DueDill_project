import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { InfoIcon } from "lucide-react"

export default function PageOne() {
  return (
    <div className="container py-8 max-w-5xl">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Page One</h1>

      <Alert className="mb-6 bg-blue-50 border-primary text-primary">
        <InfoIcon className="h-4 w-4" />
        <AlertTitle>Information</AlertTitle>
        <AlertDescription>This is an empty page that you can customize based on your requirements.</AlertDescription>
      </Alert>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-white border-gray-200 text-gray-800">
          <CardHeader>
            <CardTitle>Content Section 1</CardTitle>
            <CardDescription className="text-gray-500">Add your custom content here</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              This is a placeholder section. You can replace this with your own content, data visualizations, forms, or
              any other components you need.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white border-gray-200 text-gray-800">
          <CardHeader>
            <CardTitle>Content Section 2</CardTitle>
            <CardDescription className="text-gray-500">Add your custom content here</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              This is a placeholder section. You can replace this with your own content, data visualizations, forms, or
              any other components you need.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
