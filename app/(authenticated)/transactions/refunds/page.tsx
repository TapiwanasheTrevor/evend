'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { 
  RotateCcw, 
  Search, 
  RefreshCw, 
  Download, 
  Eye, 
  CheckCircle,
  Clock,
  DollarSign,
  Plus
} from 'lucide-react'

// Mock data for refunds
const refunds = [
  {
    id: 'REF-001',
    originalTransactionId: 'TXN-789456',
    reference: 'REF-789456123',
    timestamp: '2024-01-15 15:30:25',
    processedDate: '2024-01-15 15:45:10',
    vendor: 'ABC Store Harare',
    vendorId: 'V-001',
    customer: '+263 77 123 4567',
    service: 'Electricity Token',
    originalAmount: 25.00,
    refundAmount: 25.00,
    reason: 'Customer request - duplicate payment',
    status: 'completed',
    processedBy: 'admin@powertel.co.zw',
    refundMethod: 'vendor_balance'
  },
  {
    id: 'REF-002',
    originalTransactionId: 'TXN-789457',
    reference: 'REF-789456124',
    timestamp: '2024-01-15 14:25:10',
    processedDate: null,
    vendor: 'XYZ Mart Bulawayo',
    vendorId: 'V-002',
    customer: '+263 78 234 5678',
    service: 'Airtime Top-up',
    originalAmount: 10.00,
    refundAmount: 10.00,
    reason: 'System error - failed to deliver service',
    status: 'pending',
    processedBy: null,
    refundMethod: 'customer_wallet'
  },
  {
    id: 'REF-003',
    originalTransactionId: 'TXN-789458',
    reference: 'REF-789456125',
    timestamp: '2024-01-15 13:20:45',
    processedDate: '2024-01-15 13:35:30',
    vendor: 'Quick Pay Mutare',
    vendorId: 'V-003',
    customer: '+263 71 345 6789',
    service: 'Data Bundle',
    originalAmount: 5.00,
    refundAmount: 5.00,
    reason: 'Vendor request - incorrect amount charged',
    status: 'completed',
    processedBy: 'operator@powertel.co.zw',
    refundMethod: 'bank_transfer'
  }
]

export default function RefundsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [serviceFilter, setServiceFilter] = useState('all')
  const [isNewRefundModalOpen, setIsNewRefundModalOpen] = useState(false)
  const [newRefund, setNewRefund] = useState({
    transactionId: '',
    refundAmount: '',
    reason: '',
    refundMethod: 'vendor_balance'
  })

  const filteredRefunds = refunds.filter(refund => {
    const matchesSearch = refund.reference.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         refund.vendor.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         refund.customer.includes(searchTerm) ||
                         refund.originalTransactionId.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = statusFilter === 'all' || refund.status === statusFilter
    const matchesService = serviceFilter === 'all' || refund.service === serviceFilter
    
    return matchesSearch && matchesStatus && matchesService
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800'
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'failed': return 'bg-red-100 text-red-800'
      case 'processing': return 'bg-blue-100 text-blue-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-4 w-4 text-green-600" />
      case 'pending': return <Clock className="h-4 w-4 text-yellow-600" />
      case 'processing': return <RotateCcw className="h-4 w-4 text-blue-600" />
      default: return <Clock className="h-4 w-4 text-gray-600" />
    }
  }

  const handleCreateRefund = () => {
    console.log('Creating refund:', newRefund)
    // TODO: Implement refund creation logic
    setIsNewRefundModalOpen(false)
    setNewRefund({
      transactionId: '',
      refundAmount: '',
      reason: '',
      refundMethod: 'vendor_balance'
    })
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center space-x-2">
            <RotateCcw className="h-6 w-6 text-blue-600" />
            <span>Refunds Management</span>
          </h1>
          <p className="text-gray-500">Process and track transaction refunds</p>
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
          <Dialog open={isNewRefundModalOpen} onOpenChange={setIsNewRefundModalOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                New Refund
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Process New Refund</DialogTitle>
                <DialogDescription>
                  Create a refund for a completed transaction
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="transactionId">Original Transaction ID</Label>
                  <Input
                    id="transactionId"
                    value={newRefund.transactionId}
                    onChange={(e) => setNewRefund(prev => ({ ...prev, transactionId: e.target.value }))}
                    placeholder="TXN-123456"
                  />
                </div>
                <div>
                  <Label htmlFor="refundAmount">Refund Amount ($)</Label>
                  <Input
                    id="refundAmount"
                    type="number"
                    step="0.01"
                    value={newRefund.refundAmount}
                    onChange={(e) => setNewRefund(prev => ({ ...prev, refundAmount: e.target.value }))}
                    placeholder="0.00"
                  />
                </div>
                <div>
                  <Label htmlFor="refundMethod">Refund Method</Label>
                  <Select
                    value={newRefund.refundMethod}
                    onValueChange={(value) => setNewRefund(prev => ({ ...prev, refundMethod: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="vendor_balance">Vendor Balance</SelectItem>
                      <SelectItem value="customer_wallet">Customer Wallet</SelectItem>
                      <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
                      <SelectItem value="mobile_money">Mobile Money</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="reason">Refund Reason</Label>
                  <Textarea
                    id="reason"
                    value={newRefund.reason}
                    onChange={(e) => setNewRefund(prev => ({ ...prev, reason: e.target.value }))}
                    placeholder="Describe the reason for this refund..."
                    rows={3}
                  />
                </div>
                <div className="flex justify-end space-x-3">
                  <Button variant="outline" onClick={() => setIsNewRefundModalOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleCreateRefund}>
                    Process Refund
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <RotateCcw className="h-4 w-4 mr-2 text-blue-600" />
              Total Refunds
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{refunds.length}</div>
            <p className="text-xs text-gray-500">All time</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <DollarSign className="h-4 w-4 mr-2 text-green-600" />
              Total Amount
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              ${refunds.reduce((sum, r) => sum + r.refundAmount, 0).toFixed(2)}
            </div>
            <p className="text-xs text-gray-500">Refunded amount</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <CheckCircle className="h-4 w-4 mr-2 text-green-600" />
              Completed
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {refunds.filter(r => r.status === 'completed').length}
            </div>
            <p className="text-xs text-gray-500">Successfully processed</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <Clock className="h-4 w-4 mr-2 text-yellow-600" />
              Pending
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">
              {refunds.filter(r => r.status === 'pending').length}
            </div>
            <p className="text-xs text-gray-500">Awaiting processing</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filter Refunds</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search refunds..."
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
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="processing">Processing</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
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

      {/* Refunds Table */}
      <Card>
        <CardHeader>
          <CardTitle>Refunds ({filteredRefunds.length})</CardTitle>
          <CardDescription>Complete refund transaction history</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Refund ID</TableHead>
                  <TableHead>Original Transaction</TableHead>
                  <TableHead>DateTime</TableHead>
                  <TableHead>Vendor</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Service</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Reason</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRefunds.map((refund) => (
                  <TableRow key={refund.id}>
                    <TableCell className="font-medium">
                      <div>
                        <div className="font-mono text-sm">{refund.id}</div>
                        <div className="text-xs text-gray-500">{refund.reference}</div>
                      </div>
                    </TableCell>
                    <TableCell className="font-mono text-sm">{refund.originalTransactionId}</TableCell>
                    <TableCell>
                      <div>
                        <div className="font-mono text-sm">{refund.timestamp}</div>
                        {refund.processedDate && (
                          <div className="text-xs text-gray-500">Processed: {refund.processedDate}</div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{refund.vendor}</div>
                        <div className="text-xs text-gray-500">{refund.vendorId}</div>
                      </div>
                    </TableCell>
                    <TableCell className="font-mono">{refund.customer}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{refund.service}</Badge>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">${refund.refundAmount.toFixed(2)}</div>
                        <div className="text-xs text-gray-500">of ${refund.originalAmount.toFixed(2)}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(refund.status)}
                        <Badge className={getStatusColor(refund.status)}>
                          {refund.status}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="max-w-xs truncate" title={refund.reason}>
                        {refund.reason}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
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
