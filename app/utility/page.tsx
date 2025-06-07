"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Clock, RefreshCw, ArrowUpDown, TrendingUp, Ship, Plane, Truck, Train, Search, MapPin } from "lucide-react"
import PageTransition from "@/components/page-transition"

export default function UtilityPage() {
  // Transit Time Calculator State
  const [departureCountry, setDepartureCountry] = useState("")
  const [departurePort, setDeparturePort] = useState("")
  const [arrivalCountry, setArrivalCountry] = useState("")
  const [arrivalPort, setArrivalPort] = useState("")
  const [transportMode, setTransportMode] = useState("sea")
  const [transitResult, setTransitResult] = useState<string | null>(null)
  const [ports, setPorts] = useState<Array<{name: string, country: string, code: string, lat: number, lng: number}>>([])
  const [countries, setCountries] = useState<Array<string>>([])
  const [departureCountryPorts, setDepartureCountryPorts] = useState<Array<{name: string, country: string, code: string, lat: number, lng: number}>>([])
  const [arrivalCountryPorts, setArrivalCountryPorts] = useState<Array<{name: string, country: string, code: string, lat: number, lng: number}>>([])
  const [isTransitLoading, setIsTransitLoading] = useState(false)
  const [transitError, setTransitError] = useState<string | null>(null)
  const [selectedDeparturePort, setSelectedDeparturePort] = useState<{name: string, country: string, code: string, lat: number, lng: number} | null>(null)
  const [selectedArrivalPort, setSelectedArrivalPort] = useState<{name: string, country: string, code: string, lat: number, lng: number} | null>(null)
  const [vesselSpeed, setVesselSpeed] = useState("15")
  const [distance, setDistance] = useState<number | null>(null)

  // Currency Converter State
  const [amount, setAmount] = useState("1")
  const [fromCurrency, setFromCurrency] = useState("USD")
  const [toCurrency, setToCurrency] = useState("EUR")
  const [convertedAmount, setConvertedAmount] = useState<number | null>(null)
  const [exchangeRate, setExchangeRate] = useState<number | null>(null)
  const [lastUpdated, setLastUpdated] = useState<string>("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Load ports data on component mount
  useEffect(() => {
    const loadPorts = async () => {
      try {
        // Using a comprehensive list of major world ports
        const majorPorts = [
          // Asia-Pacific Major Ports
          { name: "Shanghai", country: "China", code: "CNSHA", lat: 31.2304, lng: 121.4737 },
          { name: "Singapore", country: "Singapore", code: "SGSIN", lat: 1.2966, lng: 103.7764 },
          { name: "Ningbo-Zhoushan", country: "China", code: "CNNGB", lat: 29.8683, lng: 121.544 },
          { name: "Shenzhen", country: "China", code: "CNSZX", lat: 22.5431, lng: 114.0579 },
          { name: "Guangzhou", country: "China", code: "CNGZH", lat: 23.1291, lng: 113.2644 },
          { name: "Busan", country: "South Korea", code: "KRPUS", lat: 35.1796, lng: 129.0756 },
          { name: "Hong Kong", country: "Hong Kong", code: "HKHKG", lat: 22.3193, lng: 114.1694 },
          { name: "Qingdao", country: "China", code: "CNTAO", lat: 36.0986, lng: 120.3719 },
          { name: "Tianjin", country: "China", code: "CNTSN", lat: 39.1422, lng: 117.1767 },
          { name: "Port Klang", country: "Malaysia", code: "MYPKG", lat: 3.0044, lng: 101.3901 },
          { name: "Kaohsiung", country: "Taiwan", code: "TWKHH", lat: 22.6273, lng: 120.3014 },
          { name: "Dalian", country: "China", code: "CNDLC", lat: 38.9140, lng: 121.6147 },
          { name: "Xiamen", country: "China", code: "CNXMN", lat: 24.4798, lng: 118.0819 },
          { name: "Tanjung Pelepas", country: "Malaysia", code: "MYTPP", lat: 1.3667, lng: 103.55 },
          { name: "Laem Chabang", country: "Thailand", code: "THLCH", lat: 13.0827, lng: 100.8833 },
          { name: "Jakarta", country: "Indonesia", code: "IDJKT", lat: -6.1045, lng: 106.8066 },
          { name: "Mumbai", country: "India", code: "INBOM", lat: 19.0760, lng: 72.8777 },
          { name: "Chennai", country: "India", code: "INMAA", lat: 13.0827, lng: 80.2707 },
          { name: "Jawaharlal Nehru Port", country: "India", code: "INNSA", lat: 18.9647, lng: 72.8258 },
          { name: "Colombo", country: "Sri Lanka", code: "LKCMB", lat: 6.9271, lng: 79.8612 },
          { name: "Chittagong", country: "Bangladesh", code: "BDCGP", lat: 22.3569, lng: 91.7832 },
          { name: "Karachi", country: "Pakistan", code: "PKKHI", lat: 24.8607, lng: 67.0011 },
          { name: "Tokyo", country: "Japan", code: "JPNRT", lat: 35.6762, lng: 139.6503 },
          { name: "Yokohama", country: "Japan", code: "JPYOK", lat: 35.4437, lng: 139.6380 },
          { name: "Kobe", country: "Japan", code: "JPUKB", lat: 34.6901, lng: 135.1956 },
          { name: "Nagoya", country: "Japan", code: "JPNGO", lat: 35.1815, lng: 136.9066 },
          
          // Europe Major Ports
          { name: "Rotterdam", country: "Netherlands", code: "NLRTM", lat: 51.9244, lng: 4.4777 },
          { name: "Antwerp", country: "Belgium", code: "BEANR", lat: 51.2194, lng: 4.4025 },
          { name: "Hamburg", country: "Germany", code: "DEHAM", lat: 53.5511, lng: 9.9937 },
          { name: "Valencia", country: "Spain", code: "ESVLC", lat: 39.4699, lng: -0.3763 },
          { name: "Algeciras", country: "Spain", code: "ESALG", lat: 36.1408, lng: -5.4526 },
          { name: "Bremerhaven", country: "Germany", code: "DEBRV", lat: 53.5396, lng: 8.5810 },
          { name: "Piraeus", country: "Greece", code: "GRPIR", lat: 37.9755, lng: 23.7348 },
          { name: "Barcelona", country: "Spain", code: "ESBCN", lat: 41.3851, lng: 2.1734 },
          { name: "Felixstowe", country: "United Kingdom", code: "GBFXT", lat: 51.9539, lng: 1.3518 },
          { name: "Gioia Tauro", country: "Italy", code: "ITGIT", lat: 38.4240, lng: 15.8986 },
          { name: "Le Havre", country: "France", code: "FRLEH", lat: 49.4944, lng: 0.1079 },
          { name: "Marseille", country: "France", code: "FRMRS", lat: 43.2965, lng: 5.3698 },
          { name: "Genoa", country: "Italy", code: "ITGOA", lat: 44.4056, lng: 8.9463 },
          { name: "La Spezia", country: "Italy", code: "ITLSP", lat: 44.1073, lng: 9.8423 },
          { name: "Trieste", country: "Italy", code: "ITTRS", lat: 45.6495, lng: 13.7768 },
          { name: "Constanta", country: "Romania", code: "ROCND", lat: 44.1598, lng: 28.6348 },
          { name: "Gdansk", country: "Poland", code: "PLGDN", lat: 54.3520, lng: 18.6466 },
          { name: "Gothenburg", country: "Sweden", code: "SEGOT", lat: 57.7089, lng: 11.9746 },
          { name: "Copenhagen", country: "Denmark", code: "DKCPH", lat: 55.6761, lng: 12.5683 },
          { name: "St. Petersburg", country: "Russia", code: "RULED", lat: 59.9311, lng: 30.3609 },
          
          // North America Major Ports
          { name: "Los Angeles", country: "United States", code: "USLAX", lat: 33.7361, lng: -118.2917 },
          { name: "Long Beach", country: "United States", code: "USLGB", lat: 33.7701, lng: -118.2437 },
          { name: "New York", country: "United States", code: "USNYC", lat: 40.6636, lng: -74.0842 },
          { name: "Savannah", country: "United States", code: "USSAV", lat: 32.0835, lng: -81.0998 },
          { name: "Seattle", country: "United States", code: "USSEA", lat: 47.6062, lng: -122.3321 },
          { name: "Tacoma", country: "United States", code: "USTAC", lat: 47.2529, lng: -122.4443 },
          { name: "Oakland", country: "United States", code: "USOAK", lat: 37.8044, lng: -122.2712 },
          { name: "Charleston", country: "United States", code: "USCHS", lat: 32.7767, lng: -79.9311 },
          { name: "Norfolk", country: "United States", code: "USORF", lat: 36.8468, lng: -76.2951 },
          { name: "Miami", country: "United States", code: "USMIA", lat: 25.7617, lng: -80.1918 },
          { name: "Houston", country: "United States", code: "USHOU", lat: 29.7604, lng: -95.3698 },
          { name: "Vancouver", country: "Canada", code: "CAVAN", lat: 49.2827, lng: -123.1207 },
          { name: "Montreal", country: "Canada", code: "CAMTR", lat: 45.5017, lng: -73.5673 },
          { name: "Prince Rupert", country: "Canada", code: "CAPRR", lat: 54.3150, lng: -130.3201 },
          { name: "Veracruz", country: "Mexico", code: "MXVER", lat: 19.2006, lng: -96.1428 },
          { name: "Manzanillo", country: "Mexico", code: "MXZLO", lat: 19.0547, lng: -104.3190 },
          { name: "Lazaro Cardenas", country: "Mexico", code: "MXLZC", lat: 17.9583, lng: -102.2000 },
          
          // Middle East & Africa Major Ports
          { name: "Jebel Ali", country: "UAE", code: "AEJEA", lat: 25.0118, lng: 55.1045 },
          { name: "Port Said", country: "Egypt", code: "EGPSD", lat: 31.2565, lng: 32.3020 },
          { name: "Suez", country: "Egypt", code: "EGSUZ", lat: 29.9668, lng: 32.5498 },
          { name: "Alexandria", country: "Egypt", code: "EGALY", lat: 31.2001, lng: 29.9187 },
          { name: "Dammam", country: "Saudi Arabia", code: "SADMM", lat: 26.4207, lng: 50.0888 },
          { name: "Jeddah", country: "Saudi Arabia", code: "SAJED", lat: 21.4858, lng: 39.1925 },
          { name: "Sohar", country: "Oman", code: "OMSOH", lat: 24.3477, lng: 56.7085 },
          { name: "Salalah", country: "Oman", code: "OMSLL", lat: 17.0151, lng: 54.0924 },
          { name: "Bandar Abbas", country: "Iran", code: "IRBND", lat: 27.1865, lng: 56.2808 },
          { name: "Kuwait", country: "Kuwait", code: "KWKWI", lat: 29.3375, lng: 47.6581 },
          { name: "Durban", country: "South Africa", code: "ZADUR", lat: -29.8587, lng: 31.0218 },
          { name: "Cape Town", country: "South Africa", code: "ZACPT", lat: -33.9249, lng: 18.4241 },
          { name: "Lagos", country: "Nigeria", code: "NGLOS", lat: 6.4474, lng: 3.3903 },
          { name: "Casablanca", country: "Morocco", code: "MACAS", lat: 33.5731, lng: -7.5898 },
          { name: "Tangier", country: "Morocco", code: "MATAN", lat: 35.7595, lng: -5.8340 },
          { name: "Djibouti", country: "Djibouti", code: "DJJIB", lat: 11.8251, lng: 42.5903 },
          
          // South America Major Ports
          { name: "Santos", country: "Brazil", code: "BRSSZ", lat: -23.9618, lng: -46.3322 },
          { name: "Buenos Aires", country: "Argentina", code: "ARBUE", lat: -34.6118, lng: -58.3960 },
          { name: "Callao", country: "Peru", code: "PECLL", lat: -12.0464, lng: -77.1428 },
          { name: "Valparaiso", country: "Chile", code: "CLVAP", lat: -33.0472, lng: -71.6127 },
          { name: "San Antonio", country: "Chile", code: "CLSAI", lat: -33.5928, lng: -71.6127 },
          { name: "Cartagena", country: "Colombia", code: "COCTG", lat: 10.3910, lng: -75.4794 },
          { name: "Rio de Janeiro", country: "Brazil", code: "BRRIO", lat: -22.9068, lng: -43.1729 },
          { name: "Paranagua", country: "Brazil", code: "BRPNG", lat: -25.5202, lng: -48.5084 },
          { name: "Montevideo", country: "Uruguay", code: "UYMVD", lat: -34.8375, lng: -56.2123 },
          { name: "Guayaquil", country: "Ecuador", code: "ECGYE", lat: -2.1709, lng: -79.9224 },
          
          // Australia & Oceania Major Ports
          { name: "Melbourne", country: "Australia", code: "AUMEL", lat: -37.8136, lng: 144.9631 },
          { name: "Sydney", country: "Australia", code: "AUSYD", lat: -33.8688, lng: 151.2093 },
          { name: "Brisbane", country: "Australia", code: "AUBNE", lat: -27.4705, lng: 153.0260 },
          { name: "Fremantle", country: "Australia", code: "AUFRE", lat: -32.0569, lng: 115.7439 },
          { name: "Adelaide", country: "Australia", code: "AUADL", lat: -34.9285, lng: 138.6007 },
          { name: "Auckland", country: "New Zealand", code: "NZAKL", lat: -36.8485, lng: 174.7633 },
          { name: "Tauranga", country: "New Zealand", code: "NZTRG", lat: -37.6878, lng: 176.1651 }
        ]
        
        setPorts(majorPorts)
        
        // Extract unique countries
        const uniqueCountries = [...new Set(majorPorts.map(port => port.country))].sort()
        setCountries(uniqueCountries)
      } catch (error) {
        console.error('Error loading ports:', error)
      }
    }
    
    loadPorts()
  }, [])

  // Filter ports by country for departure
  useEffect(() => {
    if (departureCountry) {
      const countryPorts = ports.filter(port => port.country === departureCountry)
      setDepartureCountryPorts(countryPorts)
      setDeparturePort("") // Reset port selection when country changes
      setSelectedDeparturePort(null)
    } else {
      setDepartureCountryPorts([])
    }
  }, [departureCountry, ports])

  // Filter ports by country for arrival
  useEffect(() => {
    if (arrivalCountry) {
      const countryPorts = ports.filter(port => port.country === arrivalCountry)
      setArrivalCountryPorts(countryPorts)
      setArrivalPort("") // Reset port selection when country changes
      setSelectedArrivalPort(null)
    } else {
      setArrivalCountryPorts([])
    }
  }, [arrivalCountry, ports])

  // Set selected ports when port names are chosen
  useEffect(() => {
    if (departurePort && departureCountryPorts.length > 0) {
      const selectedPort = departureCountryPorts.find(port => port.name === departurePort)
      setSelectedDeparturePort(selectedPort || null)
    }
  }, [departurePort, departureCountryPorts])

  useEffect(() => {
    if (arrivalPort && arrivalCountryPorts.length > 0) {
      const selectedPort = arrivalCountryPorts.find(port => port.name === arrivalPort)
      setSelectedArrivalPort(selectedPort || null)
    }
  }, [arrivalPort, arrivalCountryPorts])

  // Calculate distance between two points using Haversine formula
  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
    const R = 6371; // Earth's radius in kilometers
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const d = R * c; // Distance in kilometers
    return d * 0.539957; // Convert to nautical miles
  }

  // Real-time transit time calculation using external APIs
  const calculateTransitTime = async () => {
    if (!selectedDeparturePort || !selectedArrivalPort) {
      setTransitError("Please select both departure and arrival ports")
      return
    }

    setIsTransitLoading(true)
    setTransitError(null)

    try {
      let distanceNM = 0;
      let apiUsed = "";

      // Try multiple free APIs for real-time distance calculation
      try {
        // API 1: Sea-Distances.org (Free API with CORS proxy)
        const response1 = await fetch(
          `https://api.allorigins.win/get?url=${encodeURIComponent(
            `http://www.sea-distances.org/api?departure=${selectedDeparturePort.name}&arrival=${selectedArrivalPort.name}`
          )}`,
          { 
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            }
          }
        );
        
        if (response1.ok) {
          const data1 = await response1.json();
          const parsedData = JSON.parse(data1.contents);
          if (parsedData.distance) {
            distanceNM = parseFloat(parsedData.distance);
            apiUsed = "Sea-Distances.org API";
          }
        }
      } catch (e) {
        console.log("Sea-Distances API failed, trying next...");
      }

      // Fallback API 2: Distance calculation via coordinates using OpenRouteService
      if (distanceNM === 0) {
        try {
          const response2 = await fetch(
            `https://api.openrouteservice.org/v2/directions/driving-car?api_key=5b3ce3597851110001cf6248c0c53e67352c4b8db3724a7d8c4c7c27&start=${selectedDeparturePort.lng},${selectedDeparturePort.lat}&end=${selectedArrivalPort.lng},${selectedArrivalPort.lat}`,
            {
              headers: {
                'Accept': 'application/json, application/geo+json, application/gpx+xml, img/png; charset=utf-8',
              }
            }
          );
          
          if (response2.ok) {
            const data2 = await response2.json();
            if (data2.routes && data2.routes[0]?.summary?.distance) {
              // Convert meters to nautical miles
              distanceNM = (data2.routes[0].summary.distance / 1000) * 0.539957;
              apiUsed = "OpenRouteService API";
            }
          }
        } catch (e) {
          console.log("OpenRouteService API failed, trying next...");
        }
      }

      // Fallback API 3: MapBox Distance API (free tier)
      if (distanceNM === 0) {
        try {
          const response3 = await fetch(
            `https://api.mapbox.com/directions/v5/mapbox/driving/${selectedDeparturePort.lng},${selectedDeparturePort.lat};${selectedArrivalPort.lng},${selectedArrivalPort.lat}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ3kKGdH_w&overview=false&geometries=geojson`,
            {
              headers: {
                'Content-Type': 'application/json',
              }
            }
          );
          
          if (response3.ok) {
            const data3 = await response3.json();
            if (data3.routes && data3.routes[0]?.distance) {
              // Convert meters to nautical miles
              distanceNM = (data3.routes[0].distance / 1000) * 0.539957;
              apiUsed = "MapBox Directions API";
            }
          }
        } catch (e) {
          console.log("MapBox API failed, using fallback calculation...");
        }
      }

      // Final fallback: Use Haversine formula if all APIs fail
      if (distanceNM === 0) {
        distanceNM = calculateDistance(
          selectedDeparturePort.lat, 
          selectedDeparturePort.lng, 
          selectedArrivalPort.lat, 
          selectedArrivalPort.lng
        );
        apiUsed = "Haversine Formula (Local Calculation)";
      }
      
      setDistance(Math.round(distanceNM));

      let transitTime = "";
      let additionalInfo = "";

      switch (transportMode) {
        case "sea":
          const speed = parseFloat(vesselSpeed) || 15;
          const timeHours = distanceNM / speed;
          const timeDays = Math.ceil(timeHours / 24);
          transitTime = `${timeDays} days`;
          additionalInfo = `Distance: ${Math.round(distanceNM)} nautical miles | Speed: ${speed} knots | Sailing time: ${Math.round(timeHours)} hours | Data source: ${apiUsed}`;
          break
          
        case "air":
          // Air freight typically takes 1-3 days including handling
          const airDistance = distanceNM * 1.15078; // Convert to statute miles
          const flightHours = airDistance / 500; // Average cargo plane speed ~500 mph
          const airDays = Math.ceil(flightHours / 24) + 1; // Add 1 day for handling
          transitTime = `${Math.max(1, Math.min(airDays, 3))} days`;
          additionalInfo = `Distance: ${Math.round(airDistance)} miles | Flight time: ${Math.round(flightHours)} hours | Includes handling time | Data source: ${apiUsed}`;
          break
          
        case "road":
          // Road transport estimation (if applicable for connected landmasses)
          const roadDistance = distanceNM * 1.15078 * 1.3; // Convert and add road factor
          const roadDays = Math.ceil(roadDistance / (500 * 24)); // ~500 miles per day average
          transitTime = `${Math.max(1, roadDays)} days`;
          additionalInfo = `Estimated road distance: ${Math.round(roadDistance)} miles | Average speed: 500 miles/day | Data source: ${apiUsed}`;
          break
          
        case "rail":
          // Rail transport estimation
          const railDistance = distanceNM * 1.15078 * 1.2; // Convert and add rail factor
          const railDays = Math.ceil(railDistance / (400 * 24)); // ~400 miles per day average
          transitTime = `${Math.max(1, railDays)} days`;
          additionalInfo = `Estimated rail distance: ${Math.round(railDistance)} miles | Average speed: 400 miles/day | Data source: ${apiUsed}`;
          break
          
        default:
          transitTime = "Unable to calculate";
      }

      setTransitResult(transitTime);
      
      // Add the additional info to the result
      if (additionalInfo) {
        setTransitResult(`${transitTime}|||${additionalInfo}`);
      }
      
    } catch (error) {
      setTransitError("Error calculating transit time using real-time APIs. Please try again.");
      console.error('Transit calculation error:', error);
    } finally {
      setIsTransitLoading(false);
    }
  }

  const convertCurrency = async () => {
    if (!amount || isNaN(Number(amount))) {
      setError("Please enter a valid amount")
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      // Using a reliable exchange rate API with fallback
      let response;
      let data;
      
      try {
        // Primary API: Currency API
        response = await fetch(`https://api.currencyapi.com/v3/latest?apikey=cur_live_HfBXDls15G6NGGDLhWX7QPTOqzfZNCFaFY18YHgX&base_currency=${fromCurrency}`)
        if (!response.ok) throw new Error('Primary API failed')
        data = await response.json()
        // Transform data structure for consistency
        data.rates = data.data ? Object.fromEntries(
          Object.entries(data.data).map(([key, value]: [string, any]) => [key, value.value])
        ) : {}
      } catch {
        // Fallback API: ExchangeRate-API
        try {
          response = await fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`)
          if (!response.ok) throw new Error('Fallback API failed')
          data = await response.json()
        } catch {
          // Second fallback: Fixer.io free tier
          response = await fetch(`https://api.fixer.io/latest?base=${fromCurrency}&access_key=87f704c5117add1ee2ad4b46c055ff61`)
          if (!response.ok) throw new Error('All APIs failed')
          data = await response.json()
        }
      }
      
      const rate = data.rates[toCurrency]
      
      if (!rate) {
        throw new Error(`Exchange rate not found for ${fromCurrency} to ${toCurrency}`)
      }

      const amountNum = Number.parseFloat(amount) || 0
      const result = amountNum * rate

      setConvertedAmount(Number.parseFloat(result.toFixed(4)))
      setExchangeRate(rate)
      setLastUpdated(new Date().toLocaleString())
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while fetching exchange rates')
      console.error('Currency conversion error:', err)
    } finally {
      setIsLoading(false)
    }
  }

  const swapCurrencies = () => {
    setFromCurrency(toCurrency)
    setToCurrency(fromCurrency)
    // Reset conversion results when swapping
    setConvertedAmount(null)
    setExchangeRate(null)
    setLastUpdated("")
    setError(null)
    if (convertedAmount && exchangeRate) {
      setAmount(convertedAmount.toString())
    }
  }

  // Reset conversion results when currencies change
  useEffect(() => {
    setConvertedAmount(null)
    setExchangeRate(null)
    setLastUpdated("")
    setError(null)
  }, [fromCurrency, toCurrency])

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
            <Tabs defaultValue="transit" className="max-w-4xl mx-auto">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="transit" className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>Transit Time</span>
                </TabsTrigger>
                <TabsTrigger value="currency" className="flex items-center gap-2">
                  <RefreshCw className="h-4 w-4" />
                  <span>Currency Converter</span>
                </TabsTrigger>
              </TabsList>

              {/* Transit Time Calculator */}
              <TabsContent value="transit">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Ship className="h-5 w-5" />
                      Real-Time Transit Calculator
                    </CardTitle>
                    <CardDescription>
                      Calculate real-time transit times between major ports worldwide using live external APIs for accurate distance measurements and vessel speeds.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {/* Port Selection */}
                      <div className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20 rounded-lg p-6 border">
                        <div className="grid gap-6">
                          {/* Departure Country & Port */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="departureCountry" className="text-sm font-medium flex items-center gap-2">
                                <MapPin className="h-4 w-4" />
                                Departure Country
                              </Label>
                              <Select value={departureCountry} onValueChange={setDepartureCountry}>
                                <SelectTrigger id="departureCountry" className="h-12">
                                  <SelectValue placeholder="Select departure country" />
                                </SelectTrigger>
                                <SelectContent>
                                  {countries.map((country) => (
                                    <SelectItem key={country} value={country}>
                                      {country}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="departurePort" className="text-sm font-medium flex items-center gap-2">
                                <Ship className="h-4 w-4" />
                                Departure Port
                              </Label>
                              <Select 
                                value={departurePort} 
                                onValueChange={setDeparturePort}
                                disabled={!departureCountry}
                              >
                                <SelectTrigger id="departurePort" className="h-12">
                                  <SelectValue placeholder={departureCountry ? "Select departure port" : "Select country first"} />
                                </SelectTrigger>
                                <SelectContent>
                                  {departureCountryPorts.map((port) => (
                                    <SelectItem key={port.code} value={port.name}>
                                      <div className="flex flex-col">
                                        <span className="font-medium">{port.name}</span>
                                        <span className="text-xs text-muted-foreground">{port.code}</span>
                                      </div>
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                          </div>

                          {/* Selected Departure Port Display */}
                          {selectedDeparturePort && (
                            <div className="text-xs text-green-600 dark:text-green-400 flex items-center gap-1">
                              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                              Departure: {selectedDeparturePort.name}, {selectedDeparturePort.country} ({selectedDeparturePort.code})
                            </div>
                          )}

                          {/* Arrival Country & Port */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="arrivalCountry" className="text-sm font-medium flex items-center gap-2">
                                <MapPin className="h-4 w-4" />
                                Arrival Country
                              </Label>
                              <Select value={arrivalCountry} onValueChange={setArrivalCountry}>
                                <SelectTrigger id="arrivalCountry" className="h-12">
                                  <SelectValue placeholder="Select arrival country" />
                                </SelectTrigger>
                                <SelectContent>
                                  {countries.map((country) => (
                                    <SelectItem key={country} value={country}>
                                      {country}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="arrivalPort" className="text-sm font-medium flex items-center gap-2">
                                <Ship className="h-4 w-4" />
                                Arrival Port
                              </Label>
                              <Select 
                                value={arrivalPort} 
                                onValueChange={setArrivalPort}
                                disabled={!arrivalCountry}
                              >
                                <SelectTrigger id="arrivalPort" className="h-12">
                                  <SelectValue placeholder={arrivalCountry ? "Select arrival port" : "Select country first"} />
                                </SelectTrigger>
                                <SelectContent>
                                  {arrivalCountryPorts.map((port) => (
                                    <SelectItem key={port.code} value={port.name}>
                                      <div className="flex flex-col">
                                        <span className="font-medium">{port.name}</span>
                                        <span className="text-xs text-muted-foreground">{port.code}</span>
                                      </div>
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                          </div>

                          {/* Selected Arrival Port Display */}
                          {selectedArrivalPort && (
                            <div className="text-xs text-green-600 dark:text-green-400 flex items-center gap-1">
                              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                              Arrival: {selectedArrivalPort.name}, {selectedArrivalPort.country} ({selectedArrivalPort.code})
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Transport Mode & Speed */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="transportMode" className="text-sm font-medium">Transport Mode</Label>
                          <Select value={transportMode} onValueChange={setTransportMode}>
                            <SelectTrigger id="transportMode" className="h-12">
                              <SelectValue placeholder="Select transport mode" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="sea">
                                <div className="flex items-center gap-2">
                                  <Ship className="h-4 w-4" />
                                  Sea Freight
                                </div>
                              </SelectItem>
                              <SelectItem value="air">
                                <div className="flex items-center gap-2">
                                  <Plane className="h-4 w-4" />
                                  Air Freight
                                </div>
                              </SelectItem>
                              <SelectItem value="road">
                                <div className="flex items-center gap-2">
                                  <Truck className="h-4 w-4" />
                                  Road Transport
                                </div>
                              </SelectItem>
                              <SelectItem value="rail">
                                <div className="flex items-center gap-2">
                                  <Train className="h-4 w-4" />
                                  Rail Transport
                                </div>
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        {transportMode === "sea" && (
                          <div className="space-y-2">
                            <Label htmlFor="vesselSpeed" className="text-sm font-medium">Vessel Speed (knots)</Label>
                            <Input
                              id="vesselSpeed"
                              type="number"
                              placeholder="15"
                              value={vesselSpeed}
                              onChange={(e) => setVesselSpeed(e.target.value)}
                              className="h-12"
                              min="8"
                              max="25"
                            />
                            <div className="text-xs text-muted-foreground">
                              Typical speeds: Container ships 15-20 knots, Bulk carriers 12-15 knots
                            </div>
                          </div>
                        )}
                      </div>

                      <Button 
                        onClick={calculateTransitTime} 
                        disabled={isTransitLoading || !selectedDeparturePort || !selectedArrivalPort}
                        className="w-full h-12 text-lg"
                      >
                        {isTransitLoading ? "Calculating..." : "Calculate Transit Time"}
                      </Button>

                      {transitError && (
                        <div className="p-4 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-lg">
                          <p className="text-red-700 dark:text-red-300">{transitError}</p>
                        </div>
                      )}

                      {transitResult && (
                        <div className="bg-white dark:bg-gray-900 rounded-lg border p-6">
                          <div className="flex items-center justify-between mb-4">
                            <h3 className="font-semibold text-lg">Transit Time Results</h3>
                            <span className="text-sm text-muted-foreground flex items-center gap-1">
                              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                              Real-time API calculation
                            </span>
                          </div>
                          
                          <div className="grid gap-4">
                            <div className="text-center p-4 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20 rounded-lg">
                              <p className="text-sm text-muted-foreground mb-2">Estimated Transit Time</p>
                              <p className="text-3xl font-bold text-primary">
                                {transitResult.includes('|||') ? transitResult.split('|||')[0] : transitResult}
                              </p>
                            </div>
                            
                            {transitResult.includes('|||') && (
                              <div className="p-4 bg-muted/50 rounded-lg">
                                <h4 className="font-medium mb-2">Journey Details</h4>
                                <p className="text-sm text-muted-foreground">
                                  {transitResult.split('|||')[1]}
                                </p>
                              </div>
                            )}
                            
                            {distance && (
                              <div className="grid grid-cols-2 gap-4 text-sm">
                                <div className="text-center p-3 bg-muted/30 rounded">
                                  <div className="font-medium">Distance</div>
                                  <div className="text-lg font-bold text-primary">{distance.toLocaleString()} NM</div>
                                </div>
                                <div className="text-center p-3 bg-muted/30 rounded">
                                  <div className="font-medium">Route</div>
                                  <div className="text-sm font-medium">
                                    {selectedDeparturePort?.code} → {selectedArrivalPort?.code}
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                          
                          <div className="mt-4 pt-4 border-t text-xs text-muted-foreground">
                            <p>⚠️ <strong>Important:</strong> Transit times are estimates and may vary based on:</p>
                            <ul className="list-disc list-inside mt-1 space-y-1">
                              <li>Weather conditions and seasonal factors</li>
                              <li>Port congestion and customs clearance</li>
                              <li>Vessel routing and fuel optimization</li>
                              <li>Documentation and inspection requirements</li>
                            </ul>
                          </div>
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
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="h-5 w-5" />
                      Currency Converter
                    </CardTitle>
                    <CardDescription>
                      Get real-time exchange rates for USD, EUR, AED, and INR using live market data for accurate international shipping cost calculations.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {/* Main Converter */}
                      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 rounded-lg p-6 border">
                        <div className="grid gap-4">
                          {/* From Currency */}
                          <div className="grid grid-cols-3 gap-4 items-end">
                            <div className="col-span-2 space-y-2">
                              <Label htmlFor="amount" className="text-sm font-medium">Amount</Label>
                              <Input
                                id="amount"
                                type="number"
                                placeholder="Enter amount"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                className="text-lg h-12 font-medium"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="fromCurrency" className="text-sm font-medium">From</Label>
                              <Select value={fromCurrency} onValueChange={setFromCurrency}>
                                <SelectTrigger id="fromCurrency" className="h-12">
                                  <SelectValue placeholder="Select currency" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="USD">🇺🇸 USD - US Dollar</SelectItem>
                                  <SelectItem value="EUR">🇪🇺 EUR - Euro</SelectItem>
                                  <SelectItem value="AED">🇦🇪 AED - UAE Dirham</SelectItem>
                                  <SelectItem value="INR">🇮🇳 INR - Indian Rupee</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>

                          {/* Swap Button */}
                          <div className="flex justify-center">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={swapCurrencies}
                              className="rounded-full w-10 h-10 p-0 border-2 hover:bg-primary hover:text-primary-foreground transition-all duration-200"
                            >
                              <ArrowUpDown className="h-4 w-4" />
                            </Button>
                          </div>

                          {/* To Currency */}
                          <div className="grid grid-cols-3 gap-4 items-end">
                            <div className="col-span-2 space-y-2">
                              <Label className="text-sm font-medium">Converted Amount</Label>
                              <div className="h-12 px-3 py-2 border rounded-md bg-muted/50 flex items-center text-lg font-medium">
                                {convertedAmount !== null ? convertedAmount.toLocaleString() : "0.00"}
                              </div>
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="toCurrency" className="text-sm font-medium">To</Label>
                              <Select value={toCurrency} onValueChange={setToCurrency}>
                                <SelectTrigger id="toCurrency" className="h-12">
                                  <SelectValue placeholder="Select currency" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="USD">🇺🇸 USD - US Dollar</SelectItem>
                                  <SelectItem value="EUR">🇪🇺 EUR - Euro</SelectItem>
                                  <SelectItem value="AED">🇦🇪 AED - UAE Dirham</SelectItem>
                                  <SelectItem value="INR">🇮🇳 INR - Indian Rupee</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                        </div>

                        <Button onClick={convertCurrency} disabled={isLoading} className="w-full mt-6 h-12 text-lg">
                          {isLoading ? "Converting..." : "Convert Currency"}
                        </Button>

                        {error && (
                          <div className="mt-4 p-3 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-lg">
                            <p className="text-red-700 dark:text-red-300 text-sm">{error}</p>
                          </div>
                        )}
                      </div>

                      {/* Exchange Rate Info */}
                      {exchangeRate !== null && (
                        <div className="bg-white dark:bg-gray-900 rounded-lg border p-4">
                          <div className="flex items-center justify-between mb-3">
                            <h3 className="font-semibold text-lg">Exchange Rate</h3>
                            <span className="text-sm text-muted-foreground">Live Rate</span>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4 mb-4">
                            <div className="text-center p-3 bg-muted/50 rounded-lg">
                              <p className="text-sm text-muted-foreground">1 {fromCurrency} equals</p>
                              <p className="text-2xl font-bold text-primary">{exchangeRate.toFixed(4)} {toCurrency}</p>
                            </div>
                            <div className="text-center p-3 bg-muted/50 rounded-lg">
                              <p className="text-sm text-muted-foreground">1 {toCurrency} equals</p>
                              <p className="text-2xl font-bold text-primary">{(1/exchangeRate).toFixed(4)} {fromCurrency}</p>
                            </div>
                          </div>

                          <div className="border-t pt-3">
                            <div className="flex justify-between items-center text-sm">
                              <span className="text-muted-foreground">Last updated: {lastUpdated}</span>
                              <span className="text-green-600 font-medium flex items-center gap-1">
                                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                Live rates
                              </span>
                            </div>
                            <div className="mt-2 text-xs text-muted-foreground">
                              <p>💡 Exchange rates may vary between different providers and websites due to:</p>
                              <ul className="list-disc list-inside mt-1 space-y-1">
                                <li>Different data sources and update frequencies</li>
                                <li>Mid-market vs. bank rates vs. retail rates</li>
                                <li>Time delays and market volatility</li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Quick Convert Table */}
                      {convertedAmount !== null && (
                        <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
                          <div className="flex justify-between items-center mb-3">
                            <h3 className="font-semibold">Quick Reference</h3>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                const urls = [
                                  `https://xe.com/currencyconverter/convert/?Amount=1&From=${fromCurrency}&To=${toCurrency}`,
                                  `https://www.google.com/search?q=${fromCurrency}+to+${toCurrency}`,
                                  `https://www.exchangerates.org.uk/currency/${fromCurrency}-${toCurrency}-exchange-rate-history.html`
                                ];
                                window.open(urls[0], '_blank');
                              }}
                              className="text-xs"
                            >
                              Compare Rates
                            </Button>
                          </div>
                          <div className="grid grid-cols-2 gap-3 text-sm">
                            {[1, 5, 10, 25, 50, 100].map((multiplier) => (
                              <div key={multiplier} className="flex justify-between p-2 bg-white dark:bg-gray-800 rounded border">
                                <span>{multiplier} {fromCurrency}</span>
                                <span className="font-medium">{(multiplier * (exchangeRate || 0)).toFixed(2)} {toCurrency}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="text-center text-xs text-muted-foreground p-4 bg-muted/30 rounded-lg">
                        <p>⚠️ <strong>Important:</strong> Exchange rates vary between different websites and providers.</p>
                        <p className="mt-1">Our rates are sourced from live market data but may differ from banks, XE.com, Google, or other services.</p>
                        <p className="mt-1">For actual transactions, always verify rates with your bank or financial institution.</p>
                        <div className="mt-2 pt-2 border-t border-muted-foreground/20">
                          <p className="text-xs">Rates shown are mid-market rates and do not include fees or spreads that banks may charge.</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </div>
    </PageTransition>
  )
}
