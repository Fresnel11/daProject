import DashboardLayout from '@/components/layouts/dashboard-layout';
import { StudentsPage } from '@/components/pages/students/students-page';

export default function Students() {
  return (
    <DashboardLayout>
      <StudentsPage />
    </DashboardLayout>
  );
}