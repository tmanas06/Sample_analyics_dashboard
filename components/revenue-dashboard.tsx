"use client"

import { useState } from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { FileUpload } from "@/components/file-upload"
import { RevenueCharts } from "@/components/revenue-charts"
import { RevenueOverview } from "@/components/revenue-overview"
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage } from "@/components/ui/breadcrumb"

export interface RevenueData {
  taxRevenue: {
    commercialTaxes: {
      sgst: number
      igst: number
      hotelTax: number
      professionalTax: number
      salesTradeTax: number
    }
    excise: number
    electricity: number
    stampsRegistration: number
    transport: number
    landRevenue: number
  }
  nonTaxRevenue: {
    mining: number
    waterResource: number
    forestResource: number
  }
  period: string
}

// Sample data for demonstration
const sampleData: RevenueData[] = [
  {
    taxRevenue: {
      commercialTaxes: {
        sgst: 45000,
        igst: 38000,
        hotelTax: 12000,
        professionalTax: 8500,
        salesTradeTax: 25000,
      },
      excise: 32000,
      electricity: 28000,
      stampsRegistration: 18000,
      transport: 22000,
      landRevenue: 15000,
    },
    nonTaxRevenue: {
      mining: 35000,
      waterResource: 12000,
      forestResource: 8000,
    },
    period: "Q1 2024",
  },
  {
    taxRevenue: {
      commercialTaxes: {
        sgst: 48000,
        igst: 42000,
        hotelTax: 14000,
        professionalTax: 9000,
        salesTradeTax: 27000,
      },
      excise: 35000,
      electricity: 30000,
      stampsRegistration: 20000,
      transport: 24000,
      landRevenue: 16000,
    },
    nonTaxRevenue: {
      mining: 38000,
      waterResource: 13000,
      forestResource: 9000,
    },
    period: "Q2 2024",
  },
  {
    taxRevenue: {
      commercialTaxes: {
        sgst: 52000,
        igst: 45000,
        hotelTax: 16000,
        professionalTax: 9500,
        salesTradeTax: 29000,
      },
      excise: 38000,
      electricity: 32000,
      stampsRegistration: 22000,
      transport: 26000,
      landRevenue: 17000,
    },
    nonTaxRevenue: {
      mining: 42000,
      waterResource: 14000,
      forestResource: 10000,
    },
    period: "Q3 2024",
  },
]

export function RevenueDashboard() {
  const [revenueData, setRevenueData] = useState<RevenueData[]>(sampleData)
  const [selectedView, setSelectedView] = useState<string>("overview")

  const handleFileUpload = (data: RevenueData[]) => {
    setRevenueData(data)
  }

  return (
    <SidebarProvider>
      <AppSidebar onViewChange={setSelectedView} selectedView={selectedView} />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbPage>Revenue Dashboard</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">
          {selectedView === "upload" && <FileUpload onDataUpload={handleFileUpload} />}
          {selectedView === "overview" && <RevenueOverview data={revenueData} />}
          {selectedView === "charts" && <RevenueCharts data={revenueData} />}
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
