'use client'

import { useState } from 'react'
import { Wallet, ArrowUpRight, ArrowDownLeft, RefreshCw, AlertTriangle, DollarSign, TrendingUp, TrendingDown, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Progress } from '@/components/ui/progress'
// Chart components removed to avoid TypeScript issues in production build

// Mock data
const systemWallets = [
  {
    id: 'main-usd',
    name: 'Main USD Wallet',
    currency: 'USD',
    balance: 125000.50,
    reserved: 15000.00,
    available: 110000.50,
    lowBalanceThreshold: 10000,
    status: 'healthy',
    lastTopUp: '2024-01-10T10:30:00Z'
  },
  {
    id: 'main-zwg',
    name: 'Main ZWG Wallet',
    currency: 'ZWG',
    balance: 2500000.00,
    reserved: 250000.00,
    available: 2250000.00,
    lowBalanceThreshold: 500000,
    status: 'healthy',
    lastTopUp: '2024-01-11T14:20:00Z'
  },
  {
    id: 'main-zar',
    name: 'Main ZAR Wallet',
    currency: 'ZAR',
    balance: 45000.75,
    reserved: 5000.00,
    available: 40000.75,
    lowBalanceThreshold: 10000,
    status: 'low',
    lastTopUp: '2024-01-08T09:15:00Z'
  }
]

const topUpRequests = [
  {
    id: 'TR-001',
    vendorId: 'V-001',
    vendorName: 'ABC Store Harare',
    amount: 5000,
    currency: 'USD',
    method: 'bank_transfer',
    status: 'pending',
    requestedAt: '2024-01-12T10:30:00Z',
    priority: 'high'
  },
  {
    id: 'TR-002',
    vendorId: 'V-003',
    vendorName: 'Mutare Electronics',
    amount: 2500,
    currency: 'USD',
    method: 'ecocash',
    status: 'approved',
    requestedAt: '2024-01-12T09:15:00Z',
    priority: 'medium'
  },
  {
    id: 'TR-003',
    vendorId: 'V-005',
    vendorName: 'Corner Shop Kwekwe',
    amount: 1000,
    currency: 'USD',
    method: 'cash_deposit',
    status: 'processing',
    requestedAt: '2024-01-12T08:45:00Z',
    priority: 'low'
  }
]

const walletTransactions = [
  {
    id: 'WT-001',
    type: 'credit',
    description: 'System top-up from bank',
    amount: 50000,
    currency: 'USD',
    balance: 125000.50,
    timestamp: '2024-01-12T10:30:00Z',
    reference: 'BANK-TOP-001'
  },
  {
    id: 'WT-002',
    type: 'debit',
    description: 'Vendor payout - ABC Store',
    amount: 2500,
    currency: 'USD',
    balance: 122500.50,
    timestamp: '2024-01-12T09:15:00Z',
    reference: 'PAYOUT-V001'
  }
]

const balanceHistory = [
  { date: '2024-01-01', usd: 120000, zwg: 2300000, zar: 42000 },
  { date: '2024-01-02', usd: 118500, zwg: 2280000, zar: 41500 },
  { date: '2024-01-03', usd: 122000, zwg: 2350000, zar: 43000 },
  { date: '2024-01-04', usd: 119000, zwg: 2320000, zar: 42500 },
  { date: '2024-01-05', usd: 125000, zwg: 2500000, zar: 45000 }
]

const floatDistribution = [
  { name: 'USD', value: 110000.50, color: '#10B981', percentage: 65 },
  { name: 'ZWG', value: 2250000, color: '#3B82F6', percentage: 25 },
  { name: 'ZAR', value: 40000.75, color: '#F59E0B', percentage: 10 }
]

export default function WalletsPage() {
  const [selectedWallet, setSelectedWallet] = useState(systemWallets[0])
  const [isTopUpModalOpen, setIsTopUpModalOpen] = useState(false)
  const [isTransferModalOpen, setIsTransferModalOpen] = useState(false)

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy': return 'text-green-600 bg-green-100'
      case 'low': return 'text-yellow-600 bg-yellow-100'
      case 'critical': return 'text-red-600 bg-red-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-100'
      case 'medium': return 'text-yellow-600 bg-yellow-100'
      case 'low': return 'text-green-600 bg-green-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getRequestStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'text-yellow-600 bg-yellow-100'
      case 'approved': return 'text-green-600 bg-green-100'
      case 'processing': return 'text-blue-600 bg-blue-100'
      case 'rejected': return 'text-red-600 bg-red-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const totalSystemBalance = systemWallets.reduce((sum, wallet) => {
    // Convert all to USD equivalent for display (simplified conversion)
    const usdEquivalent = wallet.currency === 'USD' ? wallet.balance :
                         wallet.currency === 'ZWG' ? wallet.balance / 1000 :
                         wallet.balance * 0.055 // ZAR to USD approximate
    return sum + usdEquivalent
  }, 0)

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Wallet Management</h1>
          <p className="text-gray-500">Monitor and manage system wallet balances and operations</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Dialog open={isTopUpModalOpen} onOpenChange={setIsTopUpModalOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                System Top-up
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>System Wallet Top-up</DialogTitle>
                <DialogDescription>
                  Add funds to the system wallet from external sources
                </DialogDescription>
              </DialogHeader>
              <SystemTopUpForm onClose={() => setIsTopUpModalOpen(false)} />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Wallet Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total System Balance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold">${totalSystemBalance.toLocaleString()}</div>
                <div className="flex items-center text-sm text-green-600">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  +5.2%
                </div>
              </div>
              <Wallet className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Available Balance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold">
                  ${systemWallets.reduce((sum, w) => sum + (w.currency === 'USD' ? w.available : w.available / 1000), 0).toLocaleString()}
                </div>
                <div className="text-sm text-gray-600">Ready for transactions</div>
              </div>
              <DollarSign className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Reserved Funds</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold">
                  ${systemWallets.reduce((sum, w) => sum + (w.currency === 'USD' ? w.reserved : w.reserved / 1000), 0).toLocaleString()}
                </div>
                <div className="text-sm text-gray-600">Pending transactions</div>
              </div>
              <ArrowUpRight className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Low Balance Alerts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-red-600">
                  {systemWallets.filter(w => w.status === 'low' || w.status === 'critical').length}
                </div>
                <div className="text-sm text-gray-600">Wallets need attention</div>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Wallet Overview</TabsTrigger>
          <TabsTrigger value="operations">Operations</TabsTrigger>
          <TabsTrigger value="history">Transaction History</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Individual Wallet Cards */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">System Wallets</h3>
              {systemWallets.map((wallet) => (
                <Card key={wallet.id} className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                          <span className="text-white font-bold text-sm">{wallet.currency}</span>
                        </div>
                        <div>
                          <h4 className="font-medium">{wallet.name}</h4>
                          <p className="text-sm text-gray-500">
                            Last top-up: {new Date(wallet.lastTopUp).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <Badge className={getStatusColor(wallet.status)}>
                        {wallet.status}
                      </Badge>
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Total Balance</span>
                        <span className="font-bold">
                          {wallet.currency} {wallet.balance.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Available</span>
                        <span className="font-medium text-green-600">
                          {wallet.currency} {wallet.available.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Reserved</span>
                        <span className="font-medium text-orange-600">
                          {wallet.currency} {wallet.reserved.toLocaleString()}
                        </span>
                      </div>

                      {/* Balance threshold indicator */}
                      <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span>Balance Health</span>
                          <span>{((wallet.available / wallet.lowBalanceThreshold) * 100).toFixed(0)}%</span>
                        </div>
                        <Progress
                          value={(wallet.available / wallet.lowBalanceThreshold) * 100}
                          className="h-2"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Float Distribution Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Float Distribution</CardTitle>
                <CardDescription>Available funds by currency</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 space-y-4">
                  <div className="text-sm text-gray-500 mb-4">Float Distribution by Currency</div>
                  {floatDistribution.map((item, index) => (
                    <div key={item.name} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-2">
                          <div
                            className="w-4 h-4 rounded-full"
                            style={{ backgroundColor: item.color }}
                          ></div>
                          <span className="text-sm font-medium">{item.name}</span>
                        </div>
                        <div className="text-right">
                          <span className="text-sm font-bold">${item.value.toLocaleString()}</span>
                          <span className="text-xs text-gray-500 ml-2">({item.percentage}%)</span>
                        </div>
                      </div>
                      <Progress
                        value={item.percentage}
                        className="h-2"
                      />
                    </div>
                  ))}
                </div>
                <div className="mt-4 space-y-2">
                  {floatDistribution.map((item) => (
                    <div key={item.name} className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-2">
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: item.color }}
                        ></div>
                        <span>{item.name}</span>
                      </div>
                      <span className="font-medium">{item.percentage}%</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="operations" className="space-y-6">
          {/* Top-up Requests Queue */}
          <Card>
            <CardHeader>
              <CardTitle>Top-up Requests Queue</CardTitle>
              <CardDescription>
                Pending vendor wallet top-up requests requiring approval
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Request ID</TableHead>
                      <TableHead>Vendor</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Method</TableHead>
                      <TableHead>Priority</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Requested</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {topUpRequests.map((request) => (
                      <TableRow key={request.id}>
                        <TableCell className="font-medium">{request.id}</TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium">{request.vendorName}</div>
                            <div className="text-sm text-gray-500">{request.vendorId}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className="font-medium">
                            {request.currency} {request.amount.toLocaleString()}
                          </span>
                        </TableCell>
                        <TableCell>
                          <span className="capitalize">{request.method.replace('_', ' ')}</span>
                        </TableCell>
                        <TableCell>
                          <Badge className={getPriorityColor(request.priority)}>
                            {request.priority}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge className={getRequestStatusColor(request.status)}>
                            {request.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {new Date(request.requestedAt).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button size="sm" variant="outline">
                              Approve
                            </Button>
                            <Button size="sm" variant="outline">
                              Reject
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="cursor-pointer hover:shadow-md transition-shadow">
              <CardContent className="pt-6 text-center">
                <ArrowUpRight className="h-8 w-8 mx-auto text-green-500 mb-2" />
                <h3 className="font-medium mb-2">Transfer Between Wallets</h3>
                <p className="text-sm text-gray-500 mb-4">Move funds between different currency wallets</p>
                <Dialog open={isTransferModalOpen} onOpenChange={setIsTransferModalOpen}>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm">
                      Initiate Transfer
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Inter-wallet Transfer</DialogTitle>
                      <DialogDescription>
                        Transfer funds between system wallets
                      </DialogDescription>
                    </DialogHeader>
                    <WalletTransferForm onClose={() => setIsTransferModalOpen(false)} />
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>

            <Card className="cursor-pointer hover:shadow-md transition-shadow">
              <CardContent className="pt-6 text-center">
                <RefreshCw className="h-8 w-8 mx-auto text-blue-500 mb-2" />
                <h3 className="font-medium mb-2">Currency Conversion</h3>
                <p className="text-sm text-gray-500 mb-4">Convert between USD, ZWG, and ZAR</p>
                <Button variant="outline" size="sm">
                  Convert Currency
                </Button>
              </CardContent>
            </Card>

            <Card className="cursor-pointer hover:shadow-md transition-shadow">
              <CardContent className="pt-6 text-center">
                <AlertTriangle className="h-8 w-8 mx-auto text-orange-500 mb-2" />
                <h3 className="font-medium mb-2">Set Low Balance Alerts</h3>
                <p className="text-sm text-gray-500 mb-4">Configure automatic alert thresholds</p>
                <Button variant="outline" size="sm">
                  Manage Alerts
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="history" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Wallet Transaction History</CardTitle>
              <CardDescription>Complete record of all wallet operations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Transaction ID</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Balance After</TableHead>
                      <TableHead>Reference</TableHead>
                      <TableHead>Timestamp</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {walletTransactions.map((transaction) => (
                      <TableRow key={transaction.id}>
                        <TableCell className="font-medium">{transaction.id}</TableCell>
                        <TableCell>
                          <Badge className={transaction.type === 'credit' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                            {transaction.type === 'credit' ? (
                              <ArrowDownLeft className="h-3 w-3 mr-1" />
                            ) : (
                              <ArrowUpRight className="h-3 w-3 mr-1" />
                            )}
                            {transaction.type}
                          </Badge>
                        </TableCell>
                        <TableCell>{transaction.description}</TableCell>
                        <TableCell>
                          <span className={transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'}>
                            {transaction.type === 'credit' ? '+' : '-'}
                            {transaction.currency} {transaction.amount.toLocaleString()}
                          </span>
                        </TableCell>
                        <TableCell className="font-medium">
                          {transaction.currency} {transaction.balance.toLocaleString()}
                        </TableCell>
                        <TableCell className="font-mono text-xs">{transaction.reference}</TableCell>
                        <TableCell>{new Date(transaction.timestamp).toLocaleString()}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Balance History Trend</CardTitle>
              <CardDescription>30-day wallet balance trends by currency</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80 space-y-4">
                <div className="text-sm text-gray-500 mb-4">Balance History (Last 7 Days)</div>
                {balanceHistory.slice(0, 7).map((data, index) => (
                  <div key={data.date} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">{data.date}</span>
                      <span className="text-sm text-gray-500">
                        Total: ${(data.usd + data.zwg + data.zar).toLocaleString()}
                      </span>
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <span className="text-xs w-12">USD</span>
                        <div className="flex-1">
                          <Progress value={(data.usd / 100000) * 100} className="h-2" />
                        </div>
                        <span className="text-xs w-20 text-right">${data.usd.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                        <span className="text-xs w-12">ZWG</span>
                        <div className="flex-1">
                          <Progress value={(data.zwg / 50000) * 100} className="h-2" />
                        </div>
                        <span className="text-xs w-20 text-right">${data.zwg.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                        <span className="text-xs w-12">ZAR</span>
                        <div className="flex-1">
                          <Progress value={(data.zar / 30000) * 100} className="h-2" />
                        </div>
                        <span className="text-xs w-20 text-right">${data.zar.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function SystemTopUpForm({ onClose }: { onClose: () => void }) {
  const [formData, setFormData] = useState({
    wallet: '',
    amount: '',
    source: '',
    reference: '',
    notes: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Top-up data:', formData)
    onClose()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="wallet">Target Wallet</Label>
        <Select value={formData.wallet} onValueChange={(value) => setFormData({ ...formData, wallet: value })}>
          <SelectTrigger>
            <SelectValue placeholder="Select wallet" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="main-usd">Main USD Wallet</SelectItem>
            <SelectItem value="main-zwg">Main ZWG Wallet</SelectItem>
            <SelectItem value="main-zar">Main ZAR Wallet</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="amount">Amount</Label>
        <Input
          id="amount"
          type="number"
          value={formData.amount}
          onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
          placeholder="Enter amount"
          required
        />
      </div>
      <div>
        <Label htmlFor="source">Funding Source</Label>
        <Select value={formData.source} onValueChange={(value) => setFormData({ ...formData, source: value })}>
          <SelectTrigger>
            <SelectValue placeholder="Select source" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
            <SelectItem value="cash_deposit">Cash Deposit</SelectItem>
            <SelectItem value="mobile_money">Mobile Money</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="reference">Reference Number</Label>
        <Input
          id="reference"
          value={formData.reference}
          onChange={(e) => setFormData({ ...formData, reference: e.target.value })}
          placeholder="Enter reference number"
          required
        />
      </div>
      <div>
        <Label htmlFor="notes">Notes (Optional)</Label>
        <Textarea
          id="notes"
          value={formData.notes}
          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
          placeholder="Additional notes..."
          rows={3}
        />
      </div>
      <div className="flex justify-end space-x-3 pt-4 border-t">
        <Button type="button" variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit">
          Process Top-up
        </Button>
      </div>
    </form>
  )
}

function WalletTransferForm({ onClose }: { onClose: () => void }) {
  const [formData, setFormData] = useState({
    fromWallet: '',
    toWallet: '',
    amount: '',
    notes: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Transfer data:', formData)
    onClose()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="fromWallet">From Wallet</Label>
        <Select value={formData.fromWallet} onValueChange={(value) => setFormData({ ...formData, fromWallet: value })}>
          <SelectTrigger>
            <SelectValue placeholder="Select source wallet" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="main-usd">Main USD Wallet</SelectItem>
            <SelectItem value="main-zwg">Main ZWG Wallet</SelectItem>
            <SelectItem value="main-zar">Main ZAR Wallet</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="toWallet">To Wallet</Label>
        <Select value={formData.toWallet} onValueChange={(value) => setFormData({ ...formData, toWallet: value })}>
          <SelectTrigger>
            <SelectValue placeholder="Select destination wallet" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="main-usd">Main USD Wallet</SelectItem>
            <SelectItem value="main-zwg">Main ZWG Wallet</SelectItem>
            <SelectItem value="main-zar">Main ZAR Wallet</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="amount">Amount</Label>
        <Input
          id="amount"
          type="number"
          value={formData.amount}
          onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
          placeholder="Enter transfer amount"
          required
        />
      </div>
      <div>
        <Label htmlFor="notes">Transfer Notes</Label>
        <Textarea
          id="notes"
          value={formData.notes}
          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
          placeholder="Reason for transfer..."
          rows={3}
        />
      </div>
      <div className="flex justify-end space-x-3 pt-4 border-t">
        <Button type="button" variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit">
          Execute Transfer
        </Button>
      </div>
    </form>
  )
}