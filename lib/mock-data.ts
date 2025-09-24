import { addDays, subDays, subHours, format } from 'date-fns'

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
  }
  vendor?: Vendor
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

// Zimbabwean business names and locations
const businessNames = [
  'Mukombe General Store', 'Chitungwiza Mart', 'Harare Central Shop', 
  'Bulawayo Trading Post', 'Gweru Electronics', 'Mutare Corner Shop',
  'Masvingo Suppliers', 'Kwekwe Hardware', 'Kadoma Trading', 'Chinhoyi Store',
  'Norton Electronics', 'Ruwa Shopping Center', 'Bindura Mart',
  'Chegutu General Store', 'Kariba Traders', 'Victoria Falls Shop',
  'Hwange Trading Post', 'Plumtree Store', 'Beitbridge Mart',
  'Triangle Trading', 'Zvishavane Electronics', 'Gokwe Suppliers'
]

const locations = [
  'Harare', 'Bulawayo', 'Chitungwiza', 'Mutare', 'Gweru', 'Kwekwe',
  'Kadoma', 'Masvingo', 'Chinhoyi', 'Norton', 'Ruwa', 'Bindura',
  'Chegutu', 'Kariba', 'Victoria Falls', 'Hwange', 'Plumtree',
  'Beitbridge', 'Triangle', 'Zvishavane', 'Gokwe', 'Rusape'
]

const zimbabweanNames = [
  'Tendai Mukamuri', 'Chipo Nyakamura', 'Blessing Madziva', 'Grace Moyo',
  'Joseph Sibanda', 'Memory Chiweshe', 'Tapiwa Matongo', 'Precious Ncube',
  'Tinashe Mujuru', 'Faith Mazivisa', 'Brian Dube', 'Charity Matemba',
  'Wellington Chitanda', 'Rudo Mavhura', 'Lloyd Musarurwa', 'Yvonne Tapfuma'
]

// Generate mock vendors
export function generateMockVendors(): Vendor[] {
  const vendors: Vendor[] = []
  
  for (let i = 0; i < 50; i++) {
    const id = `V-${String(i + 1).padStart(3, '0')}`
    vendors.push({
      id,
      businessName: businessNames[i % businessNames.length],
      type: ['vendor', 'agent', 'aggregator'][Math.floor(Math.random() * 3)] as any,
      status: Math.random() > 0.1 ? 'active' : Math.random() > 0.5 ? 'pending' : 'suspended',
      balance: Math.floor(Math.random() * 5000) + 100,
      commissionRate: 2.5 + Math.random() * 2,
      contactPerson: zimbabweanNames[Math.floor(Math.random() * zimbabweanNames.length)],
      phone: `+263 ${Math.floor(Math.random() * 2) === 0 ? '77' : '78'}${Math.floor(Math.random() * 10000000).toString().padStart(7, '0')}`,
      email: `${businessNames[i % businessNames.length].toLowerCase().replace(/\s+/g, '')}@gmail.com`,
      address: `${Math.floor(Math.random() * 999) + 1} ${['Main', 'Church', 'Second', 'High'][Math.floor(Math.random() * 4)]} Street`,
      location: locations[Math.floor(Math.random() * locations.length)],
      createdAt: subDays(new Date(), Math.floor(Math.random() * 365))
    })
  }
  
  return vendors
}

// Generate mock transactions
export function generateMockTransactions(vendors: Vendor[]): Transaction[] {
  const transactions: Transaction[] = []
  
  for (let i = 0; i < 1000; i++) {
    const vendor = vendors[Math.floor(Math.random() * vendors.length)]
    const timestamp = subHours(new Date(), Math.floor(Math.random() * 720)) // Last 30 days
    
    transactions.push({
      id: `TXN${String(i + 1).padStart(6, '0')}`,
      reference: `REF${timestamp.getTime().toString().slice(-8)}`,
      type: ['token', 'topup', 'bill', 'transfer'][Math.floor(Math.random() * 4)] as any,
      vendorId: vendor.id,
      customerId: `+263 ${Math.floor(Math.random() * 2) === 0 ? '77' : '78'}${Math.floor(Math.random() * 10000000).toString().padStart(7, '0')}`,
      amount: Math.floor(Math.random() * 200) + 10,
      currency: ['USD', 'ZWG', 'ZAR'][Math.floor(Math.random() * 3)] as any,
      status: Math.random() > 0.05 ? 'success' : Math.random() > 0.5 ? 'pending' : 'failed',
      service: ['electricity', 'water', 'gas'][Math.floor(Math.random() * 3)] as any,
      timestamp,
      vendor,
      metadata: {
        meterNumber: Math.floor(Math.random() * 10000000000).toString().padStart(10, '0'),
        tokenNumber: `${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`,
        units: Math.floor(Math.random() * 300) + 50
      }
    })
  }
  
  return transactions.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
}

// Generate dashboard metrics
export function generateDashboardMetrics(transactions: Transaction[]): DashboardMetrics {
  const today = new Date()
  const yesterday = subDays(today, 1)
  
  const todayTransactions = transactions.filter(t => 
    format(t.timestamp, 'yyyy-MM-dd') === format(today, 'yyyy-MM-dd')
  )
  const yesterdayTransactions = transactions.filter(t =>
    format(t.timestamp, 'yyyy-MM-dd') === format(yesterday, 'yyyy-MM-dd')
  )
  
  const todayRevenue = todayTransactions.reduce((sum, t) => sum + (t.status === 'success' ? t.amount : 0), 0)
  const yesterdayRevenue = yesterdayTransactions.reduce((sum, t) => sum + (t.status === 'success' ? t.amount : 0), 0)
  
  return {
    revenue: {
      today: todayRevenue,
      yesterday: yesterdayRevenue,
      change: yesterdayRevenue > 0 ? ((todayRevenue - yesterdayRevenue) / yesterdayRevenue) * 100 : 0
    },
    transactions: {
      count: todayTransactions.length,
      volume: todayTransactions.reduce((sum, t) => sum + t.amount, 0),
      avgValue: todayTransactions.length > 0 ? todayTransactions.reduce((sum, t) => sum + t.amount, 0) / todayTransactions.length : 0
    },
    users: {
      active: Math.floor(Math.random() * 1000) + 5000,
      new: Math.floor(Math.random() * 50) + 20,
      total: Math.floor(Math.random() * 5000) + 45000
    },
    system: {
      uptime: 99.9,
      health: 'healthy' as const,
      lastCheck: new Date()
    }
  }
}

// Generate time series data for charts
export function generateRevenueChartData() {
  const data = []
  for (let i = 29; i >= 0; i--) {
    const date = subDays(new Date(), i)
    data.push({
      date: format(date, 'MMM dd'),
      revenue: Math.floor(Math.random() * 10000) + 20000,
      transactions: Math.floor(Math.random() * 500) + 800
    })
  }
  return data
}

export function generateHourlyTransactionData() {
  const data = []
  for (let i = 0; i < 24; i++) {
    data.push({
      hour: `${i.toString().padStart(2, '0')}:00`,
      transactions: Math.floor(Math.random() * 100) + 20
    })
  }
  return data
}

export function generateTopVendorsData(vendors: Vendor[]) {
  return vendors
    .slice(0, 5)
    .map(vendor => ({
      name: vendor.businessName,
      revenue: Math.floor(Math.random() * 50000) + 10000,
      transactions: Math.floor(Math.random() * 500) + 100
    }))
    .sort((a, b) => b.revenue - a.revenue)
}

export function generateServiceDistributionData() {
  return [
    { name: 'Electricity', value: 65, fill: '#1E3A8A' },
    { name: 'Water', value: 25, fill: '#EA580C' },
    { name: 'Gas', value: 10, fill: '#16A34A' }
  ]
}