import DashboardLayout from '@/components/layouts/dashboard-layout';
import { FinancePage } from '@/components/pages/finance/finance-page';

export default function Grades() {
    return (
      <DashboardLayout>
        <FinancePage />
      </DashboardLayout>
    );
  }