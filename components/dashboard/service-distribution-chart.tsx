'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
// Chart components removed to avoid TypeScript issues in production build
import { Progress } from '@/components/ui/progress'

interface ServiceDistributionChartProps {
  data: Array<{
    name: string
    value: number
    fill: string
  }>
}

export function ServiceDistributionChart({ data }: ServiceDistributionChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Service Distribution</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80 space-y-4">
          <div className="text-sm text-gray-500 mb-4">Service Distribution</div>
          {data.map((service, index) => (
            <div key={service.name} className="space-y-2">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <div
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: service.fill }}
                  ></div>
                  <span className="text-sm font-medium">{service.name}</span>
                </div>
                <div className="text-right">
                  <span className="text-sm font-bold">{service.value}%</span>
                </div>
              </div>
              <Progress
                value={service.value}
                className="h-2"
              />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}