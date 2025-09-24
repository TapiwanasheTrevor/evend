'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Shield, 
  Save, 
  RefreshCw, 
  Edit, 
  AlertTriangle,
  DollarSign,
  Clock,
  Users
} from 'lucide-react'

// Mock data for transaction limits
const transactionLimits = [
  {
    id: 'TL-001',
    service: 'Electricity Token',
    vendorType: 'vendor',
    minAmount: 1.00,
    maxAmount: 1000.00,
    dailyLimit: 5000.00,
    monthlyLimit: 50000.00,
    maxTransactionsPerDay: 100,
    isActive: true,
    lastUpdated: '2024-01-10',
    updatedBy: 'admin@powertel.co.zw'
  },
  {
    id: 'TL-002',
    service: 'Electricity Token',
    vendorType: 'agent',
    minAmount: 1.00,
    maxAmount: 500.00,
    dailyLimit: 2000.00,
    monthlyLimit: 20000.00,
    maxTransactionsPerDay: 50,
    isActive: true,
    lastUpdated: '2024-01-10',
    updatedBy: 'admin@powertel.co.zw'
  },
  {
    id: 'TL-003',
    service: 'Airtime Top-up',
    vendorType: 'vendor',
    minAmount: 0.50,
    maxAmount: 100.00,
    dailyLimit: 1000.00,
    monthlyLimit: 10000.00,
    maxTransactionsPerDay: 200,
    isActive: true,
    lastUpdated: '2024-01-08',
    updatedBy: 'admin@powertel.co.zw'
  },
  {
    id: 'TL-004',
    service: 'Data Bundle',
    vendorType: 'vendor',
    minAmount: 1.00,
    maxAmount: 50.00,
    dailyLimit: 500.00,
    monthlyLimit: 5000.00,
    maxTransactionsPerDay: 100,
    isActive: true,
    lastUpdated: '2024-01-08',
    updatedBy: 'admin@powertel.co.zw'
  }
]

const systemLimits = [
  {
    id: 'SL-001',
    name: 'Maximum Failed Attempts',
    value: 5,
    unit: 'attempts',
    description: 'Maximum failed login attempts before account lockout',
    category: 'Security',
    isActive: true
  },
  {
    id: 'SL-002',
    name: 'Session Timeout',
    value: 30,
    unit: 'minutes',
    description: 'Automatic logout after inactivity period',
    category: 'Security',
    isActive: true
  },
  {
    id: 'SL-003',
    name: 'Daily Transaction Limit',
    value: 10000,
    unit: 'transactions',
    description: 'Maximum number of transactions per day system-wide',
    category: 'Performance',
    isActive: true
  },
  {
    id: 'SL-004',
    name: 'Concurrent Users',
    value: 100,
    unit: 'users',
    description: 'Maximum number of concurrent active users',
    category: 'Performance',
    isActive: true
  }
]

export default function TransactionLimitsPage() {
  const [editingLimit, setEditingLimit] = useState<string | null>(null)
  const [limits, setLimits] = useState(transactionLimits)
  const [sysLimits, setSysLimits] = useState(systemLimits)
  const [newLimit, setNewLimit] = useState({
    service: '',
    vendorType: '',
    minAmount: '',
    maxAmount: '',
    dailyLimit: '',
    monthlyLimit: '',
    maxTransactionsPerDay: ''
  })

  const handleSaveLimit = (limitId: string, updatedData: any) => {
    setLimits(prev => prev.map(limit => 
      limit.id === limitId 
        ? { ...limit, ...updatedData, lastUpdated: new Date().toISOString().split('T')[0] }
        : limit
    ))
    setEditingLimit(null)
  }

  const handleToggleActive = (limitId: string) => {
    setLimits(prev => prev.map(limit => 
      limit.id === limitId 
        ? { ...limit, isActive: !limit.isActive }
        : limit
    ))
  }

  const handleSaveSystemLimit = (limitId: string, newValue: number) => {
    setSysLimits(prev => prev.map(limit => 
      limit.id === limitId 
        ? { ...limit, value: newValue }
        : limit
    ))
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center space-x-2">
            <Shield className="h-6 w-6 text-blue-600" />
            <span>Transaction Limits</span>
          </h1>
          <p className="text-gray-500">Configure transaction limits and system constraints</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button>
            <Save className="h-4 w-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <DollarSign className="h-4 w-4 mr-2 text-green-600" />
              Highest Limit
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              ${Math.max(...limits.map(l => l.maxAmount)).toLocaleString()}
            </div>
            <p className="text-xs text-gray-500">Per transaction</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <Clock className="h-4 w-4 mr-2 text-blue-600" />
              Daily Limits
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              ${Math.max(...limits.map(l => l.dailyLimit)).toLocaleString()}
            </div>
            <p className="text-xs text-gray-500">Highest daily limit</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <Users className="h-4 w-4 mr-2 text-purple-600" />
              Active Limits
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">
              {limits.filter(l => l.isActive).length}
            </div>
            <p className="text-xs text-gray-500">Currently enforced</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <AlertTriangle className="h-4 w-4 mr-2 text-orange-600" />
              System Limits
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">
              {sysLimits.filter(l => l.isActive).length}
            </div>
            <p className="text-xs text-gray-500">System constraints</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="transaction" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="transaction">Transaction Limits</TabsTrigger>
          <TabsTrigger value="system">System Limits</TabsTrigger>
        </TabsList>

        <TabsContent value="transaction" className="space-y-6">
          {/* Add New Limit */}
          <Card>
            <CardHeader>
              <CardTitle>Add New Transaction Limit</CardTitle>
              <CardDescription>Configure limits for new service and vendor type combinations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <Label htmlFor="service">Service</Label>
                  <Select value={newLimit.service} onValueChange={(value) => setNewLimit(prev => ({ ...prev, service: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select service" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Electricity Token">Electricity Token</SelectItem>
                      <SelectItem value="Airtime Top-up">Airtime Top-up</SelectItem>
                      <SelectItem value="Data Bundle">Data Bundle</SelectItem>
                      <SelectItem value="Bill Payment">Bill Payment</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="vendorType">Vendor Type</Label>
                  <Select value={newLimit.vendorType} onValueChange={(value) => setNewLimit(prev => ({ ...prev, vendorType: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="vendor">Vendor</SelectItem>
                      <SelectItem value="agent">Agent</SelectItem>
                      <SelectItem value="distributor">Distributor</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="maxAmount">Max Amount ($)</Label>
                  <Input
                    id="maxAmount"
                    type="number"
                    step="0.01"
                    min="0"
                    value={newLimit.maxAmount}
                    onChange={(e) => setNewLimit(prev => ({ ...prev, maxAmount: e.target.value }))}
                    placeholder="1000.00"
                  />
                </div>
                
                <div className="flex items-end">
                  <Button className="w-full">
                    Add Limit
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Current Transaction Limits */}
          <Card>
            <CardHeader>
              <CardTitle>Current Transaction Limits</CardTitle>
              <CardDescription>Manage existing transaction limit configurations</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Service</TableHead>
                      <TableHead>Vendor Type</TableHead>
                      <TableHead>Min Amount</TableHead>
                      <TableHead>Max Amount</TableHead>
                      <TableHead>Daily Limit</TableHead>
                      <TableHead>Monthly Limit</TableHead>
                      <TableHead>Max Transactions/Day</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {limits.map((limit) => (
                      <TableRow key={limit.id}>
                        <TableCell>
                          <Badge variant="outline">{limit.service}</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="secondary">{limit.vendorType}</Badge>
                        </TableCell>
                        <TableCell>
                          {editingLimit === limit.id ? (
                            <Input
                              type="number"
                              step="0.01"
                              defaultValue={limit.minAmount}
                              className="w-24"
                            />
                          ) : (
                            <span>${limit.minAmount.toFixed(2)}</span>
                          )}
                        </TableCell>
                        <TableCell>
                          {editingLimit === limit.id ? (
                            <Input
                              type="number"
                              step="0.01"
                              defaultValue={limit.maxAmount}
                              className="w-24"
                            />
                          ) : (
                            <span className="font-medium">${limit.maxAmount.toFixed(2)}</span>
                          )}
                        </TableCell>
                        <TableCell>
                          {editingLimit === limit.id ? (
                            <Input
                              type="number"
                              step="0.01"
                              defaultValue={limit.dailyLimit}
                              className="w-28"
                            />
                          ) : (
                            <span>${limit.dailyLimit.toLocaleString()}</span>
                          )}
                        </TableCell>
                        <TableCell>
                          {editingLimit === limit.id ? (
                            <Input
                              type="number"
                              step="0.01"
                              defaultValue={limit.monthlyLimit}
                              className="w-28"
                            />
                          ) : (
                            <span>${limit.monthlyLimit.toLocaleString()}</span>
                          )}
                        </TableCell>
                        <TableCell>
                          {editingLimit === limit.id ? (
                            <Input
                              type="number"
                              defaultValue={limit.maxTransactionsPerDay}
                              className="w-20"
                            />
                          ) : (
                            <span>{limit.maxTransactionsPerDay}</span>
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Switch
                              checked={limit.isActive}
                              onCheckedChange={() => handleToggleActive(limit.id)}
                            />
                            <Badge className={limit.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                              {limit.isActive ? 'Active' : 'Inactive'}
                            </Badge>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            {editingLimit === limit.id ? (
                              <>
                                <Button size="sm" onClick={() => handleSaveLimit(limit.id, {})}>
                                  <Save className="h-4 w-4" />
                                </Button>
                                <Button variant="outline" size="sm" onClick={() => setEditingLimit(null)}>
                                  Cancel
                                </Button>
                              </>
                            ) : (
                              <Button variant="ghost" size="sm" onClick={() => setEditingLimit(limit.id)}>
                                <Edit className="h-4 w-4" />
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="system" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>System Limits & Constraints</CardTitle>
              <CardDescription>Configure system-wide operational limits</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {sysLimits.map((limit) => (
                <div key={limit.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3">
                      <h4 className="font-medium">{limit.name}</h4>
                      <Badge variant="outline">{limit.category}</Badge>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">{limit.description}</p>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <div className="flex items-center space-x-2">
                        <Input
                          type="number"
                          defaultValue={limit.value}
                          className="w-20 text-right"
                          onBlur={(e) => handleSaveSystemLimit(limit.id, parseInt(e.target.value))}
                        />
                        <span className="text-sm text-gray-500">{limit.unit}</span>
                      </div>
                    </div>
                    
                    <Switch
                      checked={limit.isActive}
                      onCheckedChange={(checked) => 
                        setSysLimits(prev => prev.map(l => 
                          l.id === limit.id ? { ...l, isActive: checked } : l
                        ))
                      }
                    />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
