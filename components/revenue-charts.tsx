"use client"

import {
  Bar,
  BarChart,
  Line,
  LineChart,
  Pie,
  PieChart,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import type { RevenueData } from "@/components/revenue-dashboard"

interface RevenueChartsProps {
  data: RevenueData[]
}

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#8884D8",
  "#82CA9D",
  "#FFC658",
  "#FF7C7C",
  "#8DD1E1",
  "#D084D0",
]

export function RevenueCharts({ data }: RevenueChartsProps) {
  // Prepare data for trend chart
  const trendData = data.map((item) => {
    const taxTotal =
      Object.values(item.taxRevenue.commercialTaxes).reduce((a, b) => a + b, 0) +
      item.taxRevenue.excise +
      item.taxRevenue.electricity +
      item.taxRevenue.stampsRegistration +
      item.taxRevenue.transport +
      item.taxRevenue.landRevenue

    const nonTaxTotal = Object.values(item.nonTaxRevenue).reduce((a, b) => a + b, 0)

    return {
      period: item.period,
      taxRevenue: taxTotal,
      nonTaxRevenue: nonTaxTotal,
      total: taxTotal + nonTaxTotal,
    }
  })

  // Prepare data for tax breakdown chart
  const latestData = data[data.length - 1]
  const taxBreakdownData = [
    {
      name: "Commercial Taxes",
      value: Object.values(latestData.taxRevenue.commercialTaxes).reduce((a, b) => a + b, 0),
    },
    { name: "Excise", value: latestData.taxRevenue.excise },
    { name: "Electricity", value: latestData.taxRevenue.electricity },
    { name: "Transport", value: latestData.taxRevenue.transport },
    { name: "Stamps & Registration", value: latestData.taxRevenue.stampsRegistration },
    { name: "Land Revenue", value: latestData.taxRevenue.landRevenue },
  ]

  // Prepare data for commercial tax breakdown
  const commercialTaxData = [
    { name: "SGST", value: latestData.taxRevenue.commercialTaxes.sgst },
    { name: "IGST", value: latestData.taxRevenue.commercialTaxes.igst },
    { name: "Sales/Trade Tax", value: latestData.taxRevenue.commercialTaxes.salesTradeTax },
    { name: "Hotel Tax", value: latestData.taxRevenue.commercialTaxes.hotelTax },
    { name: "Professional Tax", value: latestData.taxRevenue.commercialTaxes.professionalTax },
  ]

  // Prepare data for non-tax revenue
  const nonTaxData = [
    { name: "Mining", value: latestData.nonTaxRevenue.mining },
    { name: "Water Resource", value: latestData.nonTaxRevenue.waterResource },
    { name: "Forest Resource", value: latestData.nonTaxRevenue.forestResource },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Revenue Analytics</h1>
        <p className="text-muted-foreground mt-2">Detailed charts and visualizations of revenue data</p>
      </div>

      <div className="grid gap-6">
        {/* Revenue Trend Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Revenue Trend Analysis</CardTitle>
            <CardDescription>Tax vs Non-Tax revenue over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                taxRevenue: {
                  label: "Tax Revenue",
                  color: "hsl(var(--chart-1))",
                },
                nonTaxRevenue: {
                  label: "Non-Tax Revenue",
                  color: "hsl(var(--chart-2))",
                },
                total: {
                  label: "Total Revenue",
                  color: "hsl(var(--chart-3))",
                },
              }}
              className="h-[400px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={trendData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="period" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend />
                  <Line type="monotone" dataKey="taxRevenue" stroke="var(--color-taxRevenue)" strokeWidth={2} />
                  <Line type="monotone" dataKey="nonTaxRevenue" stroke="var(--color-nonTaxRevenue)" strokeWidth={2} />
                  <Line
                    type="monotone"
                    dataKey="total"
                    stroke="var(--color-total)"
                    strokeWidth={3}
                    strokeDasharray="5 5"
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Tax Revenue Breakdown */}
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Tax Revenue Breakdown</CardTitle>
              <CardDescription>Distribution of tax revenue sources</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={{}} className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={taxBreakdownData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {taxBreakdownData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`₹${Number(value).toLocaleString()}`, "Amount"]} />
                  </PieChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Commercial Tax Components</CardTitle>
              <CardDescription>Detailed breakdown of commercial taxes</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={{}} className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={commercialTaxData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
                    <YAxis />
                    <Tooltip formatter={(value) => [`₹${Number(value).toLocaleString()}`, "Amount"]} />
                    <Bar dataKey="value" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>

        {/* Non-Tax Revenue and Comparison */}
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Non-Tax Revenue Sources</CardTitle>
              <CardDescription>Mining, Water, and Forest resources</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={{}} className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={nonTaxData} layout="horizontal">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis dataKey="name" type="category" width={100} />
                    <Tooltip formatter={(value) => [`₹${Number(value).toLocaleString()}`, "Amount"]} />
                    <Bar dataKey="value" fill="#82ca9d" />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Revenue Comparison</CardTitle>
              <CardDescription>Tax vs Non-Tax revenue comparison</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  taxRevenue: {
                    label: "Tax Revenue",
                    color: "hsl(var(--chart-1))",
                  },
                  nonTaxRevenue: {
                    label: "Non-Tax Revenue",
                    color: "hsl(var(--chart-2))",
                  },
                }}
                className="h-[300px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={trendData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="period" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Legend />
                    <Bar dataKey="taxRevenue" fill="var(--color-taxRevenue)" />
                    <Bar dataKey="nonTaxRevenue" fill="var(--color-nonTaxRevenue)" />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
