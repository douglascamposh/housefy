"use client"

import './globals.css'
import { Inter } from 'next/font/google'
import { Provider } from 'react-redux'
import { store } from '../redux/store'
import TopMenu from '@/components/TopMenu'
const inter = Inter({ subsets: ['latin'] })



export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        
      <Provider store={store}>
        <TopMenu></TopMenu>
        <div className="pt-[85px] pl-[10px] pr-[10px] ">
            {children}
          </div>

      </Provider>
        </body>
    </html>
  )
}
