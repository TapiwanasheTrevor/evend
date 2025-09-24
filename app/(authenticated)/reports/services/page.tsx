'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Progress } from '@/components/ui/progress'
import { 
  Zap, 
  Smartphone, 
  Wifi, 
  FileText, 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Download, 
  Calendar,
  Activity,
  Clock,
  AlertTriangle
} from 'lucide-react'

// Mock service performance data
const serviceMetrics = {
  totalServices: 4,
  totalTransactions: 12456,
  totalRevenue: 125680.50,
  avgSuccessRate: 96.8,
  avgResponseTime: 2.3
}

const servicePerformanceData = [
  {
    id: 'SRV-001',
    name: 'Electricity Token',
    icon: Zap,
    totalTransactions: 8234,
    totalRevenue: 82194.33,
    successRate: 98.5,
    failureRate: 1.5,
    avgResponseTime: 1.8,
    avgTransactionValue: 9.98,
    growth: 15.2,
    marketShare: 65.4,
    status: 'excellent',
    peakHours: '18:00-22:00',
    popularVendors: 45
  },
  {
    id: 'SRV-002',
    name: 'Airtime Top-up',
    icon: Smartphone,
    totalTransactions: 3142,
    totalRevenue: 31420.13,
    successRate: 97.2,
    failureRate: 2.8,
    avgResponseTime: 2.1,
    avgTransactionValue: 10.00,
    growth: 8.7,
    marketShare: 25.0,
    status: 'good',
    peakHours: '12:00-14:00',
    popularVendors: 38
  },
  {
    id: 'SRV-003',
    name: 'Data Bundle',
    icon: Wifi,
    totalTransactions: 1106,
    totalRevenue: 11066.04,
    successRate: 95.8,
    failureRate: 4.2,
    avgResponseTime: 3.2,
    avgTransactionValue: 10.00,
    growth: -2.3,
    marketShare: 8.8,
    status: 'average',
    peakHours: '20:00-23:00',
    popularVendors: 22
  },
  {
    id: 'SRV-004',
    name: 'Bill Payment',
    icon: FileText,
    totalTransactions: 100,
    totalRevenue: 1000.00,
    successRate: 92.0,
    failureRate: 8.0,
    avgResponseTime: 4.5,
    avgTransactionValue: 10.00,
    growth: 25.0,
    marketShare: 0.8,
    status: 'new',
    peakHours: '09:00-17:00',
    popularVendors: 8
  }
]

const hourlyUsageData = [
  { hour: '00:00', electricity: 45, airtime: 12, data: 8, bills: 2 },
  { hour: '06:00', electricity: 120, airtime: 35, data: 15, bills: 5 },
  { hour: '12:00', electricity: 280, airtime: 95, data: 42, bills: 12 },
  { hour: '18:00', electricity: 450, airtime: 78, data: 65, bills: 8 },
  { hour: '22:00', electricity: 320, airtime: 45, data: 38, bills: 3 }
]

const serviceIssues = [
  {
    service: 'Electricity Token',
    issue: 'Timeout errors during peak hours',
    frequency: 'High',
    impact: 'Medium',
    status: 'investigating'
  },
  {
    service: 'Data Bundle',
    issue: 'Slow response times',
    frequency: 'Medium',
    impact: 'High',
    status: 'resolved'
  },
  {
    service: 'Bill Payment',
    issue: 'Integration failures',
    frequency: 'Low',
    impact: 'High',
    status: 'open'
  }
]

export default function ServiceReportsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState('monthly')
  const [selectedService, setSelectedService] = useState('all')

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'bg-green-100 text-green-800'
      case 'good': return 'bg-blue-100 text-blue-800'
      case 'average': return 'bg-yellow-100 text-yellow-800'
      case 'new': return 'bg-purple-100 text-purple-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getIssueStatusColor = (status: string) => {
    switch (status) {
      case 'resolved': return 'bg-green-100 text-green-800'
      case 'investigating': return 'bg-yellow-100 text-yellow-800'
      case 'open': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center space-x-2">
            <Activity className="h-6 w-6 text-purple-600" />
            <span>Service Analytics</span>
          </h1>
          <p className="text-gray-500">Comprehensive service performance and usage analytics</p>
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

      {/* Service Metrics Summary */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <Activity className="h-4 w-4 mr-2 text-purple-600" />
              Total Services
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{serviceMetrics.totalServices}</div>
            <p className="text-xs text-gray-500">Active services</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <TrendingUp className="h-4 w-4 mr-2 text-blue-600" />
              Total Transactions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {serviceMetrics.totalTransactions.toLocaleString()}
            </div>
            <p className="text-xs text-blue-600 flex items-center">
              <TrendingUp className="h-3 w-3 mr-1" />
              +12.5% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <DollarSign className="h-4 w-4 mr-2 text-green-600" />
              Total Revenue
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              ${serviceMetrics.totalRevenue.toLocaleString()}
            </div>
            <p className="text-xs text-gray-500">All services</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <Activity className="h-4 w-4 mr-2 text-orange-600" />
              Avg Success Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{serviceMetrics.avgSuccessRate}%</div>
            <p className="text-xs text-orange-600 flex items-center">
              <TrendingUp className="h-3 w-3 mr-1" />
              +1.2% improvement
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <Clock className="h-4 w-4 mr-2 text-purple-600" />
              Avg Response Time
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">{serviceMetrics.avgResponseTime}s</div>
            <p className="text-xs text-green-600 flex items-center">
              <TrendingDown className="h-3 w-3 mr-1" />
              -0.3s faster
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Service Performance Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Service Performance Overview</CardTitle>
          <CardDescription>Detailed performance metrics for each service</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {servicePerformanceData.map((service) => {
              const IconComponent = service.icon
              return (
                <div key={service.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg">
                      <IconComponent className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <h4 className="font-medium">{service.name}</h4>
                        <Badge className={getStatusColor(service.status)}>
                          {service.status}
                        </Badge>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span>{service.id}</span>
                        <span>Peak: {service.peakHours}</span>
                        <span>{service.popularVendors} vendors</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-5 gap-8 text-center">
                    <div>
                      <p className="text-sm text-gray-500">Transactions</p>
                      <p className="font-medium">{service.totalTransactions.toLocaleString()}</p>
                      <p className="text-xs text-gray-500">{service.marketShare}% share</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Revenue</p>
                      <p className="font-medium">${service.totalRevenue.toLocaleString()}</p>
                      <p className="text-xs text-gray-500">Avg: ${service.avgTransactionValue}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Success Rate</p>
                      <p className="font-medium">{service.successRate}%</p>
                      <Progress value={service.successRate} className="h-1 mt-1" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Response Time</p>
                      <p className="font-medium">{service.avgResponseTime}s</p>
                      <p className="text-xs text-gray-500">Average</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Growth</p>
                      <p className={`font-medium flex items-center justify-center ${service.growth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {service.growth >= 0 ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />}
                        {Math.abs(service.growth)}%
                      </p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Usage Patterns and Issues */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Hourly Usage Patterns</CardTitle>
            <CardDescription>Service usage throughout the day</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {hourlyUsageData.map((data, index) => (
              <div key={data.hour} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">{data.hour}</span>
                  <span className="text-sm text-gray-500">
                    Total: {data.electricity + data.airtime + data.data + data.bills}
                  </span>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <Zap className="h-3 w-3 text-yellow-600" />
                    <div className="flex-1">
                      <Progress value={(data.electricity / 500) * 100} className="h-2" />
                    </div>
                    <span className="text-xs w-12 text-right">{data.electricity}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Smartphone className="h-3 w-3 text-blue-600" />
                    <div className="flex-1">
                      <Progress value={(data.airtime / 100) * 100} className="h-2" />
                    </div>
                    <span className="text-xs w-12 text-right">{data.airtime}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Wifi className="h-3 w-3 text-green-600" />
                    <div className="flex-1">
                      <Progress value={(data.data / 70) * 100} className="h-2" />
                    </div>
                    <span className="text-xs w-12 text-right">{data.data}</span>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5 text-orange-600" />
              <span>Service Issues</span>
            </CardTitle>
            <CardDescription>Current and recent service issues</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {serviceIssues.map((issue, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="font-medium">{issue.service}</h4>
                    <p className="text-sm text-gray-600 mt-1">{issue.issue}</p>
                    <div className="flex items-center space-x-4 mt-2">
                      <div className="flex items-center space-x-1">
                        <span className="text-xs text-gray-500">Frequency:</span>
                        <Badge variant="outline" className="text-xs">
                          {issue.frequency}
                        </Badge>
                      </div>
                      <div className="flex items-center space-x-1">
                        <span className="text-xs text-gray-500">Impact:</span>
                        <Badge variant="outline" className="text-xs">
                          {issue.impact}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <Badge className={getIssueStatusColor(issue.status)}>
                    {issue.status}
                  </Badge>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Service Comparison */}
      <Card>
        <CardHeader>
          <CardTitle>Service Comparison Matrix</CardTitle>
          <CardDescription>Side-by-side comparison of key metrics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Service</th>
                  <th className="text-center p-2">Market Share</th>
                  <th className="text-center p-2">Success Rate</th>
                  <th className="text-center p-2">Avg Response</th>
                  <th className="text-center p-2">Growth</th>
                  <th className="text-center p-2">Revenue</th>
                </tr>
              </thead>
              <tbody>
                {servicePerformanceData.map((service) => {
                  const IconComponent = service.icon
                  return (
                    <tr key={service.id} className="border-b">
                      <td className="p-2">
                        <div className="flex items-center space-x-2">
                          <IconComponent className="h-4 w-4" />
                          <span className="font-medium">{service.name}</span>
                        </div>
                      </td>
                      <td className="text-center p-2">
                        <div className="flex items-center justify-center">
                          <Progress value={service.marketShare} className="w-16 h-2 mr-2" />
                          <span className="text-sm">{service.marketShare}%</span>
                        </div>
                      </td>
                      <td className="text-center p-2">
                        <span className={`font-medium ${service.successRate >= 98 ? 'text-green-600' : service.successRate >= 95 ? 'text-yellow-600' : 'text-red-600'}`}>
                          {service.successRate}%
                        </span>
                      </td>
                      <td className="text-center p-2">
                        <span className={`font-medium ${service.avgResponseTime <= 2 ? 'text-green-600' : service.avgResponseTime <= 3 ? 'text-yellow-600' : 'text-red-600'}`}>
                          {service.avgResponseTime}s
                        </span>
                      </td>
                      <td className="text-center p-2">
                        <span className={`font-medium ${service.growth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {service.growth >= 0 ? '+' : ''}{service.growth}%
                        </span>
                      </td>
                      <td className="text-center p-2 font-medium">
                        ${service.totalRevenue.toLocaleString()}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
