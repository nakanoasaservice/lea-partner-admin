import { DashboardLayout } from "@/components/dashboard-layout"
import { PartnerDetail } from "@/components/partner-detail"

interface PartnerDetailPageProps {
  params: {
    id: string
  }
}

export default function PartnerDetailPage({ params }: PartnerDetailPageProps) {
  return (
    <DashboardLayout currentPage="partners">
      <PartnerDetail partnerId={params.id} />
    </DashboardLayout>
  )
}
