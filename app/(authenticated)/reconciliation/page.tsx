'use client'

import { useState } from 'react'
import { Calendar, Download, RefreshCw, CheckCircle2, XCircle, AlertCircle, Clock, FileText, Calculator } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { Progress } from '@/components/ui/progress'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

// Mock data for reconciliation
const dailyReconciliation = [
  {
    date: '2024-01-12',
    status: 'completed',
    systemTransactions: 1234,
    systemAmount: 45230.50,
    bankTransactions: 1234,
    bankAmount: 45230.50,
    discrepancies: 0,
    variance: 0.00,
    processedBy: 'system',
    processedAt: '2024-01-13T02:00:00Z'
  },
  {
    date: '2024-01-11',
    status: 'completed',
    systemTransactions: 1156,
    systemAmount: 42180.75,
    bankTransactions: 1154,
    bankAmount: 42080.75,
    discrepancies: 2,
    variance: -100.00,
    processedBy: 'admin',
    processedAt: '2024-01-12T09:30:00Z'
  },
  {
    date: '2024-01-10',
    status: 'pending_review',
    systemTransactions: 987,
    systemAmount: 38450.25,
    bankTransactions: 985,
    bankAmount: 38350.25,
    discrepancies: 3,
    variance: -100.00,
    processedBy: null,
    processedAt: null
  }
]

const reconciliationExceptions = [
  {
    id: 'EXC-001',
    date: '2024-01-11',
    type: 'missing_bank_record',
    systemRef: 'TXN-20240111-001',
    bankRef: null,
    amount: 50.00,
    description: 'System transaction not found in bank records',
    status: 'investigating',
    assignedTo: 'finance_team',
    priority: 'high'
  },
  {
    id: 'EXC-002',
    date: '2024-01-11',
    type: 'amount_mismatch',
    systemRef: 'TXN-20240111-045',
    bankRef: 'BANK-REF-123456',
    amount: 25.00,
    description: 'Amount difference: System $75.00, Bank $50.00',
    status: 'resolved',
    assignedTo: 'ops_team',
    priority: 'medium'
  },
  {
    id: 'EXC-003',
    date: '2024-01-10',
    type: 'duplicate_bank_record',
    systemRef: 'TXN-20240110-089',
    bankRef: 'BANK-REF-789012',
    amount: 100.00,
    description: 'Duplicate transaction found in bank records',
    status: 'pending',
    assignedTo: null,
    priority: 'low'
  }
]

const vendorStatements = [
  {
    vendorId: 'V-001',
    vendorName: 'ABC Store Harare',
    period: '2024-01',
    totalTransactions: 342,
    totalAmount: 17100.00,
    commission: 427.50,
    netAmount: 16672.50,
    status: 'generated',
    generatedAt: '2024-01-05T10:00:00Z'
  },
  {
    vendorId: 'V-002',
    vendorName: 'XYZ Mart Bulawayo',
    period: '2024-01',
    totalTransactions: 289,
    totalAmount: 14450.00,
    commission: 361.25,
    netAmount: 14088.75,
    status: 'sent',
    generatedAt: '2024-01-05T10:05:00Z'
  },
  {
    vendorId: 'V-003',
    vendorName: 'Mutare Electronics',
    period: '2024-01',
    totalTransactions: 234,
    totalAmount: 11700.00,
    commission: 234.00,
    netAmount: 11466.00,
    status: 'draft',
    generatedAt: null
  }
]

export default function ReconciliationPage() {
  const [autoReconciliation, setAutoReconciliation] = useState(true)
  const [selectedPeriod, setSelectedPeriod] = useState('daily')
  const [reconciliationInProgress, setReconciliationInProgress] = useState(false)

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800'
      case 'pending_review': return 'bg-yellow-100 text-yellow-800'
      case 'failed': return 'bg-red-100 text-red-800'
      case 'in_progress': return 'bg-blue-100 text-blue-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getExceptionColor = (status: string) => {
    switch (status) {
      case 'resolved': return 'bg-green-100 text-green-800'
      case 'investigating': return 'bg-blue-100 text-blue-800'
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800'
      case 'medium': return 'bg-yellow-100 text-yellow-800'
      case 'low': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const runReconciliation = () => {
    setReconciliationInProgress(true)
    // Simulate reconciliation process
    setTimeout(() => {
      setReconciliationInProgress(false)
    }, 3000)
  }

  const totalVariance = dailyReconciliation.reduce((sum, record) => sum + record.variance, 0)
  const totalExceptions = reconciliationExceptions.length
  const unresolvedExceptions = reconciliationExceptions.filter(exc => exc.status !== 'resolved').length

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Reconciliation Management</h1>
          <p className="text-gray-500">Daily reconciliation and exception handling for financial accuracy</p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <Switch
              id="auto-reconciliation"
              checked={autoReconciliation}
              onCheckedChange={setAutoReconciliation}
            />
            <Label htmlFor="auto-reconciliation" className="text-sm">
              Auto Reconciliation
            </Label>
          </div>
          <Button
            onClick={runReconciliation}
            disabled={reconciliationInProgress}
            variant="outline"
            size="sm"
          >
            {reconciliationInProgress ? (
              <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <Calculator className="h-4 w-4 mr-2" />
            )}
            {reconciliationInProgress ? 'Processing...' : 'Run Reconciliation'}
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Today's Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-green-600">Balanced</div>
                <div className="text-sm text-gray-500">All transactions matched</div>
              </div>
              <CheckCircle2 className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Variance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <div className={`text-2xl font-bold ${totalVariance === 0 ? 'text-green-600' : 'text-red-600'}`}>
                  ${Math.abs(totalVariance).toFixed(2)}
                </div>
                <div className="text-sm text-gray-500">Last 7 days</div>
              </div>
              <AlertCircle className={`h-8 w-8 ${totalVariance === 0 ? 'text-green-500' : 'text-red-500'}`} />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Open Exceptions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-yellow-600">{unresolvedExceptions}</div>
                <div className="text-sm text-gray-500">Require attention</div>
              </div>
              <XCircle className="h-8 w-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Success Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-blue-600">98.5%</div>
                <div className="text-sm text-gray-500">Auto-match rate</div>
              </div>
              <Clock className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Reconciliation Progress */}
      {reconciliationInProgress && (
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-4">
              <RefreshCw className="h-6 w-6 animate-spin text-blue-500" />
              <div className="flex-1">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Running daily reconciliation...</span>
                  <span className="text-sm text-gray-500">Step 3 of 5</span>
                </div>
                <Progress value={60} className="h-2" />
                <div className="text-xs text-gray-500 mt-1">
                  Comparing transaction records with bank statements
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Main Content Tabs */}
      <Tabs defaultValue="daily" className="space-y-6">
        <TabsList>
          <TabsTrigger value="daily">Daily Reconciliation</TabsTrigger>
          <TabsTrigger value="exceptions">Exception Handling</TabsTrigger>
          <TabsTrigger value="statements">Vendor Statements</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="daily" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Daily Reconciliation History</CardTitle>
              <CardDescription>
                Daily comparison of system transactions with bank records
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>System Records</TableHead>
                      <TableHead>Bank Records</TableHead>
                      <TableHead>Discrepancies</TableHead>
                      <TableHead>Variance</TableHead>
                      <TableHead>Processed By</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {dailyReconciliation.map((record) => (
                      <TableRow key={record.date}>
                        <TableCell className="font-medium">
                          {new Date(record.date).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(record.status)}>
                            {record.status === 'completed' && <CheckCircle2 className="h-3 w-3 mr-1" />}
                            {record.status === 'pending_review' && <AlertCircle className="h-3 w-3 mr-1" />}
                            {record.status.replace('_', ' ')}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium">{record.systemTransactions} txns</div>
                            <div className="text-sm text-gray-500">${record.systemAmount.toLocaleString()}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium">{record.bankTransactions} txns</div>
                            <div className="text-sm text-gray-500">${record.bankAmount.toLocaleString()}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className={record.discrepancies === 0 ? 'text-green-600' : 'text-red-600'}>
                            {record.discrepancies}
                          </span>
                        </TableCell>
                        <TableCell>
                          <span className={`font-medium ${record.variance === 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {record.variance === 0 ? '$0.00' :
                             (record.variance > 0 ? '+' : '') + '$' + record.variance.toFixed(2)}
                          </span>
                        </TableCell>
                        <TableCell>
                          <div className="capitalize">
                            {record.processedBy || 'Pending'}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">
                              View Details
                            </Button>
                            {record.status === 'pending_review' && (
                              <Button size="sm">
                                Review
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

        <TabsContent value="exceptions" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Exception Management</CardTitle>
              <CardDescription>
                Handle reconciliation discrepancies and exceptions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4 flex justify-between items-center">
                <div className="flex space-x-4">
                  <Select defaultValue="all">
                    <SelectTrigger className="w-48">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Exceptions</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="investigating">Investigating</SelectItem>
                      <SelectItem value="resolved">Resolved</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select defaultValue="all">
                    <SelectTrigger className="w-48">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Priorities</SelectItem>
                      <SelectItem value="high">High Priority</SelectItem>
                      <SelectItem value="medium">Medium Priority</SelectItem>
                      <SelectItem value="low">Low Priority</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button>
                  <FileText className="h-4 w-4 mr-2" />
                  Bulk Actions
                </Button>
              </div>

              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Exception ID</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Priority</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Assigned To</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {reconciliationExceptions.map((exception) => (
                      <TableRow key={exception.id}>
                        <TableCell className="font-medium">{exception.id}</TableCell>
                        <TableCell>{new Date(exception.date).toLocaleDateString()}</TableCell>
                        <TableCell>
                          <span className="capitalize">
                            {exception.type.replace('_', ' ')}
                          </span>
                        </TableCell>
                        <TableCell className="font-medium">${exception.amount.toFixed(2)}</TableCell>
                        <TableCell className="max-w-xs truncate">
                          {exception.description}
                        </TableCell>
                        <TableCell>
                          <Badge className={getPriorityColor(exception.priority)}>
                            {exception.priority}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge className={getExceptionColor(exception.status)}>
                            {exception.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {exception.assignedTo ? (
                            <span className="capitalize">{exception.assignedTo.replace('_', ' ')}</span>
                          ) : (
                            <span className="text-gray-500">Unassigned</span>
                          )}
                        </TableCell>
                        <TableCell>
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="outline" size="sm">
                                Resolve
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Resolve Exception {exception.id}</DialogTitle>
                                <DialogDescription>
                                  Provide details on how this exception was resolved
                                </DialogDescription>
                              </DialogHeader>
                              <ExceptionResolutionForm exception={exception} />
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
        </TabsContent>

        <TabsContent value="statements" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Vendor Statements</CardTitle>
              <CardDescription>
                Generate and manage vendor reconciliation statements
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4 flex justify-between items-center">
                <Select defaultValue="2024-01">
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2024-01">January 2024</SelectItem>
                    <SelectItem value="2023-12">December 2023</SelectItem>
                    <SelectItem value="2023-11">November 2023</SelectItem>
                  </SelectContent>
                </Select>
                <div className="flex space-x-2">
                  <Button variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Export All
                  </Button>
                  <Button>
                    Generate Statements
                  </Button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Vendor</TableHead>
                      <TableHead>Period</TableHead>
                      <TableHead>Transactions</TableHead>
                      <TableHead>Total Amount</TableHead>
                      <TableHead>Commission</TableHead>
                      <TableHead>Net Amount</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {vendorStatements.map((statement) => (
                      <TableRow key={statement.vendorId}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{statement.vendorName}</div>
                            <div className="text-sm text-gray-500">{statement.vendorId}</div>
                          </div>
                        </TableCell>
                        <TableCell>{statement.period}</TableCell>
                        <TableCell>{statement.totalTransactions}</TableCell>
                        <TableCell className="font-medium">
                          ${statement.totalAmount.toLocaleString()}
                        </TableCell>
                        <TableCell className="text-orange-600">
                          ${statement.commission.toFixed(2)}
                        </TableCell>
                        <TableCell className="font-bold text-green-600">
                          ${statement.netAmount.toLocaleString()}
                        </TableCell>
                        <TableCell>
                          <Badge className={
                            statement.status === 'sent' ? 'bg-green-100 text-green-800' :
                            statement.status === 'generated' ? 'bg-blue-100 text-blue-800' :
                            'bg-gray-100 text-gray-800'
                          }>
                            {statement.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">
                              <Download className="h-4 w-4 mr-1" />
                              Download
                            </Button>
                            {statement.status === 'draft' && (
                              <Button size="sm">
                                Generate
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

        <TabsContent value="reports" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="cursor-pointer hover:shadow-md transition-shadow">
              <CardContent className="pt-6 text-center">
                <FileText className="h-8 w-8 mx-auto text-blue-500 mb-2" />
                <h3 className="font-medium mb-2">Daily Summary Report</h3>
                <p className="text-sm text-gray-500 mb-4">
                  Comprehensive daily reconciliation summary
                </p>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Generate Report
                </Button>
              </CardContent>
            </Card>

            <Card className="cursor-pointer hover:shadow-md transition-shadow">
              <CardContent className="pt-6 text-center">
                <Calculator className="h-8 w-8 mx-auto text-green-500 mb-2" />
                <h3 className="font-medium mb-2">Variance Analysis</h3>
                <p className="text-sm text-gray-500 mb-4">
                  Detailed analysis of reconciliation variances
                </p>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Generate Report
                </Button>
              </CardContent>
            </Card>

            <Card className="cursor-pointer hover:shadow-md transition-shadow">
              <CardContent className="pt-6 text-center">
                <AlertCircle className="h-8 w-8 mx-auto text-orange-500 mb-2" />
                <h3 className="font-medium mb-2">Exception Report</h3>
                <p className="text-sm text-gray-500 mb-4">
                  Summary of all exceptions and their resolutions
                </p>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Generate Report
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function ExceptionResolutionForm({ exception }: { exception: any }) {
  const [resolution, setResolution] = useState({
    action: '',
    notes: '',
    adjustmentAmount: '',
    approvedBy: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Exception resolution:', resolution)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="action">Resolution Action</Label>
        <Select
          value={resolution.action}
          onValueChange={(value) => setResolution({ ...resolution, action: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select action" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="manual_adjustment">Manual Adjustment</SelectItem>
            <SelectItem value="bank_error">Bank Record Error</SelectItem>
            <SelectItem value="system_correction">System Correction</SelectItem>
            <SelectItem value="vendor_notification">Notify Vendor</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="adjustmentAmount">Adjustment Amount (if applicable)</Label>
        <Input
          id="adjustmentAmount"
          type="number"
          step="0.01"
          value={resolution.adjustmentAmount}
          onChange={(e) => setResolution({ ...resolution, adjustmentAmount: e.target.value })}
          placeholder="0.00"
        />
      </div>
      <div>
        <Label htmlFor="notes">Resolution Notes</Label>
        <Textarea
          id="notes"
          value={resolution.notes}
          onChange={(e) => setResolution({ ...resolution, notes: e.target.value })}
          placeholder="Describe how this exception was resolved..."
          rows={4}
          required
        />
      </div>
      <div>
        <Label htmlFor="approvedBy">Approved By</Label>
        <Input
          id="approvedBy"
          value={resolution.approvedBy}
          onChange={(e) => setResolution({ ...resolution, approvedBy: e.target.value })}
          placeholder="Manager/Admin name"
          required
        />
      </div>
      <div className="flex justify-end space-x-3 pt-4 border-t">
        <Button type="button" variant="outline">
          Cancel
        </Button>
        <Button type="submit">
          Mark as Resolved
        </Button>
      </div>
    </form>
  )
}