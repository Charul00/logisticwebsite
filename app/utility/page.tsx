"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calculator, Clock, RefreshCw } from "lucide-react"
import PageTransition from "@/components/page-transition"

export default function UtilityPage() {
  // Freight Calculator State
  const [weight, setWeight] = useState("")
  const [volume, setVolume] = useState("")
  const [distance, setDistance] = useState("")
  const [freightType, setFreightType] = useState("air")
  const [freightResult, setFreightResult] = useState<number | null>(null)

  // Transit Time Calculator State
  const [origin, setOrigin] = useState("")
  const [destination, setDestination] = useState("")
  const [transportMode, setTransportMode] = useState("air")
  const [transitResult, setTransitResult] = useState<string | null>(null)

  // Currency Converter State
  const [amount, setAmount] = useState("")
  const [fromCurrency, setFromCurrency] = useState("USD")
  const [toCurrency, setToCurrency] = useState("EUR")
  const [convertedAmount, setConvertedAmount] = useState<number | null>(null)

  // Dummy calculation functions
  const calculateFreight = () => {
    // This is a simplified dummy calculation
    const weightNum = Number.parseFloat(weight) || 0
    const volumeNum = Number.parseFloat(volume) || 0
    const distanceNum = Number.parseFloat(distance) || 0

    let rate = 0
    switch (freightType) {
      case "air":
        rate = 2.5
        break
      case "sea":
        rate = 1.2
        break
      case "road":
        rate = 0.8
        break
      default:
        rate = 1.0
    }

    const result = (weightNum * 0.5 + volumeNum * 0.3) * distanceNum * rate
    setFreightResult(Number.parseFloat(result.toFixed(2)))
  }

  const calculateTransitTime = () => {
    // This is a simplified dummy calculation
    if (!origin || !destination) return

    let baseTime = 0
    switch (transportMode) {
      case "air":
        baseTime = 2
        break
      case "sea":
        baseTime = 14
        break
      case "road":
        baseTime = 5
        break
      default:
        baseTime = 7
    }

    // Add some randomness based on origin/destination
    const originFactor = origin.length % 3
    const destFactor = destination.length % 4

    const totalDays = baseTime + originFactor + destFactor
    setTransitResult(`${totalDays} days`)
  }

  const convertCurrency = () => {
    // This is a simplified dummy calculation with fixed rates
    const amountNum = Number.parseFloat(amount) || 0

    const rates: Record<string, Record<string, number>> = {
      USD: { EUR: 0.85, GBP: 0.75, JPY: 110.5, CNY: 6.45 },
      EUR: { USD: 1.18, GBP: 0.88, JPY: 130.0, CNY: 7.6 },
      GBP: { USD: 1.33, EUR: 1.14, JPY: 148.0, CNY: 8.65 },
      JPY: { USD: 0.009, EUR: 0.0077, GBP: 0.0068, CNY: 0.058 },
      CNY: { USD: 0.155, EUR: 0.132, GBP: 0.116, JPY: 17.2 },
    }

    if (fromCurrency === toCurrency) {
      setConvertedAmount(amountNum)
      return
    }

    const rate = rates[fromCurrency]?.[toCurrency] || 1
    const result = amountNum * rate
    setConvertedAmount(Number.parseFloat(result.toFixed(2)))
  }

  return (
    <PageTransition>
      <div className="pt-16">
        {/* Hero Section */}
        <section className="relative py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl">
              <h1 className="text-4xl font-bold mb-6">Logistics Utilities</h1>
              <p className="text-xl text-muted-foreground mb-8">
                Use our collection of logistics calculators and tools to help plan and optimize your shipping
                operations.
              </p>
            </div>
          </div>
        </section>

        {/* Utilities Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <Tabs defaultValue="freight" className="max-w-4xl mx-auto">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="freight" className="flex items-center gap-2">
                  <Calculator className="h-4 w-4" />
                  <span>Freight Calculator</span>
                </TabsTrigger>
                <TabsTrigger value="transit" className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>Transit Time</span>
                </TabsTrigger>
                <TabsTrigger value="currency" className="flex items-center gap-2">
                  <RefreshCw className="h-4 w-4" />
                  <span>Currency Converter</span>
                </TabsTrigger>
              </TabsList>

              {/* Freight Calculator */}
              <TabsContent value="freight">
                <Card>
                  <CardHeader>
                    <CardTitle>Freight Cost Calculator</CardTitle>
                    <CardDescription>
                      Calculate estimated freight costs based on weight, volume, and distance.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="weight">Weight (kg)</Label>
                          <Input
                            id="weight"
                            type="number"
                            placeholder="Enter weight"
                            value={weight}
                            onChange={(e) => setWeight(e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="volume">Volume (m³)</Label>
                          <Input
                            id="volume"
                            type="number"
                            placeholder="Enter volume"
                            value={volume}
                            onChange={(e) => setVolume(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="distance">Distance (km)</Label>
                          <Input
                            id="distance"
                            type="number"
                            placeholder="Enter distance"
                            value={distance}
                            onChange={(e) => setDistance(e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="freightType">Freight Type</Label>
                          <Select value={freightType} onValueChange={setFreightType}>
                            <SelectTrigger id="freightType">
                              <SelectValue placeholder="Select freight type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="air">Air Freight</SelectItem>
                              <SelectItem value="sea">Sea Freight</SelectItem>
                              <SelectItem value="road">Road Transport</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <Button onClick={calculateFreight}>Calculate Freight Cost</Button>

                      {freightResult !== null && (
                        <div className="mt-4 p-4 bg-muted rounded-md">
                          <p className="font-medium">Estimated Freight Cost:</p>
                          <p className="text-2xl font-bold text-primary">${freightResult}</p>
                          <p className="text-sm text-muted-foreground mt-2">
                            This is an estimated cost based on the provided information. Actual costs may vary.
                          </p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Transit Time Calculator */}
              <TabsContent value="transit">
                <Card>
                  <CardHeader>
                    <CardTitle>Transit Time Calculator</CardTitle>
                    <CardDescription>
                      Estimate transit times between locations based on transportation mode.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="origin">Origin</Label>
                          <Input
                            id="origin"
                            placeholder="Enter origin city/country"
                            value={origin}
                            onChange={(e) => setOrigin(e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="destination">Destination</Label>
                          <Input
                            id="destination"
                            placeholder="Enter destination city/country"
                            value={destination}
                            onChange={(e) => setDestination(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="transportMode">Transport Mode</Label>
                        <Select value={transportMode} onValueChange={setTransportMode}>
                          <SelectTrigger id="transportMode">
                            <SelectValue placeholder="Select transport mode" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="air">Air Freight</SelectItem>
                            <SelectItem value="sea">Sea Freight</SelectItem>
                            <SelectItem value="road">Road Transport</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <Button onClick={calculateTransitTime}>Calculate Transit Time</Button>

                      {transitResult && (
                        <div className="mt-4 p-4 bg-muted rounded-md">
                          <p className="font-medium">Estimated Transit Time:</p>
                          <p className="text-2xl font-bold text-primary">{transitResult}</p>
                          <p className="text-sm text-muted-foreground mt-2">
                            This is an estimated transit time. Actual times may vary based on customs clearance, weather
                            conditions, and other factors.
                          </p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Currency Converter */}
              <TabsContent value="currency">
                <Card>
                  <CardHeader>
                    <CardTitle>Currency Converter</CardTitle>
                    <CardDescription>
                      Convert between different currencies for international shipping cost calculations.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-6">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="amount">Amount</Label>
                          <Input
                            id="amount"
                            type="number"
                            placeholder="Enter amount"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="fromCurrency">From Currency</Label>
                          <Select value={fromCurrency} onValueChange={setFromCurrency}>
                            <SelectTrigger id="fromCurrency">
                              <SelectValue placeholder="Select currency" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="USD">USD - US Dollar</SelectItem>
                              <SelectItem value="EUR">EUR - Euro</SelectItem>
                              <SelectItem value="GBP">GBP - British Pound</SelectItem>
                              <SelectItem value="JPY">JPY - Japanese Yen</SelectItem>
                              <SelectItem value="CNY">CNY - Chinese Yuan</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="toCurrency">To Currency</Label>
                          <Select value={toCurrency} onValueChange={setToCurrency}>
                            <SelectTrigger id="toCurrency">
                              <SelectValue placeholder="Select currency" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="USD">USD - US Dollar</SelectItem>
                              <SelectItem value="EUR">EUR - Euro</SelectItem>
                              <SelectItem value="GBP">GBP - British Pound</SelectItem>
                              <SelectItem value="JPY">JPY - Japanese Yen</SelectItem>
                              <SelectItem value="CNY">CNY - Chinese Yuan</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <Button onClick={convertCurrency}>Convert Currency</Button>

                      {convertedAmount !== null && (
                        <div className="mt-4 p-4 bg-muted rounded-md">
                          <p className="font-medium">Converted Amount:</p>
                          <p className="text-2xl font-bold text-primary">
                            {amount} {fromCurrency} = {convertedAmount} {toCurrency}
                          </p>
                          <p className="text-sm text-muted-foreground mt-2">
                            Exchange rates are for estimation purposes only and may vary from actual market rates.
                          </p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* Additional Tools */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-10 text-center">Additional Tools</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="transition-all duration-300 hover:shadow-md hover:border-primary/50">
                <CardHeader>
                  <CardTitle>Shipping Documents</CardTitle>
                  <CardDescription>Generate and download common shipping documents.</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Access templates for bills of lading, commercial invoices, packing lists, and more.
                  </p>
                  <Button variant="outline" className="w-full">
                    Coming Soon
                  </Button>
                </CardContent>
              </Card>

              <Card className="transition-all duration-300 hover:shadow-md hover:border-primary/50">
                <CardHeader>
                  <CardTitle>Customs Duty Calculator</CardTitle>
                  <CardDescription>Estimate customs duties and taxes for international shipments.</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Calculate potential duties based on product category, value, and destination country.
                  </p>
                  <Button variant="outline" className="w-full">
                    Coming Soon
                  </Button>
                </CardContent>
              </Card>

              <Card className="transition-all duration-300 hover:shadow-md hover:border-primary/50">
                <CardHeader>
                  <CardTitle>Route Planner</CardTitle>
                  <CardDescription>Plan optimal routes for road transportation.</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Optimize delivery routes to minimize distance, time, and fuel consumption.
                  </p>
                  <Button variant="outline" className="w-full">
                    Coming Soon
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </div>
    </PageTransition>
  )
}
