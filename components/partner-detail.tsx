"use client"
import { ArrowLeft, Mail, Phone, Calendar, Building, TrendingUp, Award, Users, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
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
  address: string
  representative: string
}

interface Shop {
  id: string
  name: string
  type: string
  registeredDate: string
  status: "利用継続中" | "トライアル中" | "利用停止中"
  monthlyFee: number
}

interface RewardHistory {
  month: string
  rankReward: number
  milestoneReward: number
  bonusReward: number
  total: number
  approvedBy: string
  approvedDate: string
  status: "承認待ち" | "承認済み"
}

interface Bonus {
  condition: string
  achievedDate: string
  amount: number
  status: "達成済み" | "承認待ち"
}

const mockPartner: Partner = {
  id: "1",
  name: "株式会社フードマーケティング",
  email: "contact@food-marketing.co.jp",
  phone: "03-1234-5678",
  registeredDate: "2024-01-15",
  status: "active",
  totalShops: 12,
  monthlyRevenue: 6600,
  rank: "Gold",
  address: "東京都渋谷区渋谷1-1-1",
  representative: "田中 太郎",
}

const mockShops: Shop[] = [
  {
    id: "1",
    name: "焼肉HANABI 渋谷店",
    type: "焼肉店",
    registeredDate: "2024-02-01",
    status: "利用継続中",
    monthlyFee: 550,
  },
  {
    id: "2",
    name: "ネイルサロン Sparkle",
    type: "ネイルサロン",
    registeredDate: "2024-02-15",
    status: "利用継続中",
    monthlyFee: 550,
  },
  {
    id: "3",
    name: "宝石店 Diamond Heart",
    type: "宝石店",
    registeredDate: "2024-03-01",
    status: "利用継続中",
    monthlyFee: 550,
  },
  {
    id: "4",
    name: "カフェ&テイクアウト MOMO",
    type: "カフェ",
    registeredDate: "2024-03-10",
    status: "トライアル中",
    monthlyFee: 0,
  },
]

const mockRewardHistory: RewardHistory[] = [
  {
    month: "2024年12月",
    rankReward: 5500,
    milestoneReward: 0,
    bonusReward: 5500,
    total: 11000,
    approvedBy: "",
    approvedDate: "",
    status: "承認待ち",
  },
  {
    month: "2024年11月",
    rankReward: 5500,
    milestoneReward: 1650,
    bonusReward: 0,
    total: 7150,
    approvedBy: "管理者A",
    approvedDate: "2024-12-18",
    status: "承認済み",
  },
  {
    month: "2024年9月",
    rankReward: 4950,
    milestoneReward: 1650,
    bonusReward: 5500,
    total: 12100,
    approvedBy: "管理者A",
    approvedDate: "2024-10-20",
    status: "承認済み",
  },
]

const achievedBonuses: Bonus[] = [
  {
    condition: "10店達成ボーナス",
    achievedDate: "2024年9月",
    amount: 5500,
    status: "達成済み",
  },
  {
    condition: "12店達成ボーナス",
    achievedDate: "2024年12月",
    amount: 5500,
    status: "承認待ち",
  },
]

interface PartnerDetailProps {
  partnerId: string
}

export function PartnerDetail({ partnerId }: PartnerDetailProps) {
  const partner = mockPartner // In real app, fetch by partnerId

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

  const getShopStatusBadge = (status: Shop["status"]) => {
    switch (status) {
      case "利用継続中":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">利用継続中</Badge>
      case "トライアル中":
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">トライアル中</Badge>
      case "利用停止中":
        return <Badge variant="secondary">利用停止中</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getRewardStatusBadge = (status: RewardHistory["status"]) => {
    switch (status) {
      case "承認待ち":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">承認待ち</Badge>
      case "承認済み":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">承認済み</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getBonusStatusBadge = (status: Bonus["status"]) => {
    switch (status) {
      case "達成済み":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">達成済み</Badge>
      case "承認待ち":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">承認待ち</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/partners">
          <Button variant="outline" size="sm" className="gap-2 bg-transparent">
            <ArrowLeft className="h-4 w-4" />
            代理店一覧に戻る
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-balance">{partner.name}</h1>
          <p className="text-muted-foreground">代理店詳細情報</p>
        </div>
      </div>

      {/* Basic Info */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building className="h-5 w-5" />
            基本情報
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <span className="font-medium">ステータス:</span>
                {getStatusBadge(partner.status)}
                {getRankBadge(partner.rank)}
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span>{partner.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span>{partner.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span>登録日: {new Date(partner.registeredDate).toLocaleDateString("ja-JP")}</span>
              </div>
            </div>
            <div className="space-y-3">
              <div>
                <span className="font-medium">代表者:</span>
                <span className="ml-2">{partner.representative}</span>
              </div>
              <div>
                <span className="font-medium">住所:</span>
                <span className="ml-2">{partner.address}</span>
              </div>
              <div>
                <span className="font-medium">紹介ショップ数:</span>
                <span className="ml-2">{partner.totalShops}店</span>
              </div>
              <div>
                <span className="font-medium">月次報酬:</span>
                <span className="ml-2 font-semibold text-green-600">¥{partner.monthlyRevenue.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Introduced Shops */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            紹介ショップ一覧
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ショップ名</TableHead>
                <TableHead>業種</TableHead>
                <TableHead>登録日</TableHead>
                <TableHead>ステータス</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockShops.map((shop) => (
                <TableRow key={shop.id}>
                  <TableCell className="font-medium">{shop.name}</TableCell>
                  <TableCell>{shop.type}</TableCell>
                  <TableCell>{new Date(shop.registeredDate).toLocaleDateString("ja-JP")}</TableCell>
                  <TableCell>{getShopStatusBadge(shop.status)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Reward History */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            報酬履歴
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>対象月</TableHead>
                <TableHead>ランク報酬</TableHead>
                <TableHead>継続サイクル報酬</TableHead>
                <TableHead>ボーナス</TableHead>
                <TableHead>合計</TableHead>
                <TableHead>ステータス</TableHead>
                <TableHead>承認者</TableHead>
                <TableHead>承認日</TableHead>
                <TableHead>操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockRewardHistory.map((reward, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{reward.month}</TableCell>
                  <TableCell>¥{reward.rankReward.toLocaleString()}</TableCell>
                  <TableCell>¥{reward.milestoneReward.toLocaleString()}</TableCell>
                  <TableCell>¥{reward.bonusReward.toLocaleString()}</TableCell>
                  <TableCell className="font-semibold">¥{reward.total.toLocaleString()}</TableCell>
                  <TableCell>{getRewardStatusBadge(reward.status)}</TableCell>
                  <TableCell>{reward.approvedBy || "-"}</TableCell>
                  <TableCell>
                    {reward.approvedDate ? new Date(reward.approvedDate).toLocaleDateString("ja-JP") : "-"}
                  </TableCell>
                  <TableCell>
                    <Link href={`/rewards/${partner.id}?month=${encodeURIComponent(reward.month)}`}>
                      <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                        <Eye className="h-3 w-3" />
                        詳細確認
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Reward System Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5" />
            報酬体系設定
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">ランク設定</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>現在のランク:</span>
                    <span className="font-semibold">{partner.rank}</span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    <span>利用可能ランク:</span>
                    <div className="mt-1 space-y-1">
                      <div>Bronze (1-4店): ¥550</div>
                      <div>Silver (5-9店): ¥550</div>
                      <div>Gold (10-19店): ¥550</div>
                      <div>Platinum (20店以上): ¥550</div>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <span>月額単価:</span>
                    <span>¥550</span>
                  </div>
                  <div className="flex justify-between">
                    <span>必要継続ショップ数:</span>
                    <span>10店以上</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">継続サイクル報酬</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>サイクル種別:</span>
                    <span className="font-semibold">3ヶ月ごと</span>
                  </div>
                  <div className="flex justify-between">
                    <span>サイクル報酬額:</span>
                    <span>¥1,650</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">ボーナス設定</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>10店達成:</span>
                    <span>¥5,500</span>
                  </div>
                  <div className="flex justify-between">
                    <span>20店達成:</span>
                    <span>¥11,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span>30店達成:</span>
                    <span>¥16,500</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>

      {/* Achieved Bonuses */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5" />
            達成したボーナス
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>達成条件</TableHead>
                <TableHead>達成日</TableHead>
                <TableHead>報酬額</TableHead>
                <TableHead>ステータス</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {achievedBonuses.map((bonus, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{bonus.condition}</TableCell>
                  <TableCell>{bonus.achievedDate}</TableCell>
                  <TableCell className="font-semibold text-green-600">¥{bonus.amount.toLocaleString()}</TableCell>
                  <TableCell>{getBonusStatusBadge(bonus.status)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
