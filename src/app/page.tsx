"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from "recharts"
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
  Info,
  WeightIcon as LightIcon,
  Star,
  Book,
} from "lucide-react"

export default function EnergySimulator() {
  const [selectedCompany, setSelectedCompany] = useState("ACME Inc.")
  const [selectedYear, setSelectedYear] = useState("2025")
  const [selectedReportYear, setSelectedReportYear] = useState("2024")
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const [formData, setFormData] = useState({
    numberOfBuildings: "1",
    averageSuperficy: "200",
    yourBuilding: "Offices",
    buildingSuperficy: "100",
    activitySector: "",
    electricityConsumption: "3500",
    heatingType: "Electric (including heat pumps)",
    pvEnabled: true,
    heatPumpsEnabled: true,
    evChargersEnabled: true,
    energyOptimizationEnabled: true,
    selectedScenario: "Core",
    additionalPvEnabled: true,
    additionalHeatPumpsEnabled: true,
    additionalEvChargersEnabled: true,
  })

  const [showTooltip, setShowTooltip] = useState(false)

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

  const chartData = [
    { year: "2025", existingAssets: 15 },
    { year: "2026", existingAssets: 18 },
    { year: "2027", existingAssets: 22 },
    { year: "2028", existingAssets: 28 },
    { year: "2029", existingAssets: 35 },
    { year: "2030", existingAssets: 42 },
    { year: "2031", existingAssets: 48 },
    { year: "2032", existingAssets: 55 },
    { year: "2033", existingAssets: 62 },
    { year: "2034", existingAssets: 68 },
    { year: "2035", existingAssets: 75 },
  ]

  const treemapData = [
    { name: "Additional assets: PV", value: 5254, color: "#064e3b" },
    { name: "Additional assets: Heatpumps", value: 3276, color: "#065f46" },
    { name: "Additional assets: EV Chargers", value: 1546, color: "#22c55e" },
    { name: "Energy optimization: Demand side management", value: 669, color: "#16a34a" },
    { name: "Energy optimization: EV Chargers", value: 389, color: "#4ade80" },
    { name: "Energy optimization: Heatpumps", value: 189, color: "#86efac" },
    { name: "Energy optimization: PV", value: 143, color: "#bbf7d0" },
  ]

  return (
    <div className="flex h-screen bg-gray-50">
      {/* ... existing sidebar code ... */}
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
            <Select value="Learn" onValueChange={() => {}}>
              <SelectTrigger className="w-20 lg:w-24 border-none shadow-none">
                <div className="flex items-center gap-2">
                  <Book className="h-4 w-4 text-gray-500" />
                  <SelectValue />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Learn">Learn</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex-1 p-4 lg:p-8 overflow-auto w-full">
          <div className="w-full space-y-6 lg:space-y-8">
            {/* ... existing Global and Your Building sections ... */}
            {/* Global Section */}
            <div className="bg-white rounded-lg border border-gray-200 p-4 lg:p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4 lg:mb-6">Global</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
                <div className="space-y-2">
                  <Label htmlFor="buildings" className="text-sm font-medium text-gray-700">
                    Number of buildings <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="buildings"
                    value={formData.numberOfBuildings}
                    onChange={(e) => setFormData({ ...formData, numberOfBuildings: e.target.value })}
                    placeholder="Type the number of buildings"
                    className="w-full"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="superficy" className="text-sm font-medium text-gray-700">
                    Average Superficy per building <span className="text-red-500">*</span>
                  </Label>
                  <div className="relative">
                    <Input
                      id="superficy"
                      value={formData.averageSuperficy}
                      onChange={(e) => setFormData({ ...formData, averageSuperficy: e.target.value })}
                      placeholder="Type the superficy per building"
                      className="w-full pr-12"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500 font-bold">
                      m2
                    </span>
                  </div>
                </div>
                <div className="space-y-2 md:col-span-2 lg:col-span-1">
                  <Label htmlFor="your-building" className="text-sm font-medium text-gray-700">
                    Your building <span className="text-red-500">*</span>
                  </Label>
                  <Select
                    value={formData.yourBuilding}
                    onValueChange={(value) => setFormData({ ...formData, yourBuilding: value })}
                  >
                    <SelectTrigger className="w-full min-w-[200px]">
                      <SelectValue placeholder="Select one" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Offices">Offices</SelectItem>
                      <SelectItem value="Retail">Retail</SelectItem>
                      <SelectItem value="Industrial">Industrial</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Your Building Section */}
            <div className="bg-white rounded-lg border border-gray-200 p-4 lg:p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4 lg:mb-6">Your building</h2>

              <div className="flex items-center gap-2 mb-6">
                <div className="flex items-center gap-2 px-3 py-1 text-gray-800 text-sm font-medium border-b-2 border-green-500">
                  Building A
                </div>
                <Button variant="outline" size="sm" className="h-7 w-7 p-0 bg-transparent">
                  +
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-6">
                <div className="space-y-2">
                  <Label htmlFor="building-superficy" className="text-sm font-medium text-gray-700">
                    Superficy <span className="text-red-500">*</span>
                  </Label>
                  <div className="relative">
                    <Input
                      id="building-superficy"
                      value={formData.buildingSuperficy}
                      onChange={(e) => setFormData({ ...formData, buildingSuperficy: e.target.value })}
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
                  <Select
                    value={formData.activitySector}
                    onValueChange={(value) => setFormData({ ...formData, activitySector: value })}
                  >
                    <SelectTrigger className="w-full min-w-[200px]">
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
                    <Input
                      id="electricity"
                      value={formData.electricityConsumption}
                      onChange={(e) => setFormData({ ...formData, electricityConsumption: e.target.value })}
                      placeholder="Type the number of buildings"
                      className="w-full pr-12"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500 font-bold">
                      kWh
                    </span>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="heating-type" className="text-sm font-medium text-gray-700">
                    Heating type <span className="text-red-500">*</span>
                  </Label>
                  <Select
                    value={formData.heatingType}
                    onValueChange={(value) => setFormData({ ...formData, heatingType: value })}
                  >
                    <SelectTrigger className="w-full min-w-[200px]">
                      <SelectValue placeholder="Select one" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Electric (including heat pumps)">Electric (including heat pumps)</SelectItem>
                      <SelectItem value="Gas">Gas</SelectItem>
                      <SelectItem value="Oil">Oil</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
                {/* PV Section */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="relative">
                      <span
                        className="text-sm font-medium text-gray-700 cursor-help"
                        onMouseEnter={() => setShowTooltip(true)}
                        onMouseLeave={() => setShowTooltip(false)}
                      >
                        PV
                      </span>
                      {showTooltip && (
                        <div className="absolute left-0 top-8 z-50 w-80 p-3 bg-gray-900 text-white text-xs rounded-lg shadow-lg">
                          If you don't know your solar capacity, would you know how many % of your roof is covered with
                          it? Typically, 1 panel of 400 Wp is 1.8 square meter
                        </div>
                      )}
                    </div>
                    <Switch
                      checked={formData.pvEnabled}
                      onCheckedChange={(checked) => setFormData({ ...formData, pvEnabled: checked })}
                    />
                  </div>
                  {formData.pvEnabled && (
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Label htmlFor="roof-covered" className="text-sm font-medium text-gray-700">
                          % Roof covered <span className="text-red-500">*</span>
                        </Label>
                        <div className="relative">
                          <Button variant="ghost" size="sm" className="h-4 w-4 p-0">
                            <Info className="h-3 w-3 text-gray-400" />
                          </Button>
                        </div>
                      </div>
                      <div className="relative">
                        <Input defaultValue="70" className="w-full pr-8" />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500">%</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Heat Pumps Section */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <span className="text-sm font-medium text-gray-700">Heat Pumps</span>
                    <Switch
                      checked={formData.heatPumpsEnabled}
                      onCheckedChange={(checked) => setFormData({ ...formData, heatPumpsEnabled: checked })}
                    />
                  </div>
                  {formData.heatPumpsEnabled && (
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Label htmlFor="heat-covered" className="text-sm font-medium text-gray-700">
                          % Heat covered <span className="text-red-500">*</span>
                        </Label>
                        <Info className="h-3 w-3 text-gray-400" />
                      </div>
                      <div className="relative">
                        <Input defaultValue="70" className="w-full pr-8" />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500">%</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* EV Chargers Section */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <span className="text-sm font-medium text-gray-700">EV Chargers</span>
                    <Switch
                      checked={formData.evChargersEnabled}
                      onCheckedChange={(checked) => setFormData({ ...formData, evChargersEnabled: checked })}
                    />
                  </div>
                  {formData.evChargersEnabled && (
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Label htmlFor="units" className="text-sm font-medium text-gray-700">
                            Units <span className="text-red-500">*</span>
                          </Label>
                          <Info className="h-3 w-3 text-gray-400" />
                        </div>
                        <Input defaultValue="10" className="w-full" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Label htmlFor="kw" className="text-sm font-medium text-gray-700">
                            kW <span className="text-red-500">*</span>
                          </Label>
                          <Info className="h-3 w-3 text-gray-400" />
                        </div>
                        <Input defaultValue="30" className="w-full" />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {formData.energyOptimizationEnabled && (
              <div className="bg-white rounded-lg border border-gray-200 p-4 lg:p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-medium text-gray-900">Energy Optimization & Flexibility</h2>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-green-600 font-medium">Activate</span>
                    <Switch
                      checked={formData.energyOptimizationEnabled}
                      onCheckedChange={(checked) => setFormData({ ...formData, energyOptimizationEnabled: checked })}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Light Option */}
                  <div
                    className="cursor-pointer"
                    onClick={() => setFormData({ ...formData, selectedScenario: "Light" })}
                  >
                    <div
                      className={`flex flex-col items-center justify-center p-6 border-2 rounded-lg transition-all ${
                        formData.selectedScenario === "Light"
                          ? "border-green-500 bg-green-50"
                          : "border-gray-200 bg-white hover:border-gray-300"
                      }`}
                    >
                      <LightIcon className="h-6 w-6 text-gray-400 mb-3" />
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-4 h-4 border-2 rounded-full flex items-center justify-center ${
                            formData.selectedScenario === "Light" ? "border-green-500" : "border-gray-300"
                          }`}
                        >
                          {formData.selectedScenario === "Light" && (
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          )}
                        </div>
                        <span className="text-sm font-medium text-gray-700">Light</span>
                        <Info className="h-3 w-3 text-gray-400" />
                      </div>
                    </div>
                  </div>

                  {/* Core Option */}
                  <div
                    className="cursor-pointer"
                    onClick={() => setFormData({ ...formData, selectedScenario: "Core" })}
                  >
                    <div
                      className={`flex flex-col items-center justify-center p-6 border-2 rounded-lg transition-all ${
                        formData.selectedScenario === "Core"
                          ? "border-green-500 bg-green-50"
                          : "border-gray-200 bg-white hover:border-gray-300"
                      }`}
                    >
                      <div
                        className={`w-6 h-6 mb-3 rounded-full border-2 flex items-center justify-center ${
                          formData.selectedScenario === "Core"
                            ? "border-green-500 bg-green-500"
                            : "border-gray-400 bg-gray-100"
                        }`}
                      >
                        {formData.selectedScenario === "Core" && (
                          <div className="w-3 h-3 bg-white rounded-full flex items-center justify-center">
                            <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                          </div>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-4 h-4 border-2 rounded-full flex items-center justify-center ${
                            formData.selectedScenario === "Core" ? "border-green-500" : "border-gray-300"
                          }`}
                        >
                          {formData.selectedScenario === "Core" && (
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          )}
                        </div>
                        <span
                          className={`text-sm font-medium ${
                            formData.selectedScenario === "Core" ? "text-green-700" : "text-gray-700"
                          }`}
                        >
                          Core
                        </span>
                        <Info className="h-3 w-3 text-gray-400" />
                      </div>
                    </div>
                  </div>

                  {/* Advanced Option */}
                  <div
                    className="cursor-pointer"
                    onClick={() => setFormData({ ...formData, selectedScenario: "Advanced" })}
                  >
                    <div
                      className={`flex flex-col items-center justify-center p-6 border-2 rounded-lg transition-all ${
                        formData.selectedScenario === "Advanced"
                          ? "border-green-500 bg-green-50"
                          : "border-gray-200 bg-white hover:border-gray-300"
                      }`}
                    >
                      <Star className="h-6 w-6 text-gray-400 mb-3" />
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-4 h-4 border-2 rounded-full flex items-center justify-center ${
                            formData.selectedScenario === "Advanced" ? "border-green-500" : "border-gray-300"
                          }`}
                        >
                          {formData.selectedScenario === "Advanced" && (
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          )}
                        </div>
                        <span className="text-sm font-medium text-gray-700">Advanced</span>
                        <Info className="h-3 w-3 text-gray-400" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="hidden">
                  <input
                    type="radio"
                    name="scenario"
                    value="Light"
                    checked={formData.selectedScenario === "Light"}
                    onChange={(e) => setFormData({ ...formData, selectedScenario: e.target.value })}
                  />
                  <input
                    type="radio"
                    name="scenario"
                    value="Core"
                    checked={formData.selectedScenario === "Core"}
                    onChange={(e) => setFormData({ ...formData, selectedScenario: e.target.value })}
                  />
                  <input
                    type="radio"
                    name="scenario"
                    value="Advanced"
                    checked={formData.selectedScenario === "Advanced"}
                    onChange={(e) => setFormData({ ...formData, selectedScenario: e.target.value })}
                  />
                </div>
              </div>
            )}

            <div className="bg-white rounded-lg border border-gray-200 p-4 lg:p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4 lg:mb-6">Additional assets</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
                {/* Additional PV */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <span className="text-sm font-medium text-gray-700">PV</span>
                    <Switch
                      checked={formData.additionalPvEnabled}
                      onCheckedChange={(checked) => setFormData({ ...formData, additionalPvEnabled: checked })}
                    />
                  </div>
                  {formData.additionalPvEnabled && (
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Label htmlFor="roof-conversion" className="text-sm font-medium text-gray-700">
                          Roof conversion <span className="text-red-500">*</span>
                        </Label>
                        <Info className="h-3 w-3 text-gray-400" />
                      </div>
                      <div className="relative">
                        <Input defaultValue="70" className="w-full pr-8" />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500">%</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Additional Heat Pumps */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <span className="text-sm font-medium text-gray-700">Heat Pumps</span>
                    <Switch
                      checked={formData.additionalHeatPumpsEnabled}
                      onCheckedChange={(checked) => setFormData({ ...formData, additionalHeatPumpsEnabled: checked })}
                    />
                  </div>
                  {formData.additionalHeatPumpsEnabled && (
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Label htmlFor="building-conversion" className="text-sm font-medium text-gray-700">
                          Building conversion <span className="text-red-500">*</span>
                        </Label>
                        <Info className="h-3 w-3 text-gray-400" />
                      </div>
                      <div className="relative">
                        <Input defaultValue="70" className="w-full pr-8" />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500">%</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Additional EV Chargers */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <span className="text-sm font-medium text-gray-700">EV Chargers</span>
                    <Switch
                      checked={formData.additionalEvChargersEnabled}
                      onCheckedChange={(checked) => setFormData({ ...formData, additionalEvChargersEnabled: checked })}
                    />
                  </div>
                  {formData.additionalEvChargersEnabled && (
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Label htmlFor="additional-units" className="text-sm font-medium text-gray-700">
                            Units <span className="text-red-500">*</span>
                          </Label>
                          <Info className="h-3 w-3 text-gray-400" />
                        </div>
                        <Input defaultValue="10" className="w-full" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Label htmlFor="additional-kwh" className="text-sm font-medium text-gray-700">
                            kWh <span className="text-red-500">*</span>
                          </Label>
                          <Info className="h-3 w-3 text-gray-400" />
                        </div>
                        <Input defaultValue="30" className="w-full" />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-4 lg:p-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-gray-600" />
                  <h2 className="text-lg font-medium text-gray-900">Profitability</h2>
                </div>
                <div className="flex flex-wrap items-center gap-2 lg:gap-3">
                  <Button variant="outline" size="sm" className="bg-transparent">
                    €
                  </Button>
                  <Button variant="outline" size="sm" className="bg-transparent">
                    CO2
                  </Button>
                  <Button variant="outline" size="sm" className="flex items-center gap-2 bg-transparent">
                    <Calendar className="h-4 w-4" />
                    <span className="hidden sm:inline">Per year</span>
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

              {/* Top Bar Chart */}
              <div className="h-48 mb-8">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 40 }}>
                    <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#6B7280" }} />
                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 12, fill: "#6B7280" }}
                      tickFormatter={(value) => `${value}k`}
                      domain={[0, 80]}
                    />
                    <Bar dataKey="existingAssets" fill="#22C55E" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
                <div className="flex items-center justify-between mt-2">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded-sm"></div>
                    <span className="text-xs text-gray-500">Existing assets</span>
                  </div>
                  <span className="text-xs text-gray-500">All figures are in Euro (€)</span>
                </div>
              </div>

              {/* Summary Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="text-sm text-gray-600 mb-1">Total decarbonisation</div>
                  <div className="text-2xl font-bold text-gray-900">
                    700 <span className="text-sm font-normal text-gray-500">tCO2e</span>
                  </div>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="text-sm text-gray-600 mb-1">Total revenue estimated</div>
                  <div className="text-2xl font-bold text-gray-900">
                    400k <span className="text-sm font-normal text-gray-500">€</span>
                  </div>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="text-sm text-gray-600 mb-1">Total investment estimated</div>
                  <div className="text-2xl font-bold text-gray-900">
                    50k <span className="text-sm font-normal text-gray-500">€</span>
                  </div>
                </div>
              </div>

              {/* Emissions by Category Section */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-900">Emissions by category</h3>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" className="bg-transparent">
                      This year
                    </Button>
                    <Button variant="outline" size="sm" className="flex items-center gap-2 bg-transparent">
                      <Filter className="h-4 w-4" />
                      Filters
                    </Button>
                    <Button variant="outline" size="sm" className="flex items-center gap-2 bg-transparent">
                      <Download className="h-4 w-4" />
                      Download
                    </Button>
                  </div>
                </div>

                {/* Treemap Visualization */}
                <div className="grid grid-cols-12 grid-rows-6 gap-1 h-80 mb-4">
                  {/* Large rectangle - Additional assets: PV */}
                  <div
                    className="col-span-5 row-span-6 rounded-lg flex items-center justify-center text-white font-bold text-xl"
                    style={{ backgroundColor: treemapData[0].color }}
                  >
                    {treemapData[0].value}
                  </div>

                  {/* Medium rectangle - Additional assets: Heatpumps */}
                  <div
                    className="col-span-4 row-span-4 rounded-lg flex items-center justify-center text-white font-bold text-lg"
                    style={{ backgroundColor: treemapData[1].color }}
                  >
                    {treemapData[1].value}
                  </div>

                  {/* Small rectangle - Energy optimization: Demand side management */}
                  <div
                    className="col-span-4 row-span-2 rounded-lg flex items-center justify-center text-white font-bold text-sm"
                    style={{ backgroundColor: treemapData[3].color }}
                  >
                    {treemapData[3].value}
                  </div>

                  {/* Medium-small rectangle - Additional assets: EV Chargers */}
                  <div
                    className="col-span-3 row-span-6 rounded-lg flex items-center justify-center text-white font-bold text-lg"
                    style={{ backgroundColor: treemapData[2].color }}
                  >
                    {treemapData[2].value}
                  </div>

                  {/* Small rectangles on the right */}
                  <div
                    className="col-span-2 row-span-2 rounded-lg flex items-center justify-center text-white font-bold text-xs"
                    style={{ backgroundColor: treemapData[5].color }}
                  >
                    {treemapData[5].value}
                  </div>

                  <div
                    className="col-span-2 row-span-2 rounded-lg flex items-center justify-center text-white font-bold text-xs"
                    style={{ backgroundColor: treemapData[6].color }}
                  >
                    {treemapData[6].value}
                  </div>

                  <div
                    className="col-span-2 row-span-2 rounded-lg flex items-center justify-center text-white font-bold text-xs"
                    style={{ backgroundColor: treemapData[4].color }}
                  >
                    {treemapData[4].value}
                  </div>
                </div>

                {/* Legend */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-gray-600">
                  {treemapData.map((item, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: item.color }}></div>
                      <span>{item.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
