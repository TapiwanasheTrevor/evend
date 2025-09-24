export interface Vendor {
  id: string
  businessName: string
  type: 'vendor' | 'agent' | 'aggregator'
  status: 'active' | 'suspended' | 'pending'
  balance: number
  commissionRate: number
  contactPerson: string
  phone: string
  email: string
  address: string
  createdAt: Date
  location: string
}

export interface Transaction {
  id: string
  reference: string
  type: 'token' | 'topup' | 'bill' | 'transfer'
  vendorId: string
  customerId: string
  amount: number
  currency: 'USD' | 'ZWG' | 'ZAR'
  status: 'success' | 'pending' | 'failed'
  service: 'electricity' | 'water' | 'gas'
  timestamp: Date
  metadata: {
    meterNumber?: string
    tokenNumber?: string
    units?: number
    accountNumber?: string
  }
  vendor?: Vendor
  customerName?: string
  vendorName?: string
}

export interface DashboardMetrics {
  revenue: {
    today: number
    yesterday: number
    change: number
  }
  transactions: {
    count: number
    volume: number
    avgValue: number
  }
  users: {
    active: number
    new: number
    total: number
  }
  system: {
    uptime: number
    health: 'healthy' | 'degraded' | 'down'
    lastCheck: Date
  }
}

export interface SystemWallet {
  id: string
  name: string
  currency: 'USD' | 'ZWG' | 'ZAR'
  balance: number
  reserved: number
  available: number
  lowBalanceThreshold: number
  status: 'healthy' | 'low' | 'critical'
  lastTopUp: string
}

export interface TopUpRequest {
  id: string
  vendorId: string
  vendorName: string
  amount: number
  currency: 'USD' | 'ZWG' | 'ZAR'
  method: 'bank_transfer' | 'ecocash' | 'cash_deposit' | 'mobile_money'
  status: 'pending' | 'approved' | 'processing' | 'rejected'
  requestedAt: string
  priority: 'high' | 'medium' | 'low'
}

export interface WalletTransaction {
  id: string
  type: 'credit' | 'debit'
  description: string
  amount: number
  currency: 'USD' | 'ZWG' | 'ZAR'
  balance: number
  timestamp: string
  reference: string
}

export interface ReconciliationRecord {
  date: string
  status: 'completed' | 'pending_review' | 'failed' | 'in_progress'
  systemTransactions: number
  systemAmount: number
  bankTransactions: number
  bankAmount: number
  discrepancies: number
  variance: number
  processedBy: string | null
  processedAt: string | null
}

export interface ReconciliationException {
  id: string
  date: string
  type: 'missing_bank_record' | 'amount_mismatch' | 'duplicate_bank_record' | 'missing_system_record'
  systemRef: string | null
  bankRef: string | null
  amount: number
  description: string
  status: 'pending' | 'investigating' | 'resolved'
  assignedTo: string | null
  priority: 'high' | 'medium' | 'low'
}

export interface VendorStatement {
  vendorId: string
  vendorName: string
  period: string
  totalTransactions: number
  totalAmount: number
  commission: number
  netAmount: number
  status: 'draft' | 'generated' | 'sent'
  generatedAt: string | null
}

export interface ApiEndpoint {
  name: string
  status: 'healthy' | 'warning' | 'error'
  uptime: string
  responseTime: string
}

export interface SystemAlert {
  id: string
  type: 'info' | 'warning' | 'error' | 'success'
  title: string
  message: string
  timestamp: string
  read: boolean
}

export interface User {
  id: string
  name: string
  email: string
  role: 'admin' | 'operator' | 'viewer'
  lastLogin?: string
}

export interface NotificationSettings {
  emailEnabled: boolean
  smsEnabled: boolean
  systemAlerts: boolean
  transactionAlerts: boolean
  lowBalanceAlerts: boolean
  vendorAlerts: boolean
  securityAlerts: boolean
  emailRecipients: string
}

export interface SecuritySettings {
  enableTwoFactor: boolean
  passwordMinLength: string
  passwordComplexity: boolean
  sessionSecurity: boolean
  ipWhitelist: string
  auditLogging: boolean
  encryptionLevel: string
}

export interface GeneralSettings {
  systemName: string
  companyName: string
  defaultCurrency: 'USD' | 'ZWG' | 'ZAR'
  timezone: string
  language: string
  sessionTimeout: string
  enableMaintenance: boolean
  maintenanceMessage: string
}

export interface CommissionRate {
  service: string
  rate: number
  minRate: number
  maxRate: number
}

export interface TransactionLimit {
  type: string
  min: number
  max: number
  current: number
}

// Chart data interfaces
export interface RevenueChartData {
  date: string
  revenue: number
  transactions: number
}

export interface HourlyTransactionData {
  hour: string
  transactions: number
}

export interface TopVendorData {
  name: string
  revenue: number
  transactions: number
}

export interface ServiceDistributionData {
  name: string
  value: number
  fill: string
}

export interface BalanceHistoryData {
  date: string
  usd: number
  zwg: number
  zar: number
}

export interface FloatDistribution {
  name: string
  value: number
  color: string
  percentage: number
}

export interface VendorPerformance {
  vendor: string
  revenue: number
  transactions: number
  growth: number
  efficiency: number
}

export interface GeographicData {
  province: string
  revenue: number
  vendors: number
  growth: number
}