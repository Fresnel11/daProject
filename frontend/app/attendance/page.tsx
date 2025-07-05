import DashboardLayout from '@/components/layouts/dashboard-layout';
import { AttendancePage } from '@/components/pages/attendance/attendance-page';

export default function Attendance() {
  return (
    <DashboardLayout>
      <AttendancePage />
    </DashboardLayout>
  );
}