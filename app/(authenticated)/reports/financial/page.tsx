'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { DatePickerWithRange } from '@/components/ui/date-range-picker'
import { Progress } from '@/components/ui/progress'
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Download, 
  Calendar,
  BarChart3,
  PieChart,
  FileText
} from 'lucide-react'

// Mock financial data
const financialSummary = {
  totalRevenue: 125680.50,
  totalCommissions: 3142.01,
  netRevenue: 122538.49,
  transactionFees: 2456.78,
  monthlyGrowth: 12.5,
  yearlyGrowth: 45.2
}

const monthlyData = [
  { month: 'Jan', revenue: 98450.25, commissions: 2461.26, transactions: 3245 },
  { month: 'Feb', revenue: 105230.75, commissions: 2630.77, transactions: 3456 },
  { month: 'Mar', revenue: 112890.50, commissions: 2822.26, transactions: 3678 },
  { month: 'Apr', revenue: 118750.25, commissions: 2968.76, transactions: 3890 },
  { month: 'May', revenue: 125680.50, commissions: 3142.01, transactions: 4123 }
]

const serviceBreakdown = [
  { service: 'Electricity Token', revenue: 82194.33, percentage: 65.4, transactions: 2698 },
  { service: 'Airtime Top-up', revenue: 31420.13, percentage: 25.0, transactions: 1031 },
  { service: 'Data Bundle', revenue: 11066.04, percentage: 8.8, transactions: 363 },
  { service: 'Bill Payment', revenue: 1000.00, percentage: 0.8, transactions: 31 }
]

const topVendorsByRevenue = [
  { vendor: 'ABC Store Harare', revenue: 15680.50, commissions: 392.01, transactions: 512 },
  { vendor: 'XYZ Mart Bulawayo', revenue: 12450.75, commissions: 311.27, transactions: 408 },
  { vendor: 'Quick Pay Mutare', revenue: 9890.25, commissions: 247.26, transactions: 324 },
  { vendor: 'City Electronics', revenue: 8750.00, commissions: 218.75, transactions: 287 },
  { vendor: 'Power Solutions', revenue: 7650.25, commissions: 191.26, transactions: 251 }
]

export default function FinancialReportsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState('monthly')
  const [selectedService, setSelectedService] = useState('all')

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center space-x-2">
            <BarChart3 className="h-6 w-6 text-green-600" />
            <span>Financial Reports</span>
          </h1>
          <p className="text-gray-500">Comprehensive financial analytics and revenue insights</p>
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

      {/* Financial Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <DollarSign className="h-4 w-4 mr-2 text-green-600" />
              Total Revenue
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              ${financialSummary.totalRevenue.toLocaleString()}
            </div>
            <p className="text-xs text-green-600 flex items-center">
              <TrendingUp className="h-3 w-3 mr-1" />
              +{financialSummary.monthlyGrowth}% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <PieChart className="h-4 w-4 mr-2 text-blue-600" />
              Total Commissions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              ${financialSummary.totalCommissions.toLocaleString()}
            </div>
            <p className="text-xs text-gray-500">
              {((financialSummary.totalCommissions / financialSummary.totalRevenue) * 100).toFixed(1)}% of revenue
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <TrendingUp className="h-4 w-4 mr-2 text-purple-600" />
              Net Revenue
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">
              ${financialSummary.netRevenue.toLocaleString()}
            </div>
            <p className="text-xs text-purple-600 flex items-center">
              <TrendingUp className="h-3 w-3 mr-1" />
              +{financialSummary.yearlyGrowth}% YoY
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <FileText className="h-4 w-4 mr-2 text-orange-600" />
              Transaction Fees
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">
              ${financialSummary.transactionFees.toLocaleString()}
            </div>
            <p className="text-xs text-gray-500">Processing fees</p>
          </CardContent>
        </Card>
      </div>

      {/* Revenue Trend Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Revenue Trend</CardTitle>
          <CardDescription>Monthly revenue and commission breakdown</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {monthlyData.map((data, index) => (
              <div key={data.month} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-12 text-center">
                    <span className="font-medium">{data.month}</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Revenue</span>
                      <span className="text-sm font-bold">${data.revenue.toLocaleString()}</span>
                    </div>
                    <Progress 
                      value={(data.revenue / Math.max(...monthlyData.map(d => d.revenue))) * 100} 
                      className="h-2"
                    />
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-500">Commissions</div>
                  <div className="font-medium">${data.commissions.toLocaleString()}</div>
                  <div className="text-xs text-gray-500">{data.transactions} txns</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Service Revenue Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Revenue by Service</CardTitle>
            <CardDescription>Service-wise revenue distribution</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {serviceBreakdown.map((service, index) => (
              <div key={service.service} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">{service.service}</span>
                  <div className="text-right">
                    <span className="text-sm font-bold">${service.revenue.toLocaleString()}</span>
                    <span className="text-xs text-gray-500 ml-2">({service.percentage}%)</span>
                  </div>
                </div>
                <Progress value={service.percentage} className="h-2" />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>{service.transactions} transactions</span>
                  <span>Avg: ${(service.revenue / service.transactions).toFixed(2)}</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Vendors by Revenue</CardTitle>
            <CardDescription>Highest revenue generating vendors</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {topVendorsByRevenue.map((vendor, index) => (
              <div key={vendor.vendor} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-full text-white font-bold text-sm">
                    {index + 1}
                  </div>
                  <div>
                    <h4 className="font-medium">{vendor.vendor}</h4>
                    <p className="text-xs text-gray-500">{vendor.transactions} transactions</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold">${vendor.revenue.toLocaleString()}</div>
                  <div className="text-xs text-gray-500">
                    Commission: ${vendor.commissions.toLocaleString()}
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Financial Metrics */}
      <Card>
        <CardHeader>
          <CardTitle>Key Financial Metrics</CardTitle>
          <CardDescription>Important financial performance indicators</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-green-600">
                ${(financialSummary.totalRevenue / monthlyData.reduce((sum, d) => sum + d.transactions, 0)).toFixed(2)}
              </div>
              <div className="text-sm text-gray-500">Average Transaction Value</div>
            </div>
            
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-blue-600">
                {((financialSummary.totalCommissions / financialSummary.totalRevenue) * 100).toFixed(2)}%
              </div>
              <div className="text-sm text-gray-500">Commission Rate</div>
            </div>
            
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-purple-600">
                {monthlyData.reduce((sum, d) => sum + d.transactions, 0).toLocaleString()}
              </div>
              <div className="text-sm text-gray-500">Total Transactions</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
