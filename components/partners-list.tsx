"use client"

import { useState } from "react"
import { Search, Eye, Mail, Phone, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"

interface Partner {
  id: string
  name: string
  email: string
  phone: string
  registeredDate: string
  status: "active" | "inactive" | "pending"
  totalShops: number
  monthlyRevenue: number
  rank: string
}

const mockPartners: Partner[] = [
  {
    id: "1",
    name: "株式会社フードマーケティング",
    email: "contact@food-marketing.co.jp",
    phone: "03-1234-5678",
    registeredDate: "2024-01-15",
    status: "active",
    totalShops: 12,
    monthlyRevenue: 6600,
    rank: "Gold",
  },
  {
    id: "2",
    name: "ビューティーソリューションズ合同会社",
    email: "info@beauty-solutions.jp",
    phone: "06-9876-5432",
    registeredDate: "2024-02-20",
    status: "active",
    totalShops: 8,
    monthlyRevenue: 4400,
    rank: "Silver",
  },
  {
    id: "3",
    name: "リテールパートナーズ株式会社",
    email: "sales@retail-partners.com",
    phone: "03-5555-1111",
    registeredDate: "2024-03-10",
    status: "pending",
    totalShops: 3,
    monthlyRevenue: 1650,
    rank: "Bronze",
  },
  {
    id: "4",
    name: "地域商店サポート協会",
    email: "support@local-shops.or.jp",
    phone: "092-777-8888",
    registeredDate: "2023-11-05",
    status: "active",
    totalShops: 15,
    monthlyRevenue: 8250,
    rank: "Platinum",
  },
  {
    id: "5",
    name: "デジタル販促株式会社",
    email: "digital@promo-solutions.jp",
    phone: "03-2222-3333",
    registeredDate: "2024-01-30",
    status: "inactive",
    totalShops: 5,
    monthlyRevenue: 0,
    rank: "Bronze",
  },
]

export function PartnersList() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [rankFilter, setRankFilter] = useState<string>("all")

  const filteredPartners = mockPartners.filter((partner) => {
    const matchesSearch =
      partner.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      partner.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || partner.status === statusFilter
    const matchesRank = rankFilter === "all" || partner.rank === rankFilter

    return matchesSearch && matchesStatus && matchesRank
  })

  const getStatusBadge = (status: Partner["status"]) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">アクティブ</Badge>
      case "inactive":
        return <Badge variant="secondary">非アクティブ</Badge>
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">承認待ち</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getRankBadge = (rank: string) => {
    const colors = {
      Platinum: "bg-purple-100 text-purple-800 hover:bg-purple-100",
      Gold: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100",
      Silver: "bg-gray-100 text-gray-800 hover:bg-gray-100",
      Bronze: "bg-orange-100 text-orange-800 hover:bg-orange-100",
    }
    return <Badge className={colors[rank as keyof typeof colors] || "bg-gray-100 text-gray-800"}>{rank}</Badge>
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-balance">代理店一覧</h1>
          <p className="text-muted-foreground">登録されている代理店の管理</p>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">検索・フィルタ</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4 md:flex-row md:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="代理店名またはメールアドレスで検索..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-40">
                <SelectValue placeholder="ステータス" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">全てのステータス</SelectItem>
                <SelectItem value="active">アクティブ</SelectItem>
                <SelectItem value="inactive">非アクティブ</SelectItem>
                <SelectItem value="pending">承認待ち</SelectItem>
              </SelectContent>
            </Select>
            <Select value={rankFilter} onValueChange={setRankFilter}>
              <SelectTrigger className="w-full md:w-32">
                <SelectValue placeholder="ランク" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">全てのランク</SelectItem>
                <SelectItem value="Platinum">Platinum</SelectItem>
                <SelectItem value="Gold">Gold</SelectItem>
                <SelectItem value="Silver">Silver</SelectItem>
                <SelectItem value="Bronze">Bronze</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Partners List */}
      <div className="grid gap-4">
        {filteredPartners.map((partner) => (
          <Card key={partner.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <h3 className="text-lg font-semibold">{partner.name}</h3>
                    {getStatusBadge(partner.status)}
                    {getRankBadge(partner.rank)}
                  </div>
                  <div className="flex flex-col gap-1 text-sm text-muted-foreground md:flex-row md:gap-4">
                    <div className="flex items-center gap-1">
                      <Mail className="h-3 w-3" />
                      {partner.email}
                    </div>
                    <div className="flex items-center gap-1">
                      <Phone className="h-3 w-3" />
                      {partner.phone}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      登録日: {new Date(partner.registeredDate).toLocaleDateString("ja-JP")}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-2 md:flex-row md:items-center">
                  <div className="text-right text-sm">
                    <div className="font-medium">紹介ショップ数: {partner.totalShops}店</div>
                    <div className="text-muted-foreground">月次報酬: ¥{partner.monthlyRevenue.toLocaleString()}</div>
                  </div>
                  <Link href={`/partners/${partner.id}`}>
                    <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                      <Eye className="h-4 w-4" />
                      詳細
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredPartners.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <p className="text-muted-foreground">検索条件に一致する代理店が見つかりませんでした。</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
