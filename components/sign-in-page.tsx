"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation"

export function SignInPage() {
  const router = useRouter()

  const handleSignIn = () => {
    router.push("/rewards")
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center space-y-2">
          <CardTitle className="text-2xl font-bold text-balance">LEA Partner Admin</CardTitle>
          <CardDescription className="text-muted-foreground">報酬管理システムにサインインしてください</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">メールアドレス</Label>
            <Input id="email" type="email" placeholder="admin@example.com" className="w-full" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">パスワード</Label>
            <Input id="password" type="password" placeholder="••••••••" className="w-full" />
          </div>
          <Button className="w-full" size="lg" onClick={handleSignIn}>
            サインイン
          </Button>
          <p className="text-xs text-muted-foreground text-center">
            社内管理者向けシステムです。アクセス権限が必要です。
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
