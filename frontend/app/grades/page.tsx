import DashboardLayout from '@/components/layouts/dashboard-layout';
import { GradesPage } from '@/components/pages/grades/grades-page';

export default function Grades() {
  return (
    <DashboardLayout>
      <GradesPage />
    </DashboardLayout>
  );
}