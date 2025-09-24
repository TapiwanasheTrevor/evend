'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  DollarSign, 
  CreditCard, 
  Target,
  Download,
  Calendar,
  BarChart3
} from 'lucide-react'

// Mock data for vendor analytics
const vendorPerformanceData = [
  {
    id: 'V-001',
    businessName: 'ABC Store Harare',
    totalTransactions: 1250,
    totalRevenue: 45680.50,
    commissionEarned: 1142.01,
    successRate: 98.5,
    avgTransactionValue: 36.54,
    growth: 12.5,
    status: 'excellent'
  },
  {
    id: 'V-002',
    businessName: 'XYZ Mart Bulawayo',
    totalTransactions: 890,
    totalRevenue: 32450.75,
    commissionEarned: 973.52,
    successRate: 96.8,
    avgTransactionValue: 36.46,
    growth: -2.3,
    status: 'good'
  },
  {
    id: 'V-003',
    businessName: 'Quick Pay Mutare',
    totalTransactions: 2100,
    totalRevenue: 78920.25,
    commissionEarned: 1973.01,
    successRate: 99.2,
    avgTransactionValue: 37.58,
    growth: 18.7,
    status: 'excellent'
  }
]

const topPerformingServices = [
  { service: 'Electricity Tokens', transactions: 3450, revenue: 125680.50, percentage: 65 },
  { service: 'Airtime Top-up', transactions: 1890, revenue: 45230.25, percentage: 25 },
  { service: 'Data Bundles', transactions: 890, revenue: 18950.75, percentage: 10 }
]

export default function VendorAnalyticsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState('30days')
  const [selectedMetric, setSelectedMetric] = useState('revenue')

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'bg-green-100 text-green-800'
      case 'good': return 'bg-blue-100 text-blue-800'
      case 'average': return 'bg-yellow-100 text-yellow-800'
      case 'poor': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Vendor Analytics</h1>
          <p className="text-gray-500">Performance insights and vendor comparison metrics</p>
        </div>
        <div className="flex items-center space-x-3">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7days">Last 7 Days</SelectItem>
              <SelectItem value="30days">Last 30 Days</SelectItem>
              <SelectItem value="90days">Last 90 Days</SelectItem>
              <SelectItem value="1year">Last Year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <Users className="h-4 w-4 mr-2" />
              Total Vendors
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">156</div>
            <p className="text-xs text-green-600 flex items-center">
              <TrendingUp className="h-3 w-3 mr-1" />
              +12% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <DollarSign className="h-4 w-4 mr-2" />
              Total Revenue
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$1.2M</div>
            <p className="text-xs text-green-600 flex items-center">
              <TrendingUp className="h-3 w-3 mr-1" />
              +8.5% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <CreditCard className="h-4 w-4 mr-2" />
              Avg Success Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">97.8%</div>
            <p className="text-xs text-green-600 flex items-center">
              <TrendingUp className="h-3 w-3 mr-1" />
              +0.3% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <Target className="h-4 w-4 mr-2" />
              Active Vendors
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">142</div>
            <p className="text-xs text-gray-500">91% of total vendors</p>
          </CardContent>
        </Card>
      </div>

      {/* Top Performing Vendors */}
      <Card>
        <CardHeader>
          <CardTitle>Top Performing Vendors</CardTitle>
          <CardDescription>Vendor performance ranking based on selected metrics</CardDescription>
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
                    <h4 className="font-medium">{vendor.businessName}</h4>
                    <p className="text-sm text-gray-500">{vendor.id}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-4 gap-8 text-center">
                  <div>
                    <p className="text-sm text-gray-500">Transactions</p>
                    <p className="font-medium">{vendor.totalTransactions.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Revenue</p>
                    <p className="font-medium">${vendor.totalRevenue.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Success Rate</p>
                    <p className="font-medium">{vendor.successRate}%</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Growth</p>
                    <p className={`font-medium flex items-center ${vendor.growth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {vendor.growth >= 0 ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />}
                      {Math.abs(vendor.growth)}%
                    </p>
                  </div>
                </div>
                
                <Badge className={getStatusColor(vendor.status)}>
                  {vendor.status}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Service Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Service Performance</CardTitle>
            <CardDescription>Revenue distribution by service type</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {topPerformingServices.map((service, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">{service.service}</span>
                  <span className="text-sm text-gray-500">${service.revenue.toLocaleString()}</span>
                </div>
                <Progress value={service.percentage} className="h-2" />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>{service.transactions.toLocaleString()} transactions</span>
                  <span>{service.percentage}%</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Performance Trends</CardTitle>
            <CardDescription>Monthly performance comparison</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-sm font-medium">High Performers</span>
                </div>
                <span className="text-sm font-bold">45 vendors</span>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="text-sm font-medium">Average Performers</span>
                </div>
                <span className="text-sm font-bold">89 vendors</span>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <span className="text-sm font-medium">Needs Attention</span>
                </div>
                <span className="text-sm font-bold">22 vendors</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
