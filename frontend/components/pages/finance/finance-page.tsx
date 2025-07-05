"use client";

import { useState } from "react";
import { useTranslation } from "@/lib/i18n/client";
import { PageTitle } from "@/components/ui/page-title";
import { FinanceDashboard } from "@/components/pages/finance/finance-dashboard";
import { PaymentManagement } from "@/components/pages/finance/payment-management";
import { InvoiceGeneration } from "@/components/pages/finance/invoice-generation";
import { PaymentReminders } from "@/components/pages/finance/payment-reminders";
import { AccountingExports } from "@/components/pages/finance/accounting-exports";
import { OnlinePaymentGateway } from "@/components/pages/finance/online-payment-gateway";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Plus, CreditCard, FileText, Bell, Download, Wifi } from "lucide-react";

export function FinancePage() {
  const { t } = useTranslation();
  
  return (
    <div className="space-y-6 pt-4 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <PageTitle
          title={t("financial_management")}
          subtitle={t("manage_payments_billing_accounting")}
        />
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            {t("export_data")}
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            {t("record_payment")}
          </Button>
        </div>
      </div>

      <Tabs defaultValue="dashboard" className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="dashboard" className="flex items-center gap-2">
            <CreditCard className="h-4 w-4" />
            {t("dashboard")}
          </TabsTrigger>
          <TabsTrigger value="payments" className="flex items-center gap-2">
            <CreditCard className="h-4 w-4" />
            {t("payments")}
          </TabsTrigger>
          <TabsTrigger value="invoices" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            {t("invoices")}
          </TabsTrigger>
          <TabsTrigger value="reminders" className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            {t("reminders")}
          </TabsTrigger>
          <TabsTrigger value="exports" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            {t("exports")}
          </TabsTrigger>
          <TabsTrigger value="gateway" className="flex items-center gap-2">
            <Wifi className="h-4 w-4" />
            {t("online_payments")}
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="dashboard" className="space-y-6">
          <FinanceDashboard />
        </TabsContent>
        
        <TabsContent value="payments" className="space-y-6">
          <PaymentManagement />
        </TabsContent>
        
        <TabsContent value="invoices" className="space-y-6">
          <InvoiceGeneration />
        </TabsContent>
        
        <TabsContent value="reminders" className="space-y-6">
          <PaymentReminders />
        </TabsContent>
        
        <TabsContent value="exports" className="space-y-6">
          <AccountingExports />
        </TabsContent>
        
        <TabsContent value="gateway" className="space-y-6">
          <OnlinePaymentGateway />
        </TabsContent>
      </Tabs>
    </div>
  );
}