'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface User {
  id: string
  name: string
  email: string
  role: string
}

interface Notification {
  id: string
  title: string
  message: string
  type: 'info' | 'success' | 'warning' | 'error'
  timestamp: Date
  read: boolean
}

interface AppState {
  // UI State
  sidebarCollapsed: boolean
  isDarkMode: boolean
  
  // User State
  user: User | null
  notifications: Notification[]
  
  // Actions
  toggleSidebar: () => void
  toggleDarkMode: () => void
  setUser: (user: User | null) => void
  addNotification: (notification: Omit<Notification, 'id'>) => void
  markNotificationRead: (id: string) => void
  clearNotifications: () => void
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      // Initial state
      sidebarCollapsed: false,
      isDarkMode: false,
      user: null,
      notifications: [
        {
          id: '1',
          title: 'System Maintenance',
          message: 'Scheduled maintenance tonight at 11 PM',
          type: 'info',
          timestamp: new Date(),
          read: false
        },
        {
          id: '2',
          title: 'Low Balance Alert',
          message: 'Vendor V-003 has low balance: $150',
          type: 'warning',
          timestamp: new Date(),
          read: false
        },
        {
          id: '3',
          title: 'Transaction Spike',
          message: '200% increase in transactions today',
          type: 'success',
          timestamp: new Date(),
          read: true
        }
      ],
      
      // Actions
      toggleSidebar: () => set(state => ({ sidebarCollapsed: !state.sidebarCollapsed })),
      toggleDarkMode: () => set(state => ({ isDarkMode: !state.isDarkMode })),
      setUser: (user) => set({ user }),
      addNotification: (notification) => set(state => ({
        notifications: [{
          ...notification,
          id: Date.now().toString(),
        }, ...state.notifications]
      })),
      markNotificationRead: (id) => set(state => ({
        notifications: state.notifications.map(n => 
          n.id === id ? { ...n, read: true } : n
        )
      })),
      clearNotifications: () => set({ notifications: [] })
    }),
    {
      name: 'evend-app-store',
      partialize: (state) => ({
        sidebarCollapsed: state.sidebarCollapsed,
        isDarkMode: state.isDarkMode
      })
    }
  )
)