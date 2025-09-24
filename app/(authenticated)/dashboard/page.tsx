'use client'

import { useEffect, useState } from 'react'
import { MetricCard } from '@/components/dashboard/metric-card'
import { RevenueChart } from '@/components/dashboard/revenue-chart'
import { TransactionVolumeChart } from '@/components/dashboard/transaction-volume-chart'
import { TopVendorsChart } from '@/components/dashboard/top-vendors-chart'
import { ServiceDistributionChart } from '@/components/dashboard/service-distribution-chart'
import { RecentTransactions } from '@/components/dashboard/recent-transactions'
import { LiveActivityFeed } from '@/components/dashboard/live-activity-feed'
import {
  generateMockVendors,
  generateMockTransactions,
  generateDashboardMetrics,
  generateRevenueChartData,
  generateHourlyTransactionData,
  generateTopVendorsData,
  generateServiceDistributionData,
  type Vendor,
  type Transaction,
  type DashboardMetrics
} from '@/lib/mock-data'
import {
  DollarSign,
  CreditCard,
  Users,
  Activity,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function DashboardPage() {
  const [vendors, setVendors] = useState<Vendor[]>([])
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate data loading
    const loadData = async () => {
      setIsLoading(true)
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const mockVendors = generateMockVendors()
      const mockTransactions = generateMockTransactions(mockVendors)
      const dashboardMetrics = generateDashboardMetrics(mockTransactions)
      
      setVendors(mockVendors)
      setTransactions(mockTransactions)
      setMetrics(dashboardMetrics)
      setIsLoading(false)
    }

    loadData()
  }, [])

  if (isLoading) {
    return (
      <div className="p-6 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-6">
                <div className="h-20 bg-gray-200 rounded"></div>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {[...Array(4)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-6">
                <div className="h-80 bg-gray-200 rounded"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  if (!metrics) return null

  const revenueData = generateRevenueChartData()
  const hourlyData = generateHourlyTransactionData()
  const topVendorsData = generateTopVendorsData(vendors)
  const serviceDistributionData = generateServiceDistributionData()

  return (
    <div className="p-6 space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-1">
          Welcome back! Here's what's happening with your E-Vend system today.
        </p>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Today's Revenue"
          value={`$${metrics.revenue.today.toLocaleString()}`}
          change={metrics.revenue.change}
          icon={DollarSign}
          iconColor="text-green-600"
          description="Compared to yesterday"
        />
        <MetricCard
          title="Total Transactions"
          value={metrics.transactions.count}
          change={8.3}
          icon={CreditCard}
          iconColor="text-blue-600"
          description={`$${metrics.transactions.volume.toLocaleString()} volume`}
        />
        <MetricCard
          title="Active Users"
          value={metrics.users.active.toLocaleString()}
          change={12.5}
          icon={Users}
          iconColor="text-purple-600"
          description={`${metrics.users.new} new today`}
        />
        <MetricCard
          title="System Health"
          value={`${metrics.system.uptime}%`}
          icon={Activity}
          iconColor="text-green-600"
          description="Uptime this month"
        />
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RevenueChart data={revenueData} />
        <TransactionVolumeChart data={hourlyData} />
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TopVendorsChart data={topVendorsData} />
        <ServiceDistributionChart data={serviceDistributionData} />
      </div>

      {/* Tables Row */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2">
          <RecentTransactions transactions={transactions} />
        </div>
        <div>
          <LiveActivityFeed initialTransactions={transactions} />
        </div>
      </div>

      {/* Additional Insights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Peak Hour</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold">2:00 PM</p>
                <p className="text-sm text-gray-500">145 transactions</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Average Transaction</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold">${metrics.transactions.avgValue.toFixed(2)}</p>
                <p className="text-sm text-green-600 flex items-center">
                  <ArrowUpRight className="h-3 w-3 mr-1" />
                  +5.2% from last week
                </p>
              </div>
              <DollarSign className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Success Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold">98.2%</p>
                <p className="text-sm text-green-600 flex items-center">
                  <ArrowUpRight className="h-3 w-3 mr-1" />
                  +0.5% this month
                </p>
              </div>
              <Activity className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}