'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Progress } from '@/components/ui/progress'
import { 
  Users, 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Download, 
  Calendar,
  Star,
  Target,
  Award
} from 'lucide-react'

// Mock vendor performance data
const vendorMetrics = {
  totalVendors: 156,
  activeVendors: 142,
  topPerformers: 45,
  avgPerformanceScore: 87.5,
  totalRevenue: 125680.50,
  avgRevenuePerVendor: 805.64
}

const vendorPerformanceData = [
  {
    id: 'V-001',
    businessName: 'ABC Store Harare',
    type: 'vendor',
    totalTransactions: 1250,
    totalRevenue: 45680.50,
    commissionEarned: 1142.01,
    successRate: 98.5,
    avgTransactionValue: 36.54,
    growth: 12.5,
    performanceScore: 95,
    status: 'excellent',
    location: 'Harare'
  },
  {
    id: 'V-002',
    businessName: 'XYZ Mart Bulawayo',
    type: 'agent',
    totalTransactions: 890,
    totalRevenue: 32450.75,
    commissionEarned: 973.52,
    successRate: 96.8,
    avgTransactionValue: 36.46,
    growth: -2.3,
    performanceScore: 88,
    status: 'good',
    location: 'Bulawayo'
  },
  {
    id: 'V-003',
    businessName: 'Quick Pay Mutare',
    type: 'vendor',
    totalTransactions: 2100,
    totalRevenue: 78920.25,
    commissionEarned: 1973.01,
    successRate: 99.2,
    avgTransactionValue: 37.58,
    growth: 18.7,
    performanceScore: 97,
    status: 'excellent',
    location: 'Mutare'
  },
  {
    id: 'V-004',
    businessName: 'City Electronics',
    type: 'distributor',
    totalTransactions: 1580,
    totalRevenue: 58750.00,
    commissionEarned: 1468.75,
    successRate: 94.2,
    avgTransactionValue: 37.18,
    growth: 8.9,
    performanceScore: 85,
    status: 'good',
    location: 'Harare'
  },
  {
    id: 'V-005',
    businessName: 'Power Solutions',
    type: 'vendor',
    totalTransactions: 750,
    totalRevenue: 27650.25,
    commissionEarned: 691.26,
    successRate: 92.1,
    avgTransactionValue: 36.87,
    growth: -5.2,
    performanceScore: 78,
    status: 'average',
    location: 'Gweru'
  }
]

const locationPerformance = [
  { location: 'Harare', vendors: 45, revenue: 52340.75, avgScore: 89.2 },
  { location: 'Bulawayo', vendors: 32, revenue: 38920.50, avgScore: 86.8 },
  { location: 'Mutare', vendors: 28, revenue: 31450.25, avgScore: 88.5 },
  { location: 'Gweru', vendors: 22, revenue: 18750.00, avgScore: 82.1 },
  { location: 'Masvingo', vendors: 18, revenue: 15680.50, avgScore: 84.3 }
]

const vendorTypeBreakdown = [
  { type: 'Vendor', count: 89, percentage: 57.1, avgRevenue: 892.45 },
  { type: 'Agent', count: 45, percentage: 28.8, avgRevenue: 756.32 },
  { type: 'Distributor', count: 22, percentage: 14.1, avgRevenue: 1245.67 }
]

export default function VendorReportsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState('monthly')
  const [selectedLocation, setSelectedLocation] = useState('all')
  const [selectedType, setSelectedType] = useState('all')

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'bg-green-100 text-green-800'
      case 'good': return 'bg-blue-100 text-blue-800'
      case 'average': return 'bg-yellow-100 text-yellow-800'
      case 'poor': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getPerformanceIcon = (score: number) => {
    if (score >= 95) return <Award className="h-4 w-4 text-yellow-600" />
    if (score >= 85) return <Star className="h-4 w-4 text-blue-600" />
    if (score >= 75) return <Target className="h-4 w-4 text-green-600" />
    return <Users className="h-4 w-4 text-gray-600" />
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center space-x-2">
            <Users className="h-6 w-6 text-blue-600" />
            <span>Vendor Performance Reports</span>
          </h1>
          <p className="text-gray-500">Comprehensive vendor analytics and performance insights</p>
        </div>
        <div className="flex items-center space-x-3">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="daily">Daily</SelectItem>
              <SelectItem value="weekly">Weekly</SelectItem>
              <SelectItem value="monthly">Monthly</SelectItem>
              <SelectItem value="yearly">Yearly</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm">
            <Calendar className="h-4 w-4 mr-2" />
            Date Range
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Vendor Metrics Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <Users className="h-4 w-4 mr-2 text-blue-600" />
              Total Vendors
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{vendorMetrics.totalVendors}</div>
            <p className="text-xs text-green-600 flex items-center">
              <TrendingUp className="h-3 w-3 mr-1" />
              +12% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <Target className="h-4 w-4 mr-2 text-green-600" />
              Active Vendors
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{vendorMetrics.activeVendors}</div>
            <p className="text-xs text-gray-500">
              {((vendorMetrics.activeVendors / vendorMetrics.totalVendors) * 100).toFixed(1)}% active rate
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <Star className="h-4 w-4 mr-2 text-yellow-600" />
              Avg Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{vendorMetrics.avgPerformanceScore}</div>
            <p className="text-xs text-yellow-600 flex items-center">
              <TrendingUp className="h-3 w-3 mr-1" />
              +2.3 points
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <DollarSign className="h-4 w-4 mr-2 text-purple-600" />
              Avg Revenue/Vendor
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">
              ${vendorMetrics.avgRevenuePerVendor.toFixed(2)}
            </div>
            <p className="text-xs text-gray-500">Per vendor monthly</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filter Vendors</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Select value={selectedLocation} onValueChange={setSelectedLocation}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Locations</SelectItem>
                <SelectItem value="harare">Harare</SelectItem>
                <SelectItem value="bulawayo">Bulawayo</SelectItem>
                <SelectItem value="mutare">Mutare</SelectItem>
                <SelectItem value="gweru">Gweru</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="vendor">Vendor</SelectItem>
                <SelectItem value="agent">Agent</SelectItem>
                <SelectItem value="distributor">Distributor</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline" onClick={() => {
              setSelectedLocation('all')
              setSelectedType('all')
            }}>
              Clear Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Top Performing Vendors */}
      <Card>
        <CardHeader>
          <CardTitle>Top Performing Vendors</CardTitle>
          <CardDescription>Vendor performance ranking based on multiple metrics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {vendorPerformanceData.map((vendor, index) => (
              <div key={vendor.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-full text-white font-bold text-sm">
                    {index + 1}
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <h4 className="font-medium">{vendor.businessName}</h4>
                      {getPerformanceIcon(vendor.performanceScore)}
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span>{vendor.id}</span>
                      <Badge variant="outline">{vendor.type}</Badge>
                      <span>{vendor.location}</span>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-4 gap-8 text-center">
                  <div>
                    <p className="text-sm text-gray-500">Revenue</p>
                    <p className="font-medium">${vendor.totalRevenue.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Transactions</p>
                    <p className="font-medium">{vendor.totalTransactions.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Success Rate</p>
                    <p className="font-medium">{vendor.successRate}%</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Growth</p>
                    <p className={`font-medium flex items-center justify-center ${vendor.growth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {vendor.growth >= 0 ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />}
                      {Math.abs(vendor.growth)}%
                    </p>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium">Score: {vendor.performanceScore}</span>
                    <Badge className={getStatusColor(vendor.status)}>
                      {vendor.status}
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Location and Type Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Performance by Location</CardTitle>
            <CardDescription>Regional vendor performance comparison</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {locationPerformance.map((location, index) => (
              <div key={location.location} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">{location.location}</span>
                  <div className="text-right">
                    <span className="text-sm font-bold">${location.revenue.toLocaleString()}</span>
                    <span className="text-xs text-gray-500 ml-2">({location.vendors} vendors)</span>
                  </div>
                </div>
                <Progress value={location.avgScore} className="h-2" />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Avg Score: {location.avgScore}</span>
                  <span>Avg Revenue: ${(location.revenue / location.vendors).toFixed(0)}</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Vendor Type Distribution</CardTitle>
            <CardDescription>Breakdown by vendor type and performance</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {vendorTypeBreakdown.map((type, index) => (
              <div key={type.type} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">{type.type}</span>
                  <div className="text-right">
                    <span className="text-sm font-bold">{type.count} vendors</span>
                    <span className="text-xs text-gray-500 ml-2">({type.percentage}%)</span>
                  </div>
                </div>
                <Progress value={type.percentage} className="h-2" />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Avg Revenue: ${type.avgRevenue}</span>
                  <span>{type.percentage}% of total</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Performance Insights */}
      <Card>
        <CardHeader>
          <CardTitle>Performance Insights</CardTitle>
          <CardDescription>Key insights and recommendations</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 border rounded-lg bg-green-50">
              <Award className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-green-600">{vendorMetrics.topPerformers}</div>
              <div className="text-sm text-gray-600">Top Performers</div>
              <div className="text-xs text-gray-500 mt-1">Score ≥ 90</div>
            </div>
            
            <div className="text-center p-4 border rounded-lg bg-blue-50">
              <TrendingUp className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-blue-600">
                {vendorPerformanceData.filter(v => v.growth > 0).length}
              </div>
              <div className="text-sm text-gray-600">Growing Vendors</div>
              <div className="text-xs text-gray-500 mt-1">Positive growth</div>
            </div>
            
            <div className="text-center p-4 border rounded-lg bg-yellow-50">
              <Target className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-yellow-600">
                {vendorPerformanceData.filter(v => v.status === 'average' || v.status === 'poor').length}
              </div>
              <div className="text-sm text-gray-600">Need Attention</div>
              <div className="text-xs text-gray-500 mt-1">Below average</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
