'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'

interface RevenueChartProps {
  data: Array<{
    date: string
    revenue: number
    transactions: number
  }>
}

export function RevenueChart({ data }: RevenueChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Revenue Trend (30 Days)</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80 space-y-4">
          <div className="text-sm text-gray-500 mb-4">Revenue Trend</div>
          {data.map((item, index) => (
            <div key={item.date} className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center space-x-4">
                <div className="w-12 text-center">
                  <span className="text-sm font-medium">{item.date}</span>
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Revenue</span>
                    <span className="text-sm font-bold">${item.revenue.toLocaleString()}</span>
                  </div>
                  <Progress
                    value={(item.revenue / Math.max(...data.map(d => d.revenue))) * 100}
                    className="h-2"
                  />
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-500">Transactions</div>
                <div className="font-medium">{item.transactions}</div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}