import DashboardLayout from '@/components/layouts/dashboard-layout';
import { SchedulePage } from '@/components/pages/schedule/schedule-page';

export default function Schedule() {
  return (
    <DashboardLayout>
      <SchedulePage />
    </DashboardLayout>
  );
}