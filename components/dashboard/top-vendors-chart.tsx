'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
// Chart components removed to avoid TypeScript issues in production build
import { Progress } from '@/components/ui/progress'

interface TopVendorsChartProps {
  data: Array<{
    name: string
    revenue: number
    transactions: number
  }>
}

export function TopVendorsChart({ data }: TopVendorsChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Vendors by Revenue</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80 space-y-4">
          <div className="text-sm text-gray-500 mb-4">Top Vendors by Revenue</div>
          {data.map((vendor, index) => (
            <div key={vendor.name} className="space-y-2">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <span className="text-xs bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center">
                    {index + 1}
                  </span>
                  <span className="text-sm font-medium">{vendor.name}</span>
                </div>
                <div className="text-right">
                  <span className="text-sm font-bold">${vendor.revenue.toLocaleString()}</span>
                  <span className="text-xs text-gray-500 block">{vendor.transactions} txns</span>
                </div>
              </div>
              <Progress
                value={(vendor.revenue / Math.max(...data.map(d => d.revenue))) * 100}
                className="h-2"
              />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}