import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Image from "next/image"

export default function AboutPage() {
  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">About Crypto Watch</h1>
        <p className="text-muted-foreground">Your trusted source for cryptocurrency due diligence</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <Card>
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 p-2 bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-primary h-8 w-8"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="m16 10-4 4-4-4" />
              </svg>
            </div>
            <CardTitle>Real-Time Data</CardTitle>
            <CardDescription>Access up-to-the-minute cryptocurrency prices and market data</CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <p>
              Our platform connects to multiple exchanges and data providers to ensure you always have the most accurate
              and current information for your investment decisions.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 p-2 bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-primary h-8 w-8"
              >
                <path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z" />
                <path d="M13 5v2" />
                <path d="M13 17v2" />
                <path d="M13 11v2" />
              </svg>
            </div>
            <CardTitle>Advanced Analysis</CardTitle>
            <CardDescription>Powerful tools for comprehensive cryptocurrency research</CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <p>
              From technical indicators to fundamental analysis, our platform provides the tools you need to conduct
              thorough due diligence on any cryptocurrency project.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 p-2 bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-primary h-8 w-8"
              >
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                <path d="m9 12 2 2 4-4" />
              </svg>
            </div>
            <CardTitle>Security First</CardTitle>
            <CardDescription>Your data and privacy are our top priority</CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <p>
              We implement industry-leading security practices to ensure your information remains safe and your
              cryptocurrency research stays private.
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="mission" className="mb-12">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="mission">Our Mission</TabsTrigger>
          <TabsTrigger value="team">Our Team</TabsTrigger>
          <TabsTrigger value="technology">Our Technology</TabsTrigger>
        </TabsList>
        <TabsContent value="mission" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Our Mission</CardTitle>
              <CardDescription>Empowering investors with reliable cryptocurrency intelligence</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                At Crypto Watch, our mission is to provide investors with transparent, accurate, and comprehensive
                information about the cryptocurrency market. We believe that informed decisions lead to better
                investment outcomes.
              </p>
              <p>
                Founded in 2023, Crypto Watch was created to address the growing need for reliable due diligence tools
                in the rapidly evolving cryptocurrency space. Our platform combines real-time data, advanced analytics,
                and user-friendly interfaces to help both novice and experienced investors navigate the complex world of
                digital assets.
              </p>
              <p>
                We are committed to maintaining the highest standards of data integrity and providing unbiased
                information, allowing our users to conduct thorough research and make confident investment decisions.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="team" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Our Team</CardTitle>
              <CardDescription>Meet the experts behind Crypto Watch</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              
                  <h3 className="font-medium">Fiducia</h3>
                  <p >
                    Our data science team collaborated on a comprehensive due diligence project aimed at evaluating the legitimacy, performance, 
                    and risk profile of cryptocurrency projects for an investment advisory firm. The team was tasked with collecting, analyzing, 
                    and interpreting vast and diverse datasets from blockchain networks, social platforms, and project documentation to assist in 
                    informed investment decisions.
                  </p>
                

            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="technology" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Our Technology</CardTitle>
              <CardDescription>The infrastructure powering Crypto Watch</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                Crypto Watch is built on a robust, scalable architecture designed to handle millions of data points in
                real-time. Our technology stack includes:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <span className="font-medium">Data Aggregation Engine:</span> Connects to multiple exchanges and data
                  providers to collect and normalize cryptocurrency market data.
                </li>
                <li>
                  <span className="font-medium">Real-time Processing:</span> Utilizes stream processing to ensure
                  up-to-the-second price updates and market movements.
                </li>
                <li>
                  <span className="font-medium">Advanced Analytics:</span> Implements sophisticated algorithms for
                  technical analysis, pattern recognition, and anomaly detection.
                </li>
                <li>
                  <span className="font-medium">Secure Infrastructure:</span> Employs industry-leading security
                  practices to protect user data and ensure platform reliability.
                </li>
                <li>
                  <span className="font-medium">Responsive Design:</span> Provides a seamless experience across desktop,
                  tablet, and mobile devices.
                </li>
              </ul>
              <p>
                We continuously invest in our technology infrastructure to improve performance, add new features, and
                enhance the user experience.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Contact Us</CardTitle>
          <CardDescription>Have questions or feedback? We'd love to hear from you.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-medium mb-2">General Inquiries</h3>
              <p className="text-muted-foreground mb-4">For general questions and information</p>
              <p>Email: info@fiducia.com</p>
              <p>Phone: +216 58654731</p>
            </div>
            <div>
              <h3 className="font-medium mb-2">Support</h3>
              <p className="text-muted-foreground mb-4">For technical assistance and account help</p>
              <p>Email: support@fiducia.com</p>
              <p>Hours: Monday-Friday, 9am-5pm EST</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
