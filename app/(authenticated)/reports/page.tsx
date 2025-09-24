'use client'

import { useState } from 'react'
import { Calendar, Download, TrendingUp, TrendingDown, DollarSign, Users, Zap, BarChart3 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { DatePickerWithRange } from '@/components/ui/date-range-picker'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
// Chart components removed to avoid TypeScript issues in production build

// Mock data for charts
const revenueData = [
  { date: '2024-01-01', revenue: 12500, transactions: 125, forecast: 13000 },
  { date: '2024-01-02', revenue: 15200, transactions: 152, forecast: 13500 },
  { date: '2024-01-03', revenue: 11800, transactions: 118, forecast: 12200 },
  { date: '2024-01-04', revenue: 18600, transactions: 186, forecast: 16000 },
  { date: '2024-01-05', revenue: 22300, transactions: 223, forecast: 20000 },
  { date: '2024-01-06', revenue: 19500, transactions: 195, forecast: 18500 },
  { date: '2024-01-07', revenue: 25100, transactions: 251, forecast: 23000 }
]

const vendorPerformance = [
  { vendor: 'ABC Store Harare', revenue: 45230, transactions: 342, growth: 12.5, efficiency: 95 },
  { vendor: 'XYZ Mart Bulawayo', revenue: 38900, transactions: 289, growth: 8.7, efficiency: 92 },
  { vendor: 'Mutare Electronics', revenue: 32100, transactions: 234, growth: -2.1, efficiency: 88 },
  { vendor: 'Corner Shop Kwekwe', revenue: 28500, transactions: 198, growth: 15.3, efficiency: 97 },
  { vendor: 'City Mall Chitungwiza', revenue: 24800, transactions: 167, growth: 6.4, efficiency: 90 }
]

const serviceDistribution = [
  { name: 'Electricity', value: 65, color: '#0EA5E9' },
  { name: 'Water', value: 20, color: '#06B6D4' },
  { name: 'Gas', value: 10, color: '#F59E0B' },
  { name: 'Other', value: 5, color: '#8B5CF6' }
]

const hourlyData = [
  { hour: '00:00', electricity: 45, water: 12, gas: 5 },
  { hour: '06:00', electricity: 89, water: 25, gas: 8 },
  { hour: '08:00', electricity: 156, water: 45, gas: 15 },
  { hour: '12:00', electricity: 234, water: 67, gas: 23 },
  { hour: '17:00', electricity: 312, water: 89, gas: 34 },
  { hour: '20:00', electricity: 198, water: 56, gas: 18 },
  { hour: '23:00', electricity: 78, water: 23, gas: 7 }
]

const geographicData = [
  { province: 'Harare', revenue: 125000, vendors: 45, growth: 12.3 },
  { province: 'Bulawayo', revenue: 89000, vendors: 32, growth: 8.7 },
  { province: 'Manicaland', revenue: 67000, vendors: 28, growth: -1.2 },
  { province: 'Mashonaland Central', revenue: 45000, vendors: 19, growth: 15.6 },
  { province: 'Masvingo', revenue: 38000, vendors: 16, growth: 7.8 }
]

export default function ReportsPage() {
  const [dateRange, setDateRange] = useState('last30days')
  const [selectedPeriod, setSelectedPeriod] = useState('current')
  const [comparisonMode, setComparisonMode] = useState(false)

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Reports & Analytics</h1>
          <p className="text-gray-500">Comprehensive business intelligence and performance metrics</p>
        </div>
        <div className="flex items-center space-x-3">
          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="yesterday">Yesterday</SelectItem>
              <SelectItem value="last7days">Last 7 Days</SelectItem>
              <SelectItem value="last30days">Last 30 Days</SelectItem>
              <SelectItem value="custom">Custom Range</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Key Metrics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold">$234,580</div>
                <div className="flex items-center text-sm text-green-600">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  +12.5%
                </div>
              </div>
              <DollarSign className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold">12,456</div>
                <div className="flex items-center text-sm text-green-600">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  +8.3%
                </div>
              </div>
              <BarChart3 className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Active Vendors</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold">156</div>
                <div className="flex items-center text-sm text-green-600">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  +5.2%
                </div>
              </div>
              <Users className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Avg Transaction</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold">$18.84</div>
                <div className="flex items-center text-sm text-red-600">
                  <TrendingDown className="h-4 w-4 mr-1" />
                  -2.1%
                </div>
              </div>
              <Zap className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Report Tabs */}
      <Tabs defaultValue="financial" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="financial">Financial Reports</TabsTrigger>
          <TabsTrigger value="vendor">Vendor Performance</TabsTrigger>
          <TabsTrigger value="service">Service Analytics</TabsTrigger>
          <TabsTrigger value="system">System Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="financial" className="space-y-6">
          {/* Revenue Trends */}
          <Card>
            <CardHeader>
              <CardTitle>Revenue Trends with Forecast</CardTitle>
              <CardDescription>
                Daily revenue performance with ML-based forecasting
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80 space-y-4">
                <div className="text-sm text-gray-500 mb-4">Revenue Trend (Last 5 Days)</div>
                {revenueData.map((data, index) => (
                  <div key={data.date} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 text-center">
                        <span className="text-sm font-medium">Day {index + 1}</span>
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-medium">Revenue</span>
                          <span className="text-sm font-bold">${data.revenue.toLocaleString()}</span>
                        </div>
                        <Progress
                          value={(data.revenue / Math.max(...revenueData.map(d => d.revenue))) * 100}
                          className="h-2"
                        />
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-500">Transactions</div>
                      <div className="font-medium">{data.transactions}</div>
                      <div className="text-xs text-gray-500">Forecast: ${data.forecast.toLocaleString()}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Service Distribution */}
            <Card>
              <CardHeader>
                <CardTitle>Service Distribution</CardTitle>
                <CardDescription>Revenue breakdown by service type</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 space-y-4">
                  <div className="text-sm text-gray-500 mb-4">Service Revenue Distribution</div>
                  {serviceDistribution.map((service, index) => (
                    <div key={service.name} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-2">
                          <div
                            className="w-4 h-4 rounded-full"
                            style={{ backgroundColor: service.color }}
                          ></div>
                          <span className="text-sm font-medium">{service.name}</span>
                        </div>
                        <div className="text-right">
                          <span className="text-sm font-bold">${service.value.toLocaleString()}</span>
                          <span className="text-xs text-gray-500 ml-2">
                            ({((service.value / serviceDistribution.reduce((sum, s) => sum + s.value, 0)) * 100).toFixed(1)}%)
                          </span>
                        </div>
                      </div>
                      <Progress
                        value={(service.value / Math.max(...serviceDistribution.map(s => s.value))) * 100}
                        className="h-2"
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Peak Hours Analysis */}
            <Card>
              <CardHeader>
                <CardTitle>Peak Hours Analysis</CardTitle>
                <CardDescription>Transaction volume by hour of day</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 space-y-4">
                  <div className="text-sm text-gray-500 mb-4">Peak Hours Transaction Volume</div>
                  {hourlyData.map((data, index) => (
                    <div key={data.hour} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">{data.hour}</span>
                        <span className="text-sm text-gray-500">
                          Total: {data.electricity + data.water + data.gas}
                        </span>
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                          <div className="flex-1">
                            <Progress value={(data.electricity / 300) * 100} className="h-2" />
                          </div>
                          <span className="text-xs w-12 text-right">{data.electricity}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-3 h-3 bg-cyan-500 rounded-full"></div>
                          <div className="flex-1">
                            <Progress value={(data.water / 200) * 100} className="h-2" />
                          </div>
                          <span className="text-xs w-12 text-right">{data.water}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                          <div className="flex-1">
                            <Progress value={(data.gas / 100) * 100} className="h-2" />
                          </div>
                          <span className="text-xs w-12 text-right">{data.gas}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="vendor" className="space-y-6">
          {/* Vendor Performance Table */}
          <Card>
            <CardHeader>
              <CardTitle>Top Vendor Performance</CardTitle>
              <CardDescription>
                Ranking by revenue with growth and efficiency metrics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {vendorPerformance.map((vendor, index) => (
                  <div key={vendor.vendor} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold">
                          {index + 1}
                        </div>
                        <div>
                          <h3 className="font-medium">{vendor.vendor}</h3>
                          <p className="text-sm text-gray-500">{vendor.transactions} transactions</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold">${vendor.revenue.toLocaleString()}</div>
                        <Badge
                          className={vendor.growth > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}
                        >
                          {vendor.growth > 0 ? '+' : ''}{vendor.growth}%
                        </Badge>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Efficiency Score</span>
                        <span>{vendor.efficiency}%</span>
                      </div>
                      <Progress value={vendor.efficiency} className="h-2" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="service" className="space-y-6">
          {/* Service Demand Heatmap */}
          <Card>
            <CardHeader>
              <CardTitle>Service Demand Analysis</CardTitle>
              <CardDescription>
                Comprehensive analysis of service usage patterns and trends
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-3">
                  <h4 className="font-medium">Electricity Tokens</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Peak Hours</span>
                      <span className="font-medium">5PM - 8PM</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Avg Token Value</span>
                      <span className="font-medium">$25.40</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Success Rate</span>
                      <span className="font-medium text-green-600">98.7%</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <h4 className="font-medium">Water Payments</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Peak Hours</span>
                      <span className="font-medium">8AM - 12PM</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Avg Payment</span>
                      <span className="font-medium">$18.90</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Success Rate</span>
                      <span className="font-medium text-green-600">96.3%</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <h4 className="font-medium">Gas Payments</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Peak Hours</span>
                      <span className="font-medium">6PM - 9PM</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Avg Payment</span>
                      <span className="font-medium">$12.60</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Success Rate</span>
                      <span className="font-medium text-yellow-600">94.1%</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Geographic Distribution */}
          <Card>
            <CardHeader>
              <CardTitle>Geographic Distribution</CardTitle>
              <CardDescription>Revenue and growth by province</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {geographicData.map((location) => (
                  <div key={location.province} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">{location.province}</h3>
                        <p className="text-sm text-gray-500">{location.vendors} vendors</p>
                      </div>
                      <div className="text-right">
                        <div className="font-bold">${location.revenue.toLocaleString()}</div>
                        <Badge
                          className={location.growth > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}
                        >
                          {location.growth > 0 ? '+' : ''}{location.growth}%
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="system" className="space-y-6">
          {/* System Performance */}
          <Card>
            <CardHeader>
              <CardTitle>System Performance Metrics</CardTitle>
              <CardDescription>
                Infrastructure health and performance indicators
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-green-600">99.9%</div>
                  <div className="text-sm text-gray-500">System Uptime</div>
                  <div className="text-xs text-gray-400 mt-1">Last 30 days</div>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">1.2s</div>
                  <div className="text-sm text-gray-500">Avg Response Time</div>
                  <div className="text-xs text-gray-400 mt-1">API endpoints</div>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-orange-600">0.03%</div>
                  <div className="text-sm text-gray-500">Error Rate</div>
                  <div className="text-xs text-gray-400 mt-1">Transaction failures</div>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">156</div>
                  <div className="text-sm text-gray-500">Active Sessions</div>
                  <div className="text-xs text-gray-400 mt-1">Current users</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Error Logs Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Recent System Events</CardTitle>
              <CardDescription>Last 24 hours activity summary</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <div>
                      <p className="font-medium">System Backup Completed</p>
                      <p className="text-sm text-gray-500">2 hours ago</p>
                    </div>
                  </div>
                  <Badge className="bg-green-100 text-green-800">Success</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <div>
                      <p className="font-medium">High Memory Usage Detected</p>
                      <p className="text-sm text-gray-500">4 hours ago</p>
                    </div>
                  </div>
                  <Badge className="bg-yellow-100 text-yellow-800">Warning</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <div>
                      <p className="font-medium">Database Maintenance Started</p>
                      <p className="text-sm text-gray-500">8 hours ago</p>
                    </div>
                  </div>
                  <Badge className="bg-blue-100 text-blue-800">Info</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}