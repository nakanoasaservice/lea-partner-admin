import { DashboardLayout } from "@/components/dashboard-layout"
import { RewardDetail } from "@/components/reward-detail"

interface RewardDetailPageProps {
  params: {
    id: string
  }
}

export default function RewardDetailPage({ params }: RewardDetailPageProps) {
  return (
    <DashboardLayout currentPage="rewards">
      <RewardDetail partnerId={params.id} />
    </DashboardLayout>
  )
}
