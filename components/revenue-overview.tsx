"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, TrendingDown, DollarSign, PieChart } from "lucide-react"
import type { RevenueData } from "@/components/revenue-dashboard"

interface RevenueOverviewProps {
  data: RevenueData[]
}

export function RevenueOverview({ data }: RevenueOverviewProps) {
  const latestData = data[data.length - 1]
  const previousData = data[data.length - 2]

  const calculateTotal = (revenueData: RevenueData) => {
    const taxTotal =
      Object.values(revenueData.taxRevenue.commercialTaxes).reduce((a, b) => a + b, 0) +
      revenueData.taxRevenue.excise +
      revenueData.taxRevenue.electricity +
      revenueData.taxRevenue.stampsRegistration +
      revenueData.taxRevenue.transport +
      revenueData.taxRevenue.landRevenue

    const nonTaxTotal = Object.values(revenueData.nonTaxRevenue).reduce((a, b) => a + b, 0)

    return { taxTotal, nonTaxTotal, total: taxTotal + nonTaxTotal }
  }

  const current = calculateTotal(latestData)
  const previous = previousData ? calculateTotal(previousData) : null

  const growth = previous ? ((current.total - previous.total) / previous.total) * 100 : 0

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Revenue Overview</h1>
        <p className="text-muted-foreground mt-2">Comprehensive view of tax and non-tax revenue streams</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{current.total.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              {growth > 0 ? (
                <span className="text-green-600 flex items-center">
                  <TrendingUp className="h-3 w-3 mr-1" />+{growth.toFixed(1)}% from last period
                </span>
              ) : (
                <span className="text-red-600 flex items-center">
                  <TrendingDown className="h-3 w-3 mr-1" />
                  {growth.toFixed(1)}% from last period
                </span>
              )}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tax Revenue</CardTitle>
            <PieChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{current.taxTotal.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              {((current.taxTotal / current.total) * 100).toFixed(1)}% of total revenue
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Non-Tax Revenue</CardTitle>
            <PieChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{current.nonTaxTotal.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              {((current.nonTaxTotal / current.total) * 100).toFixed(1)}% of total revenue
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Commercial Taxes</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ₹
              {Object.values(latestData.taxRevenue.commercialTaxes)
                .reduce((a, b) => a + b, 0)
                .toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">Largest tax revenue component</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Tax Revenue Breakdown</CardTitle>
            <CardDescription>Current period: {latestData.period}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm">Commercial Taxes</span>
                <span className="font-medium">
                  ₹
                  {Object.values(latestData.taxRevenue.commercialTaxes)
                    .reduce((a, b) => a + b, 0)
                    .toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Excise</span>
                <span className="font-medium">₹{latestData.taxRevenue.excise.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Electricity</span>
                <span className="font-medium">₹{latestData.taxRevenue.electricity.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Transport</span>
                <span className="font-medium">₹{latestData.taxRevenue.transport.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Stamps & Registration</span>
                <span className="font-medium">₹{latestData.taxRevenue.stampsRegistration.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Land Revenue</span>
                <span className="font-medium">₹{latestData.taxRevenue.landRevenue.toLocaleString()}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Commercial Tax Details</CardTitle>
            <CardDescription>Breakdown of commercial tax components</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm">SGST</span>
                <span className="font-medium">₹{latestData.taxRevenue.commercialTaxes.sgst.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">IGST</span>
                <span className="font-medium">₹{latestData.taxRevenue.commercialTaxes.igst.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Sales/Trade Tax</span>
                <span className="font-medium">
                  ₹{latestData.taxRevenue.commercialTaxes.salesTradeTax.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Hotel Tax</span>
                <span className="font-medium">₹{latestData.taxRevenue.commercialTaxes.hotelTax.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Professional Tax</span>
                <span className="font-medium">
                  ₹{latestData.taxRevenue.commercialTaxes.professionalTax.toLocaleString()}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
