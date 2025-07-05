import DashboardLayout from '@/components/layouts/dashboard-layout';
import { StaffPage } from '@/components/pages/staff/staff-page';

export default function Staff() {
  return (
    <DashboardLayout>
      <StaffPage />
    </DashboardLayout>
  );
}