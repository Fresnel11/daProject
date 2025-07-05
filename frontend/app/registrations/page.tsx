import DashboardLayout from '@/components/layouts/dashboard-layout';
import { RegistrationsPage } from '@/components/pages/registrations/registrations-page';

export default function Registrations() {
  return (
    <DashboardLayout>
      <RegistrationsPage />
    </DashboardLayout>
  );
}