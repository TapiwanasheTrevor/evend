'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { 
  AlertTriangle, 
  Search, 
  RefreshCw, 
  Download, 
  Eye, 
  RotateCcw,
  XCircle,
  Clock,
  DollarSign
} from 'lucide-react'

// Mock data for failed transactions
const failedTransactions = [
  {
    id: 'TXN-F001',
    reference: 'REF-789456123',
    timestamp: '2024-01-15 14:30:25',
    vendor: 'ABC Store Harare',
    vendorId: 'V-001',
    customer: '+263 77 123 4567',
    service: 'Electricity Token',
    amount: 25.00,
    failureReason: 'Insufficient vendor balance',
    errorCode: 'ERR_INSUFFICIENT_FUNDS',
    retryCount: 2,
    status: 'failed',
    canRetry: true
  },
  {
    id: 'TXN-F002',
    reference: 'REF-789456124',
    timestamp: '2024-01-15 14:25:10',
    vendor: 'XYZ Mart Bulawayo',
    vendorId: 'V-002',
    customer: '+263 78 234 5678',
    service: 'Airtime Top-up',
    amount: 10.00,
    failureReason: 'Network timeout',
    errorCode: 'ERR_NETWORK_TIMEOUT',
    retryCount: 3,
    status: 'failed',
    canRetry: true
  },
  {
    id: 'TXN-F003',
    reference: 'REF-789456125',
    timestamp: '2024-01-15 14:20:45',
    vendor: 'Quick Pay Mutare',
    vendorId: 'V-003',
    customer: '+263 71 345 6789',
    service: 'Data Bundle',
    amount: 5.00,
    failureReason: 'Invalid customer number',
    errorCode: 'ERR_INVALID_CUSTOMER',
    retryCount: 1,
    status: 'failed',
    canRetry: false
  }
]

export default function FailedTransactionsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [serviceFilter, setServiceFilter] = useState('all')

  const filteredTransactions = failedTransactions.filter(transaction => {
    const matchesSearch = transaction.reference.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.vendor.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.customer.includes(searchTerm)
    
    const matchesStatus = statusFilter === 'all' || transaction.status === statusFilter
    const matchesService = serviceFilter === 'all' || transaction.service === serviceFilter
    
    return matchesSearch && matchesStatus && matchesService
  })

  const getFailureReasonColor = (reason: string) => {
    if (reason.includes('balance')) return 'bg-red-100 text-red-800'
    if (reason.includes('timeout')) return 'bg-yellow-100 text-yellow-800'
    if (reason.includes('invalid')) return 'bg-orange-100 text-orange-800'
    return 'bg-gray-100 text-gray-800'
  }

  const handleRetry = (transactionId: string) => {
    console.log('Retrying transaction:', transactionId)
    // TODO: Implement retry logic
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center space-x-2">
            <XCircle className="h-6 w-6 text-red-600" />
            <span>Failed Transactions</span>
          </h1>
          <p className="text-gray-500">Monitor and manage failed transaction attempts</p>
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
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <XCircle className="h-4 w-4 mr-2 text-red-600" />
              Total Failed
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{failedTransactions.length}</div>
            <p className="text-xs text-gray-500">Last 24 hours</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <DollarSign className="h-4 w-4 mr-2 text-orange-600" />
              Failed Amount
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">
              ${failedTransactions.reduce((sum, t) => sum + t.amount, 0).toFixed(2)}
            </div>
            <p className="text-xs text-gray-500">Total value</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <RotateCcw className="h-4 w-4 mr-2 text-blue-600" />
              Can Retry
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {failedTransactions.filter(t => t.canRetry).length}
            </div>
            <p className="text-xs text-gray-500">Eligible for retry</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <Clock className="h-4 w-4 mr-2 text-purple-600" />
              Avg Retry Count
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">
              {(failedTransactions.reduce((sum, t) => sum + t.retryCount, 0) / failedTransactions.length).toFixed(1)}
            </div>
            <p className="text-xs text-gray-500">Average attempts</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filter Failed Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search transactions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
                <SelectItem value="timeout">Timeout</SelectItem>
              </SelectContent>
            </Select>

            <Select value={serviceFilter} onValueChange={setServiceFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by service" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Services</SelectItem>
                <SelectItem value="Electricity Token">Electricity Token</SelectItem>
                <SelectItem value="Airtime Top-up">Airtime Top-up</SelectItem>
                <SelectItem value="Data Bundle">Data Bundle</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline" onClick={() => {
              setSearchTerm('')
              setStatusFilter('all')
              setServiceFilter('all')
            }}>
              Clear Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Failed Transactions Table */}
      <Card>
        <CardHeader>
          <CardTitle>Failed Transactions ({filteredTransactions.length})</CardTitle>
          <CardDescription>Detailed view of failed transaction attempts</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Reference</TableHead>
                  <TableHead>DateTime</TableHead>
                  <TableHead>Vendor</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Service</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Failure Reason</TableHead>
                  <TableHead>Retry Count</TableHead>
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
                    <TableCell className="font-mono text-sm">{transaction.timestamp}</TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{transaction.vendor}</div>
                        <div className="text-xs text-gray-500">{transaction.vendorId}</div>
                      </div>
                    </TableCell>
                    <TableCell className="font-mono">{transaction.customer}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{transaction.service}</Badge>
                    </TableCell>
                    <TableCell className="font-medium">${transaction.amount.toFixed(2)}</TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <Badge className={getFailureReasonColor(transaction.failureReason)}>
                          {transaction.failureReason}
                        </Badge>
                        <div className="text-xs text-gray-500 font-mono">{transaction.errorCode}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <span className="font-medium">{transaction.retryCount}</span>
                        {transaction.retryCount >= 3 && (
                          <AlertTriangle className="h-4 w-4 text-yellow-600" />
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        {transaction.canRetry && (
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleRetry(transaction.id)}
                          >
                            <RotateCcw className="h-4 w-4 mr-1" />
                            Retry
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
    </div>
  )
}
