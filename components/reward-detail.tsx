"use client"

import { ArrowLeft, CheckCircle, Clock, Building2, TrendingUp, Award, Gift, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"
import { useState } from "react"

// Mock data for demonstration
const mockDetailData = {
  id: "1",
  partnerName: "株式会社テックソリューション",
  totalReward: 6600,
  status: "pending",
  targetMonth: "2024年1月",
  lastUpdated: "2024-01-15",
  approvedBy: null,
  approvedDate: null,

  // ランク報酬詳細
  rankReward: {
    appliedRank: "Gold",
    unitPrice: 550,
    targetShops: [
      { shopName: "焼肉亭やまと", continuousMonths: 8, reward: 550 },
      { shopName: "ネイルサロン美麗", continuousMonths: 12, reward: 550 },
      { shopName: "宝石店きらめき", continuousMonths: 6, reward: 550 },
      { shopName: "焼鳥居酒屋とりまる", continuousMonths: 15, reward: 550 },
      { shopName: "ネイルアート彩", continuousMonths: 4, reward: 550 },
      { shopName: "ジュエリーショップ輝", continuousMonths: 9, reward: 550 },
      { shopName: "カフェ＆テイクアウト風", continuousMonths: 7, reward: 550 },
      { shopName: "ネイルスタジオ花", continuousMonths: 11, reward: 550 },
    ],
    subtotal: 4400,
  },

  // 継続サイクル報酬詳細
  cycleReward: {
    achievements: [
      { shopName: "焼肉亭やまと", continuousMonths: 12, cycleType: "3ヶ月サイクル", cycleCount: 4, reward: 1650 },
      { shopName: "ネイルサロン美麗", continuousMonths: 6, cycleType: "3ヶ月サイクル", cycleCount: 2, reward: 1100 },
      { shopName: "宝石店きらめき", continuousMonths: 3, cycleType: "3ヶ月サイクル", cycleCount: 1, reward: 550 },
    ],
    subtotal: 3300,
  },

  // ボーナス詳細
  bonusReward: {
    achievements: [{ condition: "継続店舗数8店舗以上", targetShopCount: 8, reward: 550 }],
    subtotal: 550,
  },
}

interface RewardDetailProps {
  partnerId: string
}

export function RewardDetail({ partnerId }: RewardDetailProps) {
  const data = mockDetailData // In real app, fetch by partnerId
  const [showConfirmDialog, setShowConfirmDialog] = useState(false)

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("ja-JP", {
      style: "currency",
      currency: "JPY",
      minimumFractionDigits: 0,
    }).format(amount)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("ja-JP", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

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

  const handleApprove = () => {
    setShowConfirmDialog(true)
  }

  const confirmApproval = () => {
    console.log("[v0] Approving reward for partner:", partnerId)
    setShowConfirmDialog(false)
    alert("報酬を承認しました")
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/rewards">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-1" />
              一覧に戻る
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-foreground">
              <Link href={`/partners/${partnerId}`} className="hover:text-cyan-600 transition-colors">
                {data.partnerName}
              </Link>
            </h1>
            <p className="text-muted-foreground mt-1">{data.targetMonth}分の報酬詳細</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {getStatusBadge(data.status)}
          {data.status === "pending" && (
            <Button onClick={handleApprove} className="bg-emerald-600 hover:bg-emerald-700">
              <CheckCircle className="h-4 w-4 mr-1" />
              承認する
            </Button>
          )}
        </div>
      </div>

      {/* Approval Info Section */}
      {data.status === "approved" && data.approvedBy && data.approvedDate && (
        <Card className="bg-emerald-50 border-emerald-200">
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 text-emerald-700">
              <User className="h-4 w-4" />
              <span className="font-medium">承認者:</span>
              <span>{data.approvedBy}</span>
              <span className="text-emerald-600 ml-4">承認日時:</span>
              <span>{formatDate(data.approvedDate)}</span>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building2 className="h-5 w-5" />
            報酬サマリ
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-sm text-muted-foreground mb-1">総報酬額</div>
              <div className="text-2xl font-bold text-foreground">{formatCurrency(data.totalReward)}</div>
            </div>
            <div className="text-center">
              <div className="text-sm text-muted-foreground mb-1">ランク報酬</div>
              <div className="text-xl font-semibold text-cyan-600">{formatCurrency(data.rankReward.subtotal)}</div>
            </div>
            <div className="text-center">
              <div className="text-sm text-muted-foreground mb-1">継続サイクル報酬</div>
              <div className="text-xl font-semibold text-emerald-600">{formatCurrency(data.cycleReward.subtotal)}</div>
            </div>
            <div className="text-center">
              <div className="text-sm text-muted-foreground mb-1">ボーナス</div>
              <div className="text-xl font-semibold text-amber-600">{formatCurrency(data.bonusReward.subtotal)}</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ランク報酬詳細 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-cyan-600" />
            ランク報酬詳細
          </CardTitle>
          <div className="text-sm text-muted-foreground">
            適用ランク:{" "}
            <Badge variant="outline" className="ml-1">
              {data.rankReward.appliedRank}
            </Badge>
            　単価: {formatCurrency(data.rankReward.unitPrice)}
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ショップ名</TableHead>
                <TableHead className="text-center">継続月数</TableHead>
                <TableHead className="text-right">報酬額</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.rankReward.targetShops.map((shop, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{shop.shopName}</TableCell>
                  <TableCell className="text-center">{shop.continuousMonths}ヶ月</TableCell>
                  <TableCell className="text-right">{formatCurrency(shop.reward)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Separator className="my-4" />
          <div className="flex justify-end">
            <div className="text-right">
              <div className="text-sm text-muted-foreground">小計</div>
              <div className="text-lg font-semibold">{formatCurrency(data.rankReward.subtotal)}</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 継続サイクル報酬詳細 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5 text-emerald-600" />
            継続サイクル報酬詳細
          </CardTitle>
          <div className="text-sm text-muted-foreground">
            サイクル種別:{" "}
            <Badge variant="outline" className="ml-1 bg-emerald-50 text-emerald-700 border-emerald-200">
              3ヶ月サイクル
            </Badge>
            　単価: ¥550 / サイクル
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ショップ名</TableHead>
                <TableHead className="text-center">継続月数</TableHead>
                <TableHead className="text-center">達成サイクル数</TableHead>
                <TableHead className="text-right">報酬額</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.cycleReward.achievements.map((achievement, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{achievement.shopName}</TableCell>
                  <TableCell className="text-center">{achievement.continuousMonths}ヶ月</TableCell>
                  <TableCell className="text-center">{achievement.cycleCount}回</TableCell>
                  <TableCell className="text-right">{formatCurrency(achievement.reward)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Separator className="my-4" />
          <div className="flex justify-end">
            <div className="text-right">
              <div className="text-sm text-muted-foreground">小計</div>
              <div className="text-lg font-semibold">{formatCurrency(data.cycleReward.subtotal)}</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ボーナス詳細 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Gift className="h-5 w-5 text-amber-600" />
            ボーナス詳細
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>達成条件</TableHead>
                <TableHead className="text-center">対象店舗数</TableHead>
                <TableHead className="text-right">報酬額</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.bonusReward.achievements.map((achievement, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{achievement.condition}</TableCell>
                  <TableCell className="text-center">{achievement.targetShopCount}店舗</TableCell>
                  <TableCell className="text-right">{formatCurrency(achievement.reward)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Separator className="my-4" />
          <div className="flex justify-end">
            <div className="text-right">
              <div className="text-sm text-muted-foreground">小計</div>
              <div className="text-lg font-semibold">{formatCurrency(data.bonusReward.subtotal)}</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Confirmation Dialog */}
      {showConfirmDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold mb-4">承認確認</h3>
            <p className="text-muted-foreground mb-6">
              {data.partnerName}の{data.targetMonth}分の報酬（{formatCurrency(data.totalReward)}）を承認しますか？
            </p>
            <div className="flex gap-3 justify-end">
              <Button variant="outline" onClick={() => setShowConfirmDialog(false)}>
                キャンセル
              </Button>
              <Button onClick={confirmApproval} className="bg-emerald-600 hover:bg-emerald-700">
                承認する
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
