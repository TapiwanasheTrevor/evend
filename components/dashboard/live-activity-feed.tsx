'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Button } from '@/components/ui/button'
import { RefreshCw, Play, Pause } from 'lucide-react'
import { Transaction } from '@/lib/mock-data'
import { formatDistanceToNow } from 'date-fns'

interface LiveActivityFeedProps {
  initialTransactions: Transaction[]
}

interface ActivityItem {
  id: string
  type: 'transaction' | 'vendor_login' | 'system_alert'
  title: string
  description: string
  timestamp: Date
  status: 'success' | 'warning' | 'error' | 'info'
}

export function LiveActivityFeed({ initialTransactions }: LiveActivityFeedProps) {
  const [activities, setActivities] = useState<ActivityItem[]>([])
  const [isLive, setIsLive] = useState(true)

  useEffect(() => {
    // Convert initial transactions to activities
    const initialActivities: ActivityItem[] = initialTransactions.slice(0, 5).map(tx => ({
      id: tx.id,
      type: 'transaction' as const,
      title: `New ${tx.service} ${tx.type}`,
      description: `${tx.vendor?.businessName} - $${tx.amount.toFixed(2)}`,
      timestamp: tx.timestamp,
      status: tx.status === 'success' ? 'success' : tx.status === 'failed' ? 'error' : 'warning'
    }))

    setActivities(initialActivities)
  }, [initialTransactions])

  useEffect(() => {
    if (!isLive) return

    const interval = setInterval(() => {
      // Simulate new activity every 5 seconds
      const activityTypes = [
        {
          type: 'transaction' as const,
          title: 'New electricity token',
          description: `Vendor V-${Math.floor(Math.random() * 999).toString().padStart(3, '0')} - $${(Math.random() * 100 + 10).toFixed(2)}`,
          status: 'success' as const
        },
        {
          type: 'vendor_login' as const,
          title: 'Vendor login',
          description: `Vendor logged in from ${['Harare', 'Bulawayo', 'Mutare'][Math.floor(Math.random() * 3)]}`,
          status: 'info' as const
        },
        {
          type: 'system_alert' as const,
          title: 'Low balance alert',
          description: `Vendor balance below threshold`,
          status: 'warning' as const
        }
      ]

      const randomActivity = activityTypes[Math.floor(Math.random() * activityTypes.length)]
      
      const newActivity: ActivityItem = {
        id: Date.now().toString(),
        ...randomActivity,
        timestamp: new Date()
      }

      setActivities(prev => [newActivity, ...prev.slice(0, 19)]) // Keep only 20 items
    }, 5000)

    return () => clearInterval(interval)
  }, [isLive])

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'transaction':
        return '💳'
      case 'vendor_login':
        return '👤'
      case 'system_alert':
        return '🚨'
      default:
        return '📢'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success':
        return 'bg-green-100 text-green-800'
      case 'warning':
        return 'bg-yellow-100 text-yellow-800'
      case 'error':
        return 'bg-red-100 text-red-800'
      case 'info':
        return 'bg-blue-100 text-blue-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center space-x-2">
          <span>Live Activity Feed</span>
          {isLive && (
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-sm text-green-600 font-normal">Live</span>
            </div>
          )}
        </CardTitle>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsLive(!isLive)}
          >
            {isLive ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </Button>
          <Button variant="outline" size="sm">
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-80">
          <div className="space-y-3">
            {activities.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="text-lg">{getActivityIcon(activity.type)}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="font-medium text-sm truncate">{activity.title}</p>
                    <Badge className={`text-xs ${getStatusColor(activity.status)}`}>
                      {activity.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 truncate">{activity.description}</p>
                  <p className="text-xs text-gray-400 mt-1">
                    {formatDistanceToNow(activity.timestamp, { addSuffix: true })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}