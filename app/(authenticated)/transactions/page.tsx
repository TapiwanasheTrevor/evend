'use client'

import { useState } from 'react'
import { Search, Filter, Download, Eye, RefreshCw, Calendar, Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ScrollArea } from '@/components/ui/scroll-area'

// Mock data - would come from API
const transactions = [
  {
    id: 'TXN-001',
    reference: 'REF-20240112-001',
    type: 'token',
    service: 'electricity',
    vendorId: 'V-001',
    vendorName: 'ABC Store Harare',
    customerId: '0771234567',
    customerName: 'John Doe',
    amount: 50.00,
    currency: 'USD',
    status: 'success',
    timestamp: '2024-01-12T14:30:00Z',
    metadata: {
      meterNumber: '01234567890',
      tokenNumber: '1234-5678-9012-3456',
      units: 100
    }
  },
  {
    id: 'TXN-002',
    reference: 'REF-20240112-002',
    type: 'topup',
    service: 'wallet',
    vendorId: 'V-002',
    vendorName: 'XYZ Mart Bulawayo',
    customerId: '0772345678',
    customerName: 'Mary Smith',
    amount: 100.00,
    currency: 'USD',
    status: 'pending',
    timestamp: '2024-01-12T14:28:00Z',
    metadata: {}
  },
  {
    id: 'TXN-003',
    reference: 'REF-20240112-003',
    type: 'bill',
    service: 'water',
    vendorId: 'V-003',
    vendorName: 'Mutare Electronics',
    customerId: '0773456789',
    customerName: 'Peter Wilson',
    amount: 75.00,
    currency: 'USD',
    status: 'failed',
    timestamp: '2024-01-12T14:25:00Z',
    metadata: {
      accountNumber: 'WTR-789456'
    }
  }
]

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'success': return <CheckCircle className="h-4 w-4 text-green-500" />
    case 'failed': return <XCircle className="h-4 w-4 text-red-500" />
    case 'pending': return <Clock className="h-4 w-4 text-yellow-500" />
    default: return <AlertCircle className="h-4 w-4 text-gray-500" />
  }
}

const getStatusBadge = (status: string) => {
  const variants = {
    success: 'bg-green-100 text-green-800',
    failed: 'bg-red-100 text-red-800',
    pending: 'bg-yellow-100 text-yellow-800',
    processing: 'bg-blue-100 text-blue-800'
  }
  return variants[status as keyof typeof variants] || variants.pending
}

const getServiceBadge = (service: string) => {
  const variants = {
    electricity: 'bg-blue-100 text-blue-800',
    water: 'bg-cyan-100 text-cyan-800',
    gas: 'bg-orange-100 text-orange-800',
    wallet: 'bg-green-100 text-green-800'
  }
  return variants[service as keyof typeof variants] || variants.wallet
}

const getTypeBadge = (type: string) => {
  const variants = {
    token: 'bg-purple-100 text-purple-800',
    topup: 'bg-green-100 text-green-800',
    bill: 'bg-blue-100 text-blue-800',
    transfer: 'bg-orange-100 text-orange-800'
  }
  return variants[type as keyof typeof variants] || variants.token
}

export default function TransactionsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [serviceFilter, setServiceFilter] = useState('all')
  const [typeFilter, setTypeFilter] = useState('all')
  const [dateRange, setDateRange] = useState('today')
  const [selectedTransaction, setSelectedTransaction] = useState<any>(null)

  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = transaction.reference.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.vendorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.customerId.includes(searchTerm)
    const matchesStatus = statusFilter === 'all' || transaction.status === statusFilter
    const matchesService = serviceFilter === 'all' || transaction.service === serviceFilter
    const matchesType = typeFilter === 'all' || transaction.type === typeFilter

    return matchesSearch && matchesStatus && matchesService && matchesType
  })

  const totals = {
    total: transactions.length,
    success: transactions.filter(t => t.status === 'success').length,
    failed: transactions.filter(t => t.status === 'failed').length,
    pending: transactions.filter(t => t.status === 'pending').length,
    totalAmount: transactions.reduce((sum, t) => sum + (t.status === 'success' ? t.amount : 0), 0),
    failedAmount: transactions.reduce((sum, t) => sum + (t.status === 'failed' ? t.amount : 0), 0),
    pendingAmount: transactions.reduce((sum, t) => sum + (t.status === 'pending' ? t.amount : 0), 0)
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Transaction Management</h1>
          <p className="text-gray-500">Monitor and manage all system transactions</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Trans</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totals.total}</div>
            <div className="text-sm text-green-600">${totals.totalAmount.toLocaleString()}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-green-600">Success</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{totals.success}</div>
            <div className="text-sm text-gray-600">${totals.totalAmount.toLocaleString()}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-red-600">Failed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{totals.failed}</div>
            <div className="text-sm text-gray-600">${totals.failedAmount.toLocaleString()}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-yellow-600">Pending</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{totals.pending}</div>
            <div className="text-sm text-gray-600">${totals.pendingAmount.toLocaleString()}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Success Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {((totals.success / totals.total) * 100).toFixed(1)}%
            </div>
            <div className="text-sm text-gray-600">Overall rate</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
            <div className="lg:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search by reference, vendor, customer..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={dateRange} onValueChange={setDateRange}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="yesterday">Yesterday</SelectItem>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
                <SelectItem value="custom">Custom Range</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="success">Success</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
              </SelectContent>
            </Select>
            <Select value={serviceFilter} onValueChange={setServiceFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Service" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Services</SelectItem>
                <SelectItem value="electricity">Electricity</SelectItem>
                <SelectItem value="water">Water</SelectItem>
                <SelectItem value="gas">Gas</SelectItem>
                <SelectItem value="wallet">Wallet</SelectItem>
              </SelectContent>
            </Select>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="token">Token</SelectItem>
                <SelectItem value="topup">Top-up</SelectItem>
                <SelectItem value="bill">Bill Payment</SelectItem>
                <SelectItem value="transfer">Transfer</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Transactions Table */}
      <Card>
        <CardHeader>
          <CardTitle>Transactions ({filteredTransactions.length})</CardTitle>
          <CardDescription>Real-time transaction monitoring and management</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Reference</TableHead>
                  <TableHead>DateTime</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Service</TableHead>
                  <TableHead>Vendor</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTransactions.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell className="font-medium">
                      <div>
                        <div className="font-mono text-sm">{transaction.reference}</div>
                        <div className="text-xs text-gray-500">{transaction.id}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div>{new Date(transaction.timestamp).toLocaleDateString()}</div>
                        <div className="text-gray-500">{new Date(transaction.timestamp).toLocaleTimeString()}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getTypeBadge(transaction.type)}>
                        {transaction.type}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={getServiceBadge(transaction.service)}>
                        {transaction.service}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div className="font-medium">{transaction.vendorName}</div>
                        <div className="text-gray-500">{transaction.vendorId}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div className="font-medium">{transaction.customerName}</div>
                        <div className="text-gray-500">{transaction.customerId}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-right font-medium">
                        ${transaction.amount.toFixed(2)}
                      </div>
                      <div className="text-xs text-gray-500 text-right">{transaction.currency}</div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(transaction.status)}
                        <Badge className={getStatusBadge(transaction.status)}>
                          {transaction.status}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setSelectedTransaction(transaction)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>Transaction Details</DialogTitle>
                            <DialogDescription>
                              Complete information for transaction {transaction.reference}
                            </DialogDescription>
                          </DialogHeader>
                          <TransactionDetails transaction={transaction} />
                        </DialogContent>
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function TransactionDetails({ transaction }: { transaction: any }) {
  if (!transaction) return null

  const timeline = [
    { time: '14:30:00', event: 'Transaction initiated', status: 'completed' },
    { time: '14:30:05', event: 'Vendor validation completed', status: 'completed' },
    { time: '14:30:10', event: 'Payment processed', status: 'completed' },
    { time: '14:30:15', event: 'Token generated', status: 'completed' },
    { time: '14:30:20', event: 'SMS sent to customer', status: 'completed' }
  ]

  return (
    <div className="space-y-6">
      <Tabs defaultValue="details" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="details">Details</TabsTrigger>
          <TabsTrigger value="timeline">Timeline</TabsTrigger>
          <TabsTrigger value="metadata">Metadata</TabsTrigger>
        </TabsList>

        <TabsContent value="details" className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-500">Reference</label>
              <p className="font-mono">{transaction.reference}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Status</label>
              <div className="flex items-center space-x-2 mt-1">
                {getStatusIcon(transaction.status)}
                <Badge className={getStatusBadge(transaction.status)}>
                  {transaction.status}
                </Badge>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Amount</label>
              <p className="text-lg font-bold">${transaction.amount.toFixed(2)} {transaction.currency}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Service Fee</label>
              <p className="text-lg font-medium">$0.75</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Vendor</label>
              <p>{transaction.vendorName}</p>
              <p className="text-sm text-gray-500">{transaction.vendorId}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Customer</label>
              <p>{transaction.customerName}</p>
              <p className="text-sm text-gray-500">{transaction.customerId}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Date & Time</label>
              <p>{new Date(transaction.timestamp).toLocaleString()}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Transaction Type</label>
              <Badge className={getTypeBadge(transaction.type)}>
                {transaction.type}
              </Badge>
            </div>
          </div>

          {transaction.metadata.meterNumber && (
            <div className="border-t pt-4">
              <h4 className="font-medium mb-2">Service Details</h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">Meter Number</label>
                  <p className="font-mono">{transaction.metadata.meterNumber}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Units</label>
                  <p>{transaction.metadata.units} kWh</p>
                </div>
                <div className="col-span-2">
                  <label className="text-sm font-medium text-gray-500">Token Number</label>
                  <p className="font-mono text-lg">{transaction.metadata.tokenNumber}</p>
                </div>
              </div>
            </div>
          )}
        </TabsContent>

        <TabsContent value="timeline">
          <div className="space-y-4">
            <h4 className="font-medium">Transaction Timeline</h4>
            <ScrollArea className="h-64">
              <div className="space-y-3">
                {timeline.map((event, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{event.event}</p>
                      <p className="text-xs text-gray-500">{event.time}</p>
                    </div>
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
        </TabsContent>

        <TabsContent value="metadata">
          <div className="space-y-4">
            <h4 className="font-medium">Raw Transaction Data</h4>
            <pre className="bg-gray-50 p-4 rounded-lg text-xs overflow-auto">
              {JSON.stringify(transaction, null, 2)}
            </pre>
          </div>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end space-x-3 pt-4 border-t">
        <Button variant="outline" size="sm">
          Export Transaction
        </Button>
        {transaction.status === 'success' && (
          <Button variant="outline" size="sm" className="text-red-600">
            Process Refund
          </Button>
        )}
      </div>
    </div>
  )
}