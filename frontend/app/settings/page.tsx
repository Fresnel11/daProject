import DashboardLayout from '@/components/layouts/dashboard-layout';
import { SettingsPage } from '@/components/pages/settings/settings-page';

export default function Schedule() {
    return (
      <DashboardLayout>
        <SettingsPage />
      </DashboardLayout>
    );
  }