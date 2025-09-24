'use client'

import { useState } from 'react'
import { Plus, Search, Filter, Download, MoreHorizontal } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'

// Mock data - would come from API
const vendors = [
  {
    id: 'V-001',
    businessName: 'ABC Store Harare',
    type: 'vendor',
    status: 'active',
    balance: 1250.00,
    commissionRate: 2.5,
    contactPerson: 'John Mukamuri',
    phone: '+263 77 123 4567',
    email: 'john@abcstore.co.zw',
    address: '123 First Street, Harare',
    createdAt: '2024-01-15'
  },
  {
    id: 'V-002',
    businessName: 'XYZ Mart Bulawayo',
    type: 'agent',
    status: 'active',
    balance: 850.00,
    commissionRate: 3.0,
    contactPerson: 'Mary Ncube',
    phone: '+263 78 234 5678',
    email: 'mary@xyzmart.co.zw',
    address: '456 Second Avenue, Bulawayo',
    createdAt: '2024-01-10'
  },
  {
    id: 'V-003',
    businessName: 'Mutare Electronics',
    type: 'vendor',
    status: 'suspended',
    balance: 2100.00,
    commissionRate: 2.0,
    contactPerson: 'Peter Majoni',
    phone: '+263 79 345 6789',
    email: 'peter@mutareelectronics.co.zw',
    address: '789 Third Road, Mutare',
    createdAt: '2024-01-05'
  }
]

const getStatusBadge = (status: string) => {
  const variants = {
    active: 'bg-green-100 text-green-800',
    suspended: 'bg-red-100 text-red-800',
    pending: 'bg-yellow-100 text-yellow-800'
  }
  return variants[status as keyof typeof variants] || variants.pending
}

const getTypeBadge = (type: string) => {
  const variants = {
    vendor: 'bg-blue-100 text-blue-800',
    agent: 'bg-purple-100 text-purple-800',
    aggregator: 'bg-orange-100 text-orange-800'
  }
  return variants[type as keyof typeof variants] || variants.vendor
}

export default function VendorsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [typeFilter, setTypeFilter] = useState('all')
  const [isAddVendorOpen, setIsAddVendorOpen] = useState(false)

  const filteredVendors = vendors.filter(vendor => {
    const matchesSearch = vendor.businessName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         vendor.contactPerson.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         vendor.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || vendor.status === statusFilter
    const matchesType = typeFilter === 'all' || vendor.type === typeFilter

    return matchesSearch && matchesStatus && matchesType
  })

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Vendor Management</h1>
          <p className="text-gray-500">Manage and monitor all registered vendors</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Dialog open={isAddVendorOpen} onOpenChange={setIsAddVendorOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Vendor
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Add New Vendor</DialogTitle>
                <DialogDescription>
                  Create a new vendor account with business and contact information
                </DialogDescription>
              </DialogHeader>
              <AddVendorForm onClose={() => setIsAddVendorOpen(false)} />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Vendors</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{vendors.length}</div>
            <p className="text-xs text-muted-foreground">+12% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Active Vendors</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {vendors.filter(v => v.status === 'active').length}
            </div>
            <p className="text-xs text-muted-foreground">89% of total</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Balance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${vendors.reduce((sum, v) => sum + v.balance, 0).toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">Across all vendors</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Avg Commission</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {(vendors.reduce((sum, v) => sum + v.commissionRate, 0) / vendors.length).toFixed(1)}%
            </div>
            <p className="text-xs text-muted-foreground">Average rate</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search vendors, contact person, or vendor ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="suspended">Suspended</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
              </SelectContent>
            </Select>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="vendor">Vendor</SelectItem>
                <SelectItem value="agent">Agent</SelectItem>
                <SelectItem value="aggregator">Aggregator</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Vendors Table */}
      <Card>
        <CardHeader>
          <CardTitle>Vendors ({filteredVendors.length})</CardTitle>
          <CardDescription>Manage vendor accounts and monitor their performance</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Vendor ID</TableHead>
                  <TableHead>Business Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Balance</TableHead>
                  <TableHead>Commission</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredVendors.map((vendor) => (
                  <TableRow key={vendor.id}>
                    <TableCell className="font-medium">{vendor.id}</TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{vendor.businessName}</div>
                        <div className="text-sm text-gray-500">{vendor.contactPerson}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getTypeBadge(vendor.type)}>
                        {vendor.type}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div>{vendor.phone}</div>
                        <div className="text-gray-500">{vendor.email}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className={vendor.balance < 1000 ? 'text-orange-600 font-medium' : 'text-green-600 font-medium'}>
                        ${vendor.balance.toLocaleString()}
                      </span>
                    </TableCell>
                    <TableCell>{vendor.commissionRate}%</TableCell>
                    <TableCell>
                      <Badge className={getStatusBadge(vendor.status)}>
                        {vendor.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>View Details</DropdownMenuItem>
                          <DropdownMenuItem>Edit Vendor</DropdownMenuItem>
                          <DropdownMenuItem>Transaction History</DropdownMenuItem>
                          <DropdownMenuItem>Top-up Balance</DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">
                            Suspend Vendor
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
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

function AddVendorForm({ onClose }: { onClose: () => void }) {
  const [formData, setFormData] = useState({
    businessName: '',
    registrationNo: '',
    taxId: '',
    vendorType: '',
    contactPerson: '',
    phone: '',
    email: '',
    address: '',
    commissionRate: '',
    creditLimit: '',
    autoTopup: false,
    autoTopupThreshold: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log('Vendor data:', formData)
    onClose()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Business Information */}
      <div>
        <h3 className="text-lg font-medium mb-4">Business Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="businessName">Business Name *</Label>
            <Input
              id="businessName"
              value={formData.businessName}
              onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
              required
            />
          </div>
          <div>
            <Label htmlFor="registrationNo">Registration No. *</Label>
            <Input
              id="registrationNo"
              value={formData.registrationNo}
              onChange={(e) => setFormData({ ...formData, registrationNo: e.target.value })}
              required
            />
          </div>
          <div>
            <Label htmlFor="taxId">Tax ID (ZIMRA) *</Label>
            <Input
              id="taxId"
              value={formData.taxId}
              onChange={(e) => setFormData({ ...formData, taxId: e.target.value })}
              required
            />
          </div>
          <div>
            <Label htmlFor="vendorType">Vendor Type *</Label>
            <Select
              value={formData.vendorType}
              onValueChange={(value) => setFormData({ ...formData, vendorType: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="vendor">Vendor</SelectItem>
                <SelectItem value="agent">Agent</SelectItem>
                <SelectItem value="aggregator">Aggregator</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <div>
        <h3 className="text-lg font-medium mb-4">Contact Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="contactPerson">Contact Person *</Label>
            <Input
              id="contactPerson"
              value={formData.contactPerson}
              onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
              required
            />
          </div>
          <div>
            <Label htmlFor="phone">Phone Number *</Label>
            <Input
              id="phone"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="+263 77 123 4567"
              required
            />
          </div>
        </div>
        <div className="mt-4">
          <Label htmlFor="email">Email Address *</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
        </div>
        <div className="mt-4">
          <Label htmlFor="address">Physical Address *</Label>
          <Textarea
            id="address"
            value={formData.address}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            rows={3}
            required
          />
        </div>
      </div>

      {/* Financial Settings */}
      <div>
        <h3 className="text-lg font-medium mb-4">Financial Settings</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="commissionRate">Commission Rate (%)</Label>
            <Input
              id="commissionRate"
              type="number"
              step="0.1"
              value={formData.commissionRate}
              onChange={(e) => setFormData({ ...formData, commissionRate: e.target.value })}
              placeholder="2.5"
            />
          </div>
          <div>
            <Label htmlFor="creditLimit">Credit Limit ($)</Label>
            <Input
              id="creditLimit"
              type="number"
              value={formData.creditLimit}
              onChange={(e) => setFormData({ ...formData, creditLimit: e.target.value })}
              placeholder="5000"
            />
          </div>
        </div>
        <div className="mt-4 flex items-center space-x-2">
          <Checkbox
            id="autoTopup"
            checked={formData.autoTopup}
            onCheckedChange={(checked) => setFormData({ ...formData, autoTopup: !!checked })}
          />
          <Label htmlFor="autoTopup">Enable auto top-up when balance falls below:</Label>
          {formData.autoTopup && (
            <Input
              type="number"
              value={formData.autoTopupThreshold}
              onChange={(e) => setFormData({ ...formData, autoTopupThreshold: e.target.value })}
              placeholder="1000"
              className="w-24"
            />
          )}
        </div>
      </div>

      {/* Form Actions */}
      <div className="flex justify-end space-x-3 pt-6 border-t">
        <Button type="button" variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit">
          Save Vendor
        </Button>
      </div>
    </form>
  )
}