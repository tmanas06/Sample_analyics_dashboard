"use client"

import type React from "react"

import { useState, useCallback } from "react"
import { Upload, FileSpreadsheet, AlertCircle } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import type { RevenueData } from "@/components/revenue-dashboard"

interface FileUploadProps {
  onDataUpload: (data: RevenueData[]) => void
}

export function FileUpload({ onDataUpload }: FileUploadProps) {
  const [isDragOver, setIsDragOver] = useState(false)
  const [uploadStatus, setUploadStatus] = useState<string>("")

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)

    const files = Array.from(e.dataTransfer.files)
    handleFiles(files)
  }, [])

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    handleFiles(files)
  }, [])

  const handleFiles = (files: File[]) => {
    const excelFile = files.find(
      (file) => file.name.endsWith(".xlsx") || file.name.endsWith(".xls") || file.name.endsWith(".csv"),
    )

    if (!excelFile) {
      setUploadStatus("Please upload a valid Excel file (.xlsx, .xls, or .csv)")
      return
    }

    // Simulate file processing
    setUploadStatus("Processing file...")

    setTimeout(() => {
      // In a real implementation, you would parse the Excel file here
      // For now, we'll simulate successful upload with sample data
      const sampleProcessedData: RevenueData[] = [
        {
          taxRevenue: {
            commercialTaxes: {
              sgst: 55000,
              igst: 47000,
              hotelTax: 18000,
              professionalTax: 11000,
              salesTradeTax: 32000,
            },
            excise: 41000,
            electricity: 35000,
            stampsRegistration: 25000,
            transport: 29000,
            landRevenue: 19000,
          },
          nonTaxRevenue: {
            mining: 45000,
            waterResource: 16000,
            forestResource: 12000,
          },
          period: "Q4 2024",
        },
      ]

      onDataUpload(sampleProcessedData)
      setUploadStatus(`Successfully processed ${excelFile.name}`)
    }, 2000)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Upload Revenue Data</h1>
        <p className="text-muted-foreground mt-2">
          Upload your Excel files to generate comprehensive revenue analytics
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>File Upload</CardTitle>
          <CardDescription>Upload Excel files (.xlsx, .xls) or CSV files containing revenue data</CardDescription>
        </CardHeader>
        <CardContent>
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              isDragOver ? "border-primary bg-primary/5" : "border-muted-foreground/25 hover:border-muted-foreground/50"
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <FileSpreadsheet className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-semibold mb-2">Drag and drop your files here</h3>
            <p className="text-muted-foreground mb-4">or click to browse files</p>
            <input
              type="file"
              accept=".xlsx,.xls,.csv"
              onChange={handleFileInput}
              className="hidden"
              id="file-upload"
              multiple
            />
            <Button asChild>
              <label htmlFor="file-upload" className="cursor-pointer">
                <Upload className="h-4 w-4 mr-2" />
                Choose Files
              </label>
            </Button>
          </div>

          {uploadStatus && (
            <Alert className="mt-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{uploadStatus}</AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Expected Data Format</CardTitle>
          <CardDescription>Your Excel file should contain the following revenue categories:</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3">Tax Revenue</h4>
              <ul className="space-y-2 text-sm">
                <li>• Commercial Taxes (SGST, IGST, Hotel Tax, Professional Tax, Sales/Trade Tax)</li>
                <li>• Excise</li>
                <li>• Electricity</li>
                <li>• Stamps and Registration</li>
                <li>• Transport (Vehicle Taxes)</li>
                <li>• Land Revenue</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Non-Tax Revenue</h4>
              <ul className="space-y-2 text-sm">
                <li>• Mining (Non-ferrous Mining and Metallurgical Industries)</li>
                <li>• Water Resource</li>
                <li>• Forest Resource</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
