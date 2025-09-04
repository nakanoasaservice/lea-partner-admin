import { DashboardLayout } from "@/components/dashboard-layout"
import { PartnersList } from "@/components/partners-list"

export default function PartnersPage() {
  return (
    <DashboardLayout currentPage="partners">
      <PartnersList />
    </DashboardLayout>
  )
}
