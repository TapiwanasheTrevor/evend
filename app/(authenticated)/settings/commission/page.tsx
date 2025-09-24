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
  Percent, 
  Save, 
  RefreshCw, 
  Edit, 
  History,
  TrendingUp,
  Users,
  DollarSign
} from 'lucide-react'

// Mock data for commission rates
const commissionRates = [
  {
    id: 'CR-001',
    service: 'Electricity Token',
    vendorType: 'vendor',
    rate: 2.5,
    minAmount: 1.00,
    maxAmount: 1000.00,
    isActive: true,
    lastUpdated: '2024-01-10',
    updatedBy: 'admin@powertel.co.zw'
  },
  {
    id: 'CR-002',
    service: 'Electricity Token',
    vendorType: 'agent',
    rate: 3.0,
    minAmount: 1.00,
    maxAmount: 500.00,
    isActive: true,
    lastUpdated: '2024-01-10',
    updatedBy: 'admin@powertel.co.zw'
  },
  {
    id: 'CR-003',
    service: 'Airtime Top-up',
    vendorType: 'vendor',
    rate: 1.5,
    minAmount: 0.50,
    maxAmount: 100.00,
    isActive: true,
    lastUpdated: '2024-01-08',
    updatedBy: 'admin@powertel.co.zw'
  },
  {
    id: 'CR-004',
    service: 'Data Bundle',
    vendorType: 'vendor',
    rate: 2.0,
    minAmount: 1.00,
    maxAmount: 50.00,
    isActive: true,
    lastUpdated: '2024-01-08',
    updatedBy: 'admin@powertel.co.zw'
  }
]

const commissionHistory = [
  {
    id: 'CH-001',
    service: 'Electricity Token',
    vendorType: 'vendor',
    oldRate: 2.0,
    newRate: 2.5,
    changeDate: '2024-01-10 14:30:00',
    changedBy: 'admin@powertel.co.zw',
    reason: 'Market adjustment - increased demand'
  },
  {
    id: 'CH-002',
    service: 'Airtime Top-up',
    vendorType: 'vendor',
    oldRate: 1.0,
    newRate: 1.5,
    changeDate: '2024-01-08 10:15:00',
    changedBy: 'admin@powertel.co.zw',
    reason: 'Competitive alignment'
  }
]

export default function CommissionRatesPage() {
  const [editingRate, setEditingRate] = useState<string | null>(null)
  const [rates, setRates] = useState(commissionRates)
  const [newRate, setNewRate] = useState({
    service: '',
    vendorType: '',
    rate: '',
    minAmount: '',
    maxAmount: ''
  })

  const handleSaveRate = (rateId: string, updatedData: any) => {
    setRates(prev => prev.map(rate => 
      rate.id === rateId 
        ? { ...rate, ...updatedData, lastUpdated: new Date().toISOString().split('T')[0] }
        : rate
    ))
    setEditingRate(null)
  }

  const handleToggleActive = (rateId: string) => {
    setRates(prev => prev.map(rate => 
      rate.id === rateId 
        ? { ...rate, isActive: !rate.isActive }
        : rate
    ))
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center space-x-2">
            <Percent className="h-6 w-6 text-green-600" />
            <span>Commission Rates</span>
          </h1>
          <p className="text-gray-500">Manage commission rates for different services and vendor types</p>
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
              <Percent className="h-4 w-4 mr-2 text-green-600" />
              Active Rates
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{rates.filter(r => r.isActive).length}</div>
            <p className="text-xs text-gray-500">Currently active</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <TrendingUp className="h-4 w-4 mr-2 text-blue-600" />
              Avg Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {(rates.reduce((sum, r) => sum + r.rate, 0) / rates.length).toFixed(1)}%
            </div>
            <p className="text-xs text-gray-500">Across all services</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <Users className="h-4 w-4 mr-2 text-purple-600" />
              Vendor Types
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">
              {new Set(rates.map(r => r.vendorType)).size}
            </div>
            <p className="text-xs text-gray-500">Different types</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <DollarSign className="h-4 w-4 mr-2 text-orange-600" />
              Services
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">
              {new Set(rates.map(r => r.service)).size}
            </div>
            <p className="text-xs text-gray-500">Different services</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="rates" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="rates">Commission Rates</TabsTrigger>
          <TabsTrigger value="history">Change History</TabsTrigger>
        </TabsList>

        <TabsContent value="rates" className="space-y-6">
          {/* Add New Rate */}
          <Card>
            <CardHeader>
              <CardTitle>Add New Commission Rate</CardTitle>
              <CardDescription>Configure commission rates for new service and vendor type combinations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                <div>
                  <Label htmlFor="service">Service</Label>
                  <Select value={newRate.service} onValueChange={(value) => setNewRate(prev => ({ ...prev, service: value }))}>
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
                  <Select value={newRate.vendorType} onValueChange={(value) => setNewRate(prev => ({ ...prev, vendorType: value }))}>
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
                  <Label htmlFor="rate">Rate (%)</Label>
                  <Input
                    id="rate"
                    type="number"
                    step="0.1"
                    min="0"
                    max="100"
                    value={newRate.rate}
                    onChange={(e) => setNewRate(prev => ({ ...prev, rate: e.target.value }))}
                    placeholder="2.5"
                  />
                </div>
                
                <div>
                  <Label htmlFor="minAmount">Min Amount ($)</Label>
                  <Input
                    id="minAmount"
                    type="number"
                    step="0.01"
                    min="0"
                    value={newRate.minAmount}
                    onChange={(e) => setNewRate(prev => ({ ...prev, minAmount: e.target.value }))}
                    placeholder="1.00"
                  />
                </div>
                
                <div className="flex items-end">
                  <Button className="w-full">
                    Add Rate
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Current Rates */}
          <Card>
            <CardHeader>
              <CardTitle>Current Commission Rates</CardTitle>
              <CardDescription>Manage existing commission rate configurations</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Service</TableHead>
                      <TableHead>Vendor Type</TableHead>
                      <TableHead>Rate (%)</TableHead>
                      <TableHead>Min Amount</TableHead>
                      <TableHead>Max Amount</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Last Updated</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {rates.map((rate) => (
                      <TableRow key={rate.id}>
                        <TableCell>
                          <Badge variant="outline">{rate.service}</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="secondary">{rate.vendorType}</Badge>
                        </TableCell>
                        <TableCell>
                          {editingRate === rate.id ? (
                            <Input
                              type="number"
                              step="0.1"
                              defaultValue={rate.rate}
                              className="w-20"
                            />
                          ) : (
                            <span className="font-medium">{rate.rate}%</span>
                          )}
                        </TableCell>
                        <TableCell>
                          {editingRate === rate.id ? (
                            <Input
                              type="number"
                              step="0.01"
                              defaultValue={rate.minAmount}
                              className="w-24"
                            />
                          ) : (
                            <span>${rate.minAmount.toFixed(2)}</span>
                          )}
                        </TableCell>
                        <TableCell>
                          {editingRate === rate.id ? (
                            <Input
                              type="number"
                              step="0.01"
                              defaultValue={rate.maxAmount}
                              className="w-24"
                            />
                          ) : (
                            <span>${rate.maxAmount.toFixed(2)}</span>
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Switch
                              checked={rate.isActive}
                              onCheckedChange={() => handleToggleActive(rate.id)}
                            />
                            <Badge className={rate.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                              {rate.isActive ? 'Active' : 'Inactive'}
                            </Badge>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <div className="text-sm">{rate.lastUpdated}</div>
                            <div className="text-xs text-gray-500">{rate.updatedBy}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            {editingRate === rate.id ? (
                              <>
                                <Button size="sm" onClick={() => handleSaveRate(rate.id, {})}>
                                  <Save className="h-4 w-4" />
                                </Button>
                                <Button variant="outline" size="sm" onClick={() => setEditingRate(null)}>
                                  Cancel
                                </Button>
                              </>
                            ) : (
                              <Button variant="ghost" size="sm" onClick={() => setEditingRate(rate.id)}>
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

        <TabsContent value="history" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <History className="h-5 w-5" />
                <span>Commission Rate Change History</span>
              </CardTitle>
              <CardDescription>Track all changes made to commission rates</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Service</TableHead>
                      <TableHead>Vendor Type</TableHead>
                      <TableHead>Old Rate</TableHead>
                      <TableHead>New Rate</TableHead>
                      <TableHead>Change Date</TableHead>
                      <TableHead>Changed By</TableHead>
                      <TableHead>Reason</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {commissionHistory.map((change) => (
                      <TableRow key={change.id}>
                        <TableCell>
                          <Badge variant="outline">{change.service}</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="secondary">{change.vendorType}</Badge>
                        </TableCell>
                        <TableCell>
                          <span className="text-red-600 font-medium">{change.oldRate}%</span>
                        </TableCell>
                        <TableCell>
                          <span className="text-green-600 font-medium">{change.newRate}%</span>
                        </TableCell>
                        <TableCell className="font-mono text-sm">{change.changeDate}</TableCell>
                        <TableCell>{change.changedBy}</TableCell>
                        <TableCell>{change.reason}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
