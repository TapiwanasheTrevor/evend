'use client'

import { useState } from 'react'
import { Save, RefreshCw, Shield, Key, Bell, DollarSign, Zap, Users, Database, Server } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

const commissionRates = [
  { service: 'Electricity Tokens', rate: 2.5, minRate: 1.0, maxRate: 5.0 },
  { service: 'Water Payments', rate: 2.0, minRate: 1.0, maxRate: 4.0 },
  { service: 'Gas Payments', rate: 3.0, minRate: 1.5, maxRate: 5.0 },
  { service: 'Wallet Top-ups', rate: 1.5, minRate: 0.5, maxRate: 3.0 }
]

const transactionLimits = [
  { type: 'Single Transaction', min: 1, max: 1000, current: 500 },
  { type: 'Daily Vendor Limit', min: 100, max: 10000, current: 5000 },
  { type: 'Monthly Vendor Limit', min: 1000, max: 100000, current: 50000 },
  { type: 'System Daily Limit', min: 10000, max: 1000000, current: 100000 }
]

const apiEndpoints = [
  { name: 'Authentication API', status: 'healthy', uptime: '99.9%', responseTime: '120ms' },
  { name: 'Transaction Processing', status: 'healthy', uptime: '99.8%', responseTime: '340ms' },
  { name: 'Vendor Management', status: 'warning', uptime: '98.5%', responseTime: '890ms' },
  { name: 'Wallet Services', status: 'healthy', uptime: '99.9%', responseTime: '200ms' },
  { name: 'Reporting Engine', status: 'healthy', uptime: '99.7%', responseTime: '650ms' }
]

export default function SettingsPage() {
  const [generalSettings, setGeneralSettings] = useState({
    systemName: 'E-Vend Admin Portal',
    companyName: 'Powertel Communications',
    defaultCurrency: 'USD',
    timezone: 'Africa/Harare',
    language: 'en',
    sessionTimeout: '30',
    enableMaintenance: false,
    maintenanceMessage: ''
  })

  const [notificationSettings, setNotificationSettings] = useState({
    emailEnabled: true,
    smsEnabled: true,
    systemAlerts: true,
    transactionAlerts: true,
    lowBalanceAlerts: true,
    vendorAlerts: true,
    securityAlerts: true,
    emailRecipients: 'admin@powertel.co.zw, ops@powertel.co.zw'
  })

  const [securitySettings, setSecuritySettings] = useState({
    enableTwoFactor: true,
    passwordMinLength: '8',
    passwordComplexity: true,
    sessionSecurity: true,
    ipWhitelist: '',
    auditLogging: true,
    encryptionLevel: 'AES-256'
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy': return 'bg-green-100 text-green-800'
      case 'warning': return 'bg-yellow-100 text-yellow-800'
      case 'error': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">System Configuration</h1>
          <p className="text-gray-500">Manage system settings, security, and operational parameters</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Reset to Defaults
          </Button>
          <Button>
            <Save className="h-4 w-4 mr-2" />
            Save All Changes
          </Button>
        </div>
      </div>

      {/* Configuration Tabs */}
      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="commission">Commission</TabsTrigger>
          <TabsTrigger value="limits">Limits</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="system">System Health</TabsTrigger>
        </TabsList>

        {/* General Settings */}
        <TabsContent value="general" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Server className="h-5 w-5 mr-2" />
                General System Settings
              </CardTitle>
              <CardDescription>
                Basic configuration settings for the E-Vend system
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="systemName">System Name</Label>
                    <Input
                      id="systemName"
                      value={generalSettings.systemName}
                      onChange={(e) => setGeneralSettings({ ...generalSettings, systemName: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="companyName">Company Name</Label>
                    <Input
                      id="companyName"
                      value={generalSettings.companyName}
                      onChange={(e) => setGeneralSettings({ ...generalSettings, companyName: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="defaultCurrency">Default Currency</Label>
                    <Select
                      value={generalSettings.defaultCurrency}
                      onValueChange={(value) => setGeneralSettings({ ...generalSettings, defaultCurrency: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="USD">US Dollar (USD)</SelectItem>
                        <SelectItem value="ZWG">Zimbabwe Gold (ZWG)</SelectItem>
                        <SelectItem value="ZAR">South African Rand (ZAR)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="timezone">System Timezone</Label>
                    <Select
                      value={generalSettings.timezone}
                      onValueChange={(value) => setGeneralSettings({ ...generalSettings, timezone: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Africa/Harare">Africa/Harare (CAT)</SelectItem>
                        <SelectItem value="Africa/Johannesburg">Africa/Johannesburg (SAST)</SelectItem>
                        <SelectItem value="UTC">UTC</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="language">Default Language</Label>
                    <Select
                      value={generalSettings.language}
                      onValueChange={(value) => setGeneralSettings({ ...generalSettings, language: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="sn">Shona</SelectItem>
                        <SelectItem value="nd">Ndebele</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
                    <Input
                      id="sessionTimeout"
                      type="number"
                      value={generalSettings.sessionTimeout}
                      onChange={(e) => setGeneralSettings({ ...generalSettings, sessionTimeout: e.target.value })}
                    />
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="text-lg font-medium mb-4">Maintenance Mode</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="enableMaintenance"
                      checked={generalSettings.enableMaintenance}
                      onCheckedChange={(checked) => setGeneralSettings({ ...generalSettings, enableMaintenance: checked })}
                    />
                    <Label htmlFor="enableMaintenance">Enable Maintenance Mode</Label>
                  </div>
                  <div>
                    <Label htmlFor="maintenanceMessage">Maintenance Message</Label>
                    <Textarea
                      id="maintenanceMessage"
                      placeholder="System is currently under maintenance. Please try again later."
                      value={generalSettings.maintenanceMessage}
                      onChange={(e) => setGeneralSettings({ ...generalSettings, maintenanceMessage: e.target.value })}
                      rows={3}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Commission Rates */}
        <TabsContent value="commission" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <DollarSign className="h-5 w-5 mr-2" />
                Commission Rate Management
              </CardTitle>
              <CardDescription>
                Configure commission rates for different services and vendor types
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Service Type</TableHead>
                      <TableHead>Current Rate (%)</TableHead>
                      <TableHead>Min Rate (%)</TableHead>
                      <TableHead>Max Rate (%)</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {commissionRates.map((item) => (
                      <TableRow key={item.service}>
                        <TableCell className="font-medium">{item.service}</TableCell>
                        <TableCell>
                          <Input
                            type="number"
                            step="0.1"
                            value={item.rate}
                            className="w-20"
                            min={item.minRate}
                            max={item.maxRate}
                          />
                        </TableCell>
                        <TableCell>{item.minRate}%</TableCell>
                        <TableCell>{item.maxRate}%</TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm">
                            Update
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Vendor Tier Commission Structure</CardTitle>
              <CardDescription>
                Different commission rates based on vendor performance tiers
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="border rounded-lg p-4">
                  <h3 className="font-medium mb-2">Bronze Tier</h3>
                  <p className="text-sm text-gray-500 mb-3">0 - $10,000 monthly volume</p>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Electricity</span>
                      <span className="font-medium">3.0%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Water</span>
                      <span className="font-medium">2.5%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Gas</span>
                      <span className="font-medium">3.5%</span>
                    </div>
                  </div>
                </div>
                <div className="border rounded-lg p-4">
                  <h3 className="font-medium mb-2">Silver Tier</h3>
                  <p className="text-sm text-gray-500 mb-3">$10,001 - $50,000 monthly volume</p>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Electricity</span>
                      <span className="font-medium">2.5%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Water</span>
                      <span className="font-medium">2.0%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Gas</span>
                      <span className="font-medium">3.0%</span>
                    </div>
                  </div>
                </div>
                <div className="border rounded-lg p-4">
                  <h3 className="font-medium mb-2">Gold Tier</h3>
                  <p className="text-sm text-gray-500 mb-3">$50,001+ monthly volume</p>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Electricity</span>
                      <span className="font-medium">2.0%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Water</span>
                      <span className="font-medium">1.5%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Gas</span>
                      <span className="font-medium">2.5%</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Transaction Limits */}
        <TabsContent value="limits" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Zap className="h-5 w-5 mr-2" />
                Transaction Limits Configuration
              </CardTitle>
              <CardDescription>
                Set transaction limits to manage risk and comply with regulations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Limit Type</TableHead>
                      <TableHead>Current Limit ($)</TableHead>
                      <TableHead>Minimum ($)</TableHead>
                      <TableHead>Maximum ($)</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {transactionLimits.map((limit) => (
                      <TableRow key={limit.type}>
                        <TableCell className="font-medium">{limit.type}</TableCell>
                        <TableCell>
                          <Input
                            type="number"
                            value={limit.current}
                            className="w-32"
                            min={limit.min}
                            max={limit.max}
                          />
                        </TableCell>
                        <TableCell>${limit.min.toLocaleString()}</TableCell>
                        <TableCell>${limit.max.toLocaleString()}</TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm">
                            Update
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Service-Specific Limits</CardTitle>
                <CardDescription>Configure limits per service type</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Electricity Token Limits</Label>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    <Input placeholder="Min: $1" />
                    <Input placeholder="Max: $500" />
                  </div>
                </div>
                <div>
                  <Label>Water Payment Limits</Label>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    <Input placeholder="Min: $1" />
                    <Input placeholder="Max: $300" />
                  </div>
                </div>
                <div>
                  <Label>Gas Payment Limits</Label>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    <Input placeholder="Min: $5" />
                    <Input placeholder="Max: $200" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Risk Management</CardTitle>
                <CardDescription>Automated risk controls and alerts</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>Enable Velocity Checking</Label>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label>Block Suspicious Patterns</Label>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label>Auto-suspend High Risk Vendors</Label>
                  <Switch />
                </div>
                <div>
                  <Label>Suspicious Activity Threshold</Label>
                  <Select defaultValue="5">
                    <SelectTrigger className="mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="3">3 failed attempts</SelectItem>
                      <SelectItem value="5">5 failed attempts</SelectItem>
                      <SelectItem value="10">10 failed attempts</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Notifications */}
        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Bell className="h-5 w-5 mr-2" />
                Notification Preferences
              </CardTitle>
              <CardDescription>
                Configure how and when the system sends notifications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-medium">Notification Channels</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label>Email Notifications</Label>
                      <Switch
                        checked={notificationSettings.emailEnabled}
                        onCheckedChange={(checked) => setNotificationSettings({ ...notificationSettings, emailEnabled: checked })}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label>SMS Notifications</Label>
                      <Switch
                        checked={notificationSettings.smsEnabled}
                        onCheckedChange={(checked) => setNotificationSettings({ ...notificationSettings, smsEnabled: checked })}
                      />
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="font-medium">Alert Types</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label>System Alerts</Label>
                      <Switch
                        checked={notificationSettings.systemAlerts}
                        onCheckedChange={(checked) => setNotificationSettings({ ...notificationSettings, systemAlerts: checked })}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label>Transaction Alerts</Label>
                      <Switch
                        checked={notificationSettings.transactionAlerts}
                        onCheckedChange={(checked) => setNotificationSettings({ ...notificationSettings, transactionAlerts: checked })}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label>Low Balance Alerts</Label>
                      <Switch
                        checked={notificationSettings.lowBalanceAlerts}
                        onCheckedChange={(checked) => setNotificationSettings({ ...notificationSettings, lowBalanceAlerts: checked })}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label>Security Alerts</Label>
                      <Switch
                        checked={notificationSettings.securityAlerts}
                        onCheckedChange={(checked) => setNotificationSettings({ ...notificationSettings, securityAlerts: checked })}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <Label htmlFor="emailRecipients">Email Recipients</Label>
                <Input
                  id="emailRecipients"
                  value={notificationSettings.emailRecipients}
                  onChange={(e) => setNotificationSettings({ ...notificationSettings, emailRecipients: e.target.value })}
                  placeholder="Enter email addresses separated by commas"
                  className="mt-2"
                />
                <p className="text-sm text-gray-500 mt-1">
                  Separate multiple email addresses with commas
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security */}
        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="h-5 w-5 mr-2" />
                Security Configuration
              </CardTitle>
              <CardDescription>
                Configure security policies and access controls
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-medium">Authentication Settings</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label>Two-Factor Authentication</Label>
                      <Switch
                        checked={securitySettings.enableTwoFactor}
                        onCheckedChange={(checked) => setSecuritySettings({ ...securitySettings, enableTwoFactor: checked })}
                      />
                    </div>
                    <div>
                      <Label>Password Minimum Length</Label>
                      <Input
                        type="number"
                        value={securitySettings.passwordMinLength}
                        onChange={(e) => setSecuritySettings({ ...securitySettings, passwordMinLength: e.target.value })}
                        min="6"
                        max="20"
                        className="mt-2"
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label>Require Complex Passwords</Label>
                      <Switch
                        checked={securitySettings.passwordComplexity}
                        onCheckedChange={(checked) => setSecuritySettings({ ...securitySettings, passwordComplexity: checked })}
                      />
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="font-medium">Session Security</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label>Enhanced Session Security</Label>
                      <Switch
                        checked={securitySettings.sessionSecurity}
                        onCheckedChange={(checked) => setSecuritySettings({ ...securitySettings, sessionSecurity: checked })}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label>Audit Logging</Label>
                      <Switch
                        checked={securitySettings.auditLogging}
                        onCheckedChange={(checked) => setSecuritySettings({ ...securitySettings, auditLogging: checked })}
                      />
                    </div>
                    <div>
                      <Label>Data Encryption</Label>
                      <Select
                        value={securitySettings.encryptionLevel}
                        onValueChange={(value) => setSecuritySettings({ ...securitySettings, encryptionLevel: value })}
                      >
                        <SelectTrigger className="mt-2">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="AES-128">AES-128</SelectItem>
                          <SelectItem value="AES-256">AES-256</SelectItem>
                          <SelectItem value="RSA-2048">RSA-2048</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <Label htmlFor="ipWhitelist">IP Address Whitelist</Label>
                <Textarea
                  id="ipWhitelist"
                  value={securitySettings.ipWhitelist}
                  onChange={(e) => setSecuritySettings({ ...securitySettings, ipWhitelist: e.target.value })}
                  placeholder="Enter IP addresses or ranges, one per line&#10;192.168.1.0/24&#10;10.0.0.0/8"
                  rows={4}
                  className="mt-2"
                />
                <p className="text-sm text-gray-500 mt-1">
                  Restrict admin access to specific IP addresses. Leave empty to allow all IPs.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Key className="h-5 w-5 mr-2" />
                API Keys Management
              </CardTitle>
              <CardDescription>
                Manage API keys for external integrations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">ZESA API Integration</h4>
                    <Badge className="bg-green-100 text-green-800">Active</Badge>
                  </div>
                  <p className="text-sm text-gray-500 mb-3">
                    API key for electricity token generation
                  </p>
                  <div className="flex items-center space-x-2">
                    <Input value="zesa_***************************" disabled className="font-mono text-sm" />
                    <Button variant="outline" size="sm">
                      Regenerate
                    </Button>
                  </div>
                </div>
                <div className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">Mobile Money Gateway</h4>
                    <Badge className="bg-green-100 text-green-800">Active</Badge>
                  </div>
                  <p className="text-sm text-gray-500 mb-3">
                    API key for EcoCash and OneMoney integration
                  </p>
                  <div className="flex items-center space-x-2">
                    <Input value="mm_***************************" disabled className="font-mono text-sm" />
                    <Button variant="outline" size="sm">
                      Regenerate
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* System Health */}
        <TabsContent value="system" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Database className="h-5 w-5 mr-2" />
                System Health & Performance
              </CardTitle>
              <CardDescription>
                Monitor system health and API endpoint status
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-green-600">99.8%</div>
                  <div className="text-sm text-gray-500">System Uptime</div>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">1.2s</div>
                  <div className="text-sm text-gray-500">Avg Response</div>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-orange-600">156</div>
                  <div className="text-sm text-gray-500">Active Sessions</div>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-red-600">3</div>
                  <div className="text-sm text-gray-500">System Alerts</div>
                </div>
              </div>

              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Service</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Uptime</TableHead>
                      <TableHead>Response Time</TableHead>
                      <TableHead>Last Check</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {apiEndpoints.map((endpoint) => (
                      <TableRow key={endpoint.name}>
                        <TableCell className="font-medium">{endpoint.name}</TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(endpoint.status)}>
                            {endpoint.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{endpoint.uptime}</TableCell>
                        <TableCell>{endpoint.responseTime}</TableCell>
                        <TableCell>2 minutes ago</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Database Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm">Connection Pool Usage</span>
                    <span className="font-medium">78%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Query Response Time</span>
                    <span className="font-medium">45ms</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Storage Usage</span>
                    <span className="font-medium">2.3GB / 10GB</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Last Backup</span>
                    <span className="font-medium">2 hours ago</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Server Resources</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm">CPU Usage</span>
                    <span className="font-medium">45%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Memory Usage</span>
                    <span className="font-medium">6.2GB / 16GB</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Disk I/O</span>
                    <span className="font-medium">Normal</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Network Latency</span>
                    <span className="font-medium">12ms</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}