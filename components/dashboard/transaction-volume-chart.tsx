'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
// Chart components removed to avoid TypeScript issues in production build
import { Progress } from '@/components/ui/progress'

interface TransactionVolumeChartProps {
  data: Array<{
    hour: string
    transactions: number
  }>
}

export function TransactionVolumeChart({ data }: TransactionVolumeChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Transaction Volume (Today)</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80 space-y-4">
          <div className="text-sm text-gray-500 mb-4">Transaction Volume by Hour</div>
          {data.map((item, index) => (
            <div key={item.hour} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">{item.hour}</span>
                <span className="text-sm font-bold">{item.transactions} transactions</span>
              </div>
              <Progress
                value={(item.transactions / Math.max(...data.map(d => d.transactions))) * 100}
                className="h-3"
              />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}