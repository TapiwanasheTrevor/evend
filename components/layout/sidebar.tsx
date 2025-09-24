'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { useAppStore } from '@/lib/store'
import {
  BarChart3,
  Users,
  CreditCard,
  TrendingUp,
  Wallet,
  Settings,
  FileText,
  Shield,
  Menu,
  X,
  Home,
  ChevronDown
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'

const navigation = [
  {
    name: 'Dashboard',
    href: '/dashboard',
    icon: Home,
    current: true
  },
  {
    name: 'Vendor Management',
    href: '/vendors',
    icon: Users,
    children: [
      { name: 'All Vendors', href: '/vendors' },
      { name: 'Add Vendor', href: '/vendors/add' },
      { name: 'Vendor Analytics', href: '/vendors/analytics' }
    ]
  },
  {
    name: 'Transactions',
    href: '/transactions',
    icon: CreditCard,
    children: [
      { name: 'All Transactions', href: '/transactions' },
      { name: 'Failed Transactions', href: '/transactions/failed' },
      { name: 'Refunds', href: '/transactions/refunds' }
    ]
  },
  {
    name: 'Reports & Analytics',
    href: '/reports',
    icon: TrendingUp,
    children: [
      { name: 'Financial Reports', href: '/reports/financial' },
      { name: 'Vendor Performance', href: '/reports/vendors' },
      { name: 'Service Analytics', href: '/reports/services' }
    ]
  },
  {
    name: 'Wallet Management',
    href: '/wallets',
    icon: Wallet
  },
  {
    name: 'Reconciliation',
    href: '/reconciliation',
    icon: FileText
  },
  {
    name: 'System Configuration',
    href: '/settings',
    icon: Settings,
    children: [
      { name: 'General Settings', href: '/settings' },
      { name: 'Commission Rates', href: '/settings/commission' },
      { name: 'Transaction Limits', href: '/settings/limits' }
    ]
  },
  {
    name: 'Security & Audit',
    href: '/security',
    icon: Shield
  }
]

export function Sidebar() {
  const pathname = usePathname()
  const { sidebarCollapsed, toggleSidebar } = useAppStore()
  const [expandedItems, setExpandedItems] = useState<string[]>(['Dashboard'])

  const toggleExpanded = (itemName: string) => {
    setExpandedItems(prev =>
      prev.includes(itemName)
        ? prev.filter(name => name !== itemName)
        : [...prev, itemName]
    )
  }

  return (
    <>
      {/* Mobile overlay */}
      {!sidebarCollapsed && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <div
        className={cn(
          'fixed inset-y-0 left-0 z-30 w-64 bg-white border-r border-gray-200 transform transition-transform duration-200 ease-in-out lg:translate-x-0 lg:static lg:inset-0',
          sidebarCollapsed ? '-translate-x-full' : 'translate-x-0'
        )}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <div className="text-white font-bold text-sm">PT</div>
              </div>
              <div>
                <h1 className="text-lg font-semibold text-gray-900">E-Vend</h1>
                <p className="text-xs text-gray-500">Admin Portal</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleSidebar}
              className="lg:hidden"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
            {navigation.map((item) => {
              const isActive = pathname === item.href || (item.children && item.children.some(child => pathname === child.href))
              const isExpanded = expandedItems.includes(item.name)

              if (item.children) {
                return (
                  <Collapsible key={item.name} open={isExpanded} onOpenChange={() => toggleExpanded(item.name)}>
                    <CollapsibleTrigger asChild>
                      <Button
                        variant="ghost"
                        className={cn(
                          'w-full justify-between px-3 py-2 text-left font-medium',
                          isActive
                            ? 'bg-primary/10 text-primary border-r-2 border-primary'
                            : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                        )}
                      >
                        <div className="flex items-center">
                          <item.icon className="mr-3 h-5 w-5" />
                          {item.name}
                        </div>
                        <ChevronDown
                          className={cn(
                            'h-4 w-4 transition-transform',
                            isExpanded ? 'transform rotate-180' : ''
                          )}
                        />
                      </Button>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="space-y-1 pl-6">
                      {item.children.map((child) => (
                        <Link key={child.href} href={child.href} onClick={() => toggleSidebar()}>
                          <Button
                            variant="ghost"
                            className={cn(
                              'w-full justify-start px-3 py-2 text-sm',
                              pathname === child.href
                                ? 'bg-primary/10 text-primary'
                                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                            )}
                          >
                            {child.name}
                          </Button>
                        </Link>
                      ))}
                    </CollapsibleContent>
                  </Collapsible>
                )
              }

              return (
                <Link key={item.name} href={item.href} onClick={() => toggleSidebar()}>
                  <Button
                    variant="ghost"
                    className={cn(
                      'w-full justify-start px-3 py-2 font-medium',
                      isActive
                        ? 'bg-primary/10 text-primary border-r-2 border-primary'
                        : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                    )}
                  >
                    <item.icon className="mr-3 h-5 w-5" />
                    {item.name}
                  </Button>
                </Link>
              )
            })}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-gray-200">
            <div className="text-xs text-gray-500">
              <p>E-Vend System v1.0.0</p>
              <p>© 2024 Powertel Communications</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}