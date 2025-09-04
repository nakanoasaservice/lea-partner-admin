import { DashboardLayout } from "@/components/dashboard-layout"
import { MonthlyRewardsList } from "@/components/monthly-rewards-list"

export default function RewardsPage() {
  return (
    <DashboardLayout currentPage="rewards">
      <MonthlyRewardsList />
    </DashboardLayout>
  )
}
