"use client"

import { useState } from "react"
import { Search, Filter, ChevronDown, CheckCircle, Clock, Eye, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import Link from "next/link"

// Mock data for demonstration
const mockRewardsData = [
  {
    id: "1",
    partnerName: "株式会社テックソリューション",
    totalReward: 6600,
    status: "pending",
    rankReward: 4400,
    milestoneReward: 1650,
    bonusReward: 550,
    shopCount: 12,
    lastUpdated: "2024-01-15",
  },
  {
    id: "2",
    partnerName: "デジタルマーケティング合同会社",
    totalReward: 4950,
    status: "approved",
    rankReward: 3300,
    milestoneReward: 1100,
    bonusReward: 550,
    shopCount: 8,
    lastUpdated: "2024-01-15",
  },
  {
    id: "3",
    partnerName: "イノベーション株式会社",
    totalReward: 11550,
    status: "pending",
    rankReward: 7700,
    milestoneReward: 3300,
    bonusReward: 550,
    shopCount: 18,
    lastUpdated: "2024-01-15",
  },
  {
    id: "4",
    partnerName: "クリエイティブパートナーズ",
    totalReward: 2750,
    status: "approved",
    rankReward: 2200,
    milestoneReward: 550,
    bonusReward: 0,
    shopCount: 4,
    lastUpdated: "2024-01-15",
  },
]

export function MonthlyRewardsList() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [sortBy, setSortBy] = useState("totalReward")
  const [selectedMonth, setSelectedMonth] = useState("2024-01")
  const [rewardsData, setRewardsData] = useState(mockRewardsData)

  const filteredData = rewardsData
    .filter((item) => {
      const matchesSearch = item.partnerName.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesStatus = statusFilter === "all" || item.status === statusFilter
      return matchesSearch && matchesStatus
    })
    .sort((a, b) => {
      if (sortBy === "totalReward") return b.totalReward - a.totalReward
      if (sortBy === "partnerName") return a.partnerName.localeCompare(b.partnerName)
      return 0
    })

  const getStatusBadge = (status: string) => {
    if (status === "pending") {
      return (
        <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
          <Clock className="w-3 h-3 mr-1" />
          承認待ち
        </Badge>
      )
    }
    return (
      <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200">
        <CheckCircle className="w-3 h-3 mr-1" />
        承認済み
      </Badge>
    )
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("ja-JP", {
      style: "currency",
      currency: "JPY",
      minimumFractionDigits: 0,
    }).format(amount)
  }

  const formatMonthDisplay = (monthStr: string) => {
    const [year, month] = monthStr.split("-")
    return `${year}年${Number.parseInt(month)}月`
  }

  const getApprovalDeadline = (monthStr: string) => {
    const [year, month] = monthStr.split("-")
    return `${year}年${Number.parseInt(month)}月20日`
  }

  const pendingCount = rewardsData.filter((item) => item.status === "pending").length
  const totalPendingAmount = rewardsData
    .filter((item) => item.status === "pending")
    .reduce((sum, item) => sum + item.totalReward, 0)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">月次報酬一覧</h1>
          <p className="text-muted-foreground mt-1">
            {formatMonthDisplay(selectedMonth)}分の代理店報酬
            <span className="ml-2 text-amber-600 font-medium">承認期限: {getApprovalDeadline(selectedMonth)}</span>
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={selectedMonth} onValueChange={setSelectedMonth}>
            <SelectTrigger className="w-48">
              <Calendar className="h-4 w-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2024-01">2024年1月</SelectItem>
              <SelectItem value="2023-12">2023年12月</SelectItem>
              <SelectItem value="2023-11">2023年11月</SelectItem>
              <SelectItem value="2023-10">2023年10月</SelectItem>
            </SelectContent>
          </Select>
          <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
            承認待ち: {pendingCount}件
          </Badge>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">承認待ち総額</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-600">{formatCurrency(totalPendingAmount)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">対象代理店数</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{rewardsData.length}社</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">承認進捗</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-600">
              {Math.round(((rewardsData.length - pendingCount) / rewardsData.length) * 100)}%
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="代理店名で検索..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="ステータス" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">すべて</SelectItem>
                <SelectItem value="pending">承認待ち</SelectItem>
                <SelectItem value="approved">承認済み</SelectItem>
              </SelectContent>
            </Select>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full sm:w-48">
                <ChevronDown className="h-4 w-4 mr-2" />
                <SelectValue placeholder="並び順" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="totalReward">報酬額順</SelectItem>
                <SelectItem value="partnerName">代理店名順</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Data Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>代理店名</TableHead>
                <TableHead className="text-right">総報酬額</TableHead>
                <TableHead className="text-right">ランク報酬</TableHead>
                <TableHead className="text-right">継続サイクル</TableHead>
                <TableHead className="text-right">ボーナス</TableHead>
                <TableHead className="text-center">対象店舗数</TableHead>
                <TableHead className="text-center">ステータス</TableHead>
                <TableHead className="text-center">操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.partnerName}</TableCell>
                  <TableCell className="text-right font-semibold">{formatCurrency(item.totalReward)}</TableCell>
                  <TableCell className="text-right">{formatCurrency(item.rankReward)}</TableCell>
                  <TableCell className="text-right">{formatCurrency(item.milestoneReward)}</TableCell>
                  <TableCell className="text-right">
                    {item.bonusReward > 0 ? formatCurrency(item.bonusReward) : "-"}
                  </TableCell>
                  <TableCell className="text-center">{item.shopCount}店舗</TableCell>
                  <TableCell className="text-center">{getStatusBadge(item.status)}</TableCell>
                  <TableCell className="text-center">
                    <Link href={`/rewards/${item.id}`}>
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4 mr-1" />
                        詳細
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
