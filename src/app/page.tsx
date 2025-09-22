"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  ChevronDown,
  Calendar,
  Filter,
  Download,
  BarChart3,
  TrendingUp,
  Leaf,
  Database,
  Zap,
  FileText,
  Building2,
  RotateCcw,
  BookOpen,
  User,
  Menu,
  X,
} from "lucide-react"

export default function EnergySimulator() {
  const [selectedCompany, setSelectedCompany] = useState("ACME Inc.")
  const [selectedYear, setSelectedYear] = useState("2025")
  const [selectedReportYear, setSelectedReportYear] = useState("2024")
  const [scenario, setScenario] = useState("core")
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const sidebarItems = [
    { icon: TrendingUp, label: "Progress", active: false },
    { icon: Leaf, label: "My emissions", active: false },
    { icon: Database, label: "Data", active: false },
    { icon: Zap, label: "Actions", active: true },
    { icon: FileText, label: "CSRD", active: false },
    { icon: Building2, label: "Suppliers", active: false },
    { icon: RotateCcw, label: "LCA", active: false },
    { icon: BookOpen, label: "My resources", active: false },
    { icon: User, label: "My account", active: false },
  ]

  return (
    <div className="flex h-screen bg-gray-50">
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
        ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0 fixed lg:static inset-y-0 left-0 z-50
        w-64 bg-gray-100 border-r border-gray-200 flex flex-col
        transition-transform duration-300 ease-in-out
      `}
      >
        <div className="lg:hidden absolute top-4 right-4">
          <Button variant="ghost" size="sm" onClick={() => setIsMobileMenuOpen(false)}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="p-6 border-b border-gray-200">
          <h1 className="text-xl font-bold text-gray-900">
            <Image src="/logo.svg" alt="Logo" width={100} height={40} />
          </h1>
        </div>

        {/* Company and Year Selectors */}
        <div className="p-4 space-y-3 border-b border-gray-200">
          <div className="relative">
            <Select value={selectedCompany} onValueChange={setSelectedCompany}>
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ACME Inc.">ACME Inc.</SelectItem>
                <SelectItem value="Other Corp">Other Corp</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="relative">
            <Select value={selectedYear} onValueChange={setSelectedYear}>
              <SelectTrigger className="w-full">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <SelectValue />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2025">2025</SelectItem>
                <SelectItem value="2024">2024</SelectItem>
                <SelectItem value="2023">2023</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {sidebarItems.map((item, index) => {
              const IconComponent = item.icon
              return (
                <li key={index}>
                  <button
                    className={`w-full flex items-center gap-3 px-3 py-2 text-left rounded-md ${
                      item.active ? "bg-gray-200 text-gray-900" : "text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    <IconComponent className="h-4 w-4" />
                    <span className="text-sm">{item.label}</span>
                    <ChevronDown className="h-4 w-4 ml-auto" />
                  </button>
                </li>
              )
            })}
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col lg:ml-0">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-4 lg:px-8 py-4 lg:py-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" className="lg:hidden" onClick={() => setIsMobileMenuOpen(true)}>
              <Menu className="h-4 w-4" />
            </Button>
            <h1 className="text-xl lg:text-2xl font-semibold text-gray-900">Energy simulator</h1>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-gray-500" />
            <Select value={selectedReportYear} onValueChange={setSelectedReportYear}>
              <SelectTrigger className="w-20 lg:w-24 border-none shadow-none">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2024">2024</SelectItem>
                <SelectItem value="2023">2023</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex-1 p-4 lg:p-8 overflow-auto w-full">
          <div className="w-full space-y-6 lg:space-y-8">
            {/* Global Section */}
            <div className="bg-white rounded-lg border border-gray-200 p-4 lg:p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4 lg:mb-6">Global</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
                <div className="space-y-2">
                  <Label htmlFor="buildings" className="text-sm font-medium text-gray-700">
                    Number of buildings <span className="text-red-500">*</span>
                  </Label>
                  <Input id="buildings" placeholder="Type the number of buildings" className="w-full" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="superficy" className="text-sm font-medium text-gray-700">
                    Average Superficy per building <span className="text-red-500">*</span>
                  </Label>
                  <div className="relative">
                    <Input id="superficy" placeholder="Type the superficy per building" className="w-full pr-12" />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500 font-bold">
                      m2
                    </span>
                  </div>
                </div>
                <div className="space-y-2 md:col-span-2 lg:col-span-1">
                  <Label htmlFor="your-building" className="text-sm font-medium text-gray-700">
                    Your building <span className="text-red-500">*</span>
                  </Label>
                  <Select>
                    <SelectTrigger className="w-full min-w-[200px]">
                      <SelectValue placeholder="Select one" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="building1">Building 1</SelectItem>
                      <SelectItem value="building2">Building 2</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Your Building Section */}
            <div className="bg-white rounded-lg border border-gray-200 p-4 lg:p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4 lg:mb-6">Your building</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-6">
                <div className="space-y-2">
                  <Label htmlFor="building-superficy" className="text-sm font-medium text-gray-700">
                    Superficy <span className="text-red-500">*</span>
                  </Label>
                  <div className="relative">
                    <Input
                      id="building-superficy"
                      placeholder="Type the number of buildings"
                      className="w-full pr-12"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500">m2</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="activity-sector" className="text-sm font-medium text-gray-700">
                    Activity sector <span className="text-red-500">*</span>
                  </Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select one" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="office">Office</SelectItem>
                      <SelectItem value="retail">Retail</SelectItem>
                      <SelectItem value="industrial">Industrial</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="electricity" className="text-sm font-medium text-gray-700">
                    Electricity annual consumption <span className="text-red-500">*</span>
                  </Label>
                  <div className="relative">
                    <Input id="electricity" placeholder="Type the number of buildings" className="w-full pr-12" />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500 font-bold">
                      kWh
                    </span>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="heating-type" className="text-sm font-medium text-gray-700">
                    Heating type <span className="text-red-500">*</span>
                  </Label>
                  <Select>
                    <SelectTrigger className="w-full min-w-[200px]">
                      <SelectValue placeholder="Select one" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="gas">Gas</SelectItem>
                      <SelectItem value="electric">Electric</SelectItem>
                      <SelectItem value="oil">Oil</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <span className="text-sm font-medium text-gray-700">Heat Pumps</span>
                  <Switch />
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <span className="text-sm font-medium text-gray-700">EV Chargers</span>
                  <Switch />
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <span className="text-sm font-medium text-gray-700">PV</span>
                  <Switch />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-4 lg:p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4 lg:mb-6">Scenarios</h2>
              <RadioGroup
                value={scenario}
                onValueChange={setScenario}
                className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6"
              >
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <Label htmlFor="light" className="text-sm font-medium text-gray-700 cursor-pointer">
                    Light
                  </Label>
                  <RadioGroupItem value="light" id="light" />
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <Label htmlFor="core" className="text-sm font-medium text-gray-700 cursor-pointer">
                    Core
                  </Label>
                  <RadioGroupItem value="core" id="core" />
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <Label htmlFor="advanced" className="text-sm font-medium text-gray-700 cursor-pointer">
                    Advanced
                  </Label>
                  <RadioGroupItem value="advanced" id="advanced" />
                </div>
              </RadioGroup>
            </div>

            {/* Additional Assets Section */}
            <div className="bg-white rounded-lg border border-gray-200 p-4 lg:p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4 lg:mb-6">Additional assets</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <span className="text-sm font-medium text-gray-700">Heat Pumps</span>
                  <Switch />
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <span className="text-sm font-medium text-gray-700">EV Chargers</span>
                  <Switch />
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <span className="text-sm font-medium text-gray-700">PV</span>
                  <Switch />
                </div>
              </div>
            </div>

            {/* Profitability Section */}
            <div className="bg-white rounded-lg border border-gray-200 p-4 lg:p-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-gray-600" />
                  <h2 className="text-lg font-medium text-gray-900">Profitability</h2>
                </div>
                <div className="flex flex-wrap items-center gap-2 lg:gap-3">
                  <Button variant="outline" size="sm" className="flex items-center gap-2 bg-transparent">
                    <Calendar className="h-4 w-4" />
                    <span className="hidden sm:inline">Last year</span>
                  </Button>
                  <Button variant="outline" size="sm" className="flex items-center gap-2 bg-transparent">
                    <Filter className="h-4 w-4" />
                    <span className="hidden sm:inline">Filters</span>
                  </Button>
                  <Button variant="outline" size="sm" className="flex items-center gap-2 bg-transparent">
                    <Download className="h-4 w-4" />
                    <span className="hidden sm:inline">Download</span>
                  </Button>
                </div>
              </div>

              {/* Chart Area */}
              <div className="h-48 lg:h-64 flex items-center justify-center bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
                <span className="text-gray-500 text-sm">No data</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
