"use client";

import { useState } from "react";
import { useTranslation } from "@/lib/i18n/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  Plus, 
  Settings, 
  CreditCard, 
  Wifi, 
  Shield, 
  CheckCircle,
  AlertTriangle,
  MoreHorizontal,
  Edit,
  Trash,
  Eye,
  TestTube,
  Globe,
  Lock,
  Activity,
  TrendingUp,
  DollarSign,
  Users
} from "lucide-react";
import { cn } from "@/lib/utils";

interface PaymentGateway {
  id: string;
  name: string;
  type: "mobile_money" | "bank_transfer" | "card_payment" | "crypto";
  provider: string;
  status: "active" | "inactive" | "testing";
  apiKey: string;
  secretKey: string;
  webhookUrl: string;
  successRate: number;
  transactionCount: number;
  totalAmount: number;
  lastTransaction: string;
  isEnabled: boolean;
  testMode: boolean;
  supportedCurrencies: string[];
  fees: {
    percentage: number;
    fixed: number;
  };
}

const mockGateways: PaymentGateway[] = [
  {
    id: "1",
    name: "Mobile Money - MTN",
    type: "mobile_money",
    provider: "MTN Mobile Money",
    status: "active",
    apiKey: "mtn_****_****_****",
    secretKey: "sk_****_****_****",
    webhookUrl: "https://api.school.com/webhooks/mtn",
    successRate: 98.5,
    transactionCount: 1247,
    totalAmount: 45000000,
    lastTransaction: "2025-02-25T10:30:00Z",
    isEnabled: true,
    testMode: false,
    supportedCurrencies: ["XOF", "USD"],
    fees: { percentage: 1.5, fixed: 100 },
  },
  {
    id: "2",
    name: "Mobile Money - Moov",
    type: "mobile_money",
    provider: "Moov Money",
    status: "active",
    apiKey: "moov_****_****_****",
    secretKey: "sk_****_****_****",
    webhookUrl: "https://api.school.com/webhooks/moov",
    successRate: 97.2,
    transactionCount: 892,
    totalAmount: 32000000,
    lastTransaction: "2025-02-24T15:45:00Z",
    isEnabled: true,
    testMode: false,
    supportedCurrencies: ["XOF"],
    fees: { percentage: 1.8, fixed: 150 },
  },
  {
    id: "3",
    name: "Bank Transfer - Ecobank",
    type: "bank_transfer",
    provider: "Ecobank",
    status: "testing",
    apiKey: "ecobank_****_****",
    secretKey: "sk_****_****_****",
    webhookUrl: "https://api.school.com/webhooks/ecobank",
    successRate: 99.1,
    transactionCount: 156,
    totalAmount: 8500000,
    lastTransaction: "2025-02-23T09:15:00Z",
    isEnabled: false,
    testMode: true,
    supportedCurrencies: ["XOF", "USD", "EUR"],
    fees: { percentage: 0.5, fixed: 500 },
  },
  {
    id: "4",
    name: "Card Payment - Stripe",
    type: "card_payment",
    provider: "Stripe",
    status: "inactive",
    apiKey: "pk_****_****_****",
    secretKey: "sk_****_****_****",
    webhookUrl: "https://api.school.com/webhooks/stripe",
    successRate: 99.8,
    transactionCount: 234,
    totalAmount: 12000000,
    lastTransaction: "2025-02-20T14:20:00Z",
    isEnabled: false,
    testMode: false,
    supportedCurrencies: ["XOF", "USD", "EUR", "GBP"],
    fees: { percentage: 2.9, fixed: 30 },
  },
];

const gatewayTypes = [
  { id: "mobile_money", name: "Mobile Money", icon: "📱" },
  { id: "bank_transfer", name: "Virement bancaire", icon: "🏦" },
  { id: "card_payment", name: "Paiement par carte", icon: "💳" },
  { id: "crypto", name: "Cryptomonnaie", icon: "₿" },
];

export function OnlinePaymentGateway() {
  const { t } = useTranslation();
  const [gateways, setGateways] = useState<PaymentGateway[]>(mockGateways);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedGateway, setSelectedGateway] = useState<PaymentGateway | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "testing": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      case "inactive": return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active": return <CheckCircle className="h-4 w-4" />;
      case "testing": return <TestTube className="h-4 w-4" />;
      case "inactive": return <AlertTriangle className="h-4 w-4" />;
      default: return <AlertTriangle className="h-4 w-4" />;
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'XOF',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const handleToggleGateway = (gatewayId: string) => {
    setGateways(prev => prev.map(gateway => 
      gateway.id === gatewayId 
        ? { ...gateway, isEnabled: !gateway.isEnabled }
        : gateway
    ));
  };

  const handleToggleTestMode = (gatewayId: string) => {
    setGateways(prev => prev.map(gateway => 
      gateway.id === gatewayId 
        ? { ...gateway, testMode: !gateway.testMode }
        : gateway
    ));
  };

  const totalTransactions = gateways.reduce((sum, gateway) => sum + gateway.transactionCount, 0);
  const totalAmount = gateways.reduce((sum, gateway) => sum + gateway.totalAmount, 0);
  const activeGateways = gateways.filter(gateway => gateway.isEnabled).length;
  const averageSuccessRate = gateways.length > 0 
    ? gateways.reduce((sum, gateway) => sum + gateway.successRate, 0) / gateways.length 
    : 0;

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex items-center justify-between animate-fade-in-up">
        <div className="flex items-center gap-4">
          <h2 className="text-2xl font-bold">{t("online_payment_gateways")}</h2>
          <Badge variant="outline" className="text-sm">
            {activeGateways} {t("active")}
          </Badge>
        </div>
        
        <Button onClick={() => setIsAddModalOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          {t("add_gateway")}
        </Button>
      </div>

      {/* Gateway Statistics */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 animate-fade-in-up animate-stagger-1">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  {t("total_transactions")}
                </p>
                <p className="text-2xl font-bold text-primary">
                  {totalTransactions.toLocaleString()}
                </p>
              </div>
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Activity className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  {t("total_amount")}
                </p>
                <p className="text-2xl font-bold text-green-600">
                  {formatCurrency(totalAmount)}
                </p>
              </div>
              <div className="h-12 w-12 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  {t("success_rate")}
                </p>
                <p className="text-2xl font-bold text-blue-600">
                  {averageSuccessRate.toFixed(1)}%
                </p>
              </div>
              <div className="h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  {t("active_gateways")}
                </p>
                <p className="text-2xl font-bold text-purple-600">
                  {activeGateways}
                </p>
              </div>
              <div className="h-12 w-12 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center">
                <Wifi className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Gateways Table */}
      <Card className="animate-fade-in-up animate-stagger-2">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">
            {t("payment_gateways")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t("gateway")}</TableHead>
                  <TableHead>{t("provider")}</TableHead>
                  <TableHead className="text-center">{t("status")}</TableHead>
                  <TableHead className="text-center">{t("success_rate")}</TableHead>
                  <TableHead className="text-center">{t("transactions")}</TableHead>
                  <TableHead className="text-center">{t("total_amount")}</TableHead>
                  <TableHead className="text-center">{t("enabled")}</TableHead>
                  <TableHead className="text-center">{t("test_mode")}</TableHead>
                  <TableHead className="text-center">{t("actions")}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {gateways.map((gateway) => (
                  <TableRow key={gateway.id} className="hover:bg-muted/50">
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                          <CreditCard className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">{gateway.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {gatewayTypes.find(t => t.id === gateway.type)?.name}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">
                        {gateway.provider}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge className={cn("font-normal", getStatusColor(gateway.status))}>
                        <div className="flex items-center gap-1">
                          {getStatusIcon(gateway.status)}
                          {t(gateway.status)}
                        </div>
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="flex items-center justify-center gap-2">
                        <span className="font-medium">{gateway.successRate}%</span>
                        <div className="w-16 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-green-500 h-2 rounded-full" 
                            style={{ width: `${gateway.successRate}%` }}
                          />
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge variant="outline">
                        {gateway.transactionCount.toLocaleString()}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center">
                      <span className="font-medium">{formatCurrency(gateway.totalAmount)}</span>
                    </TableCell>
                    <TableCell className="text-center">
                      <Switch
                        checked={gateway.isEnabled}
                        onCheckedChange={() => handleToggleGateway(gateway.id)}
                      />
                    </TableCell>
                    <TableCell className="text-center">
                      <Switch
                        checked={gateway.testMode}
                        onCheckedChange={() => handleToggleTestMode(gateway.id)}
                      />
                    </TableCell>
                    <TableCell className="text-center">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() => {
                              setSelectedGateway(gateway);
                              setIsEditModalOpen(true);
                            }}
                          >
                            <Edit className="mr-2 h-4 w-4" />
                            {t("edit")}
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => {
                              // View gateway details
                              console.log("View gateway details:", gateway);
                            }}
                          >
                            <Eye className="mr-2 h-4 w-4" />
                            {t("view_details")}
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="text-destructive"
                            onClick={() => {
                              setGateways(prev => prev.filter(g => g.id !== gateway.id));
                            }}
                          >
                            <Trash className="mr-2 h-4 w-4" />
                            {t("delete")}
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Add Gateway Modal */}
      <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-hidden animate-scale-in">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold flex items-center gap-2">
              <Plus className="h-5 w-5" />
              {t("add_payment_gateway")}
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>{t("gateway_name")}</Label>
                <Input placeholder={t("enter_gateway_name")} />
              </div>
              <div className="space-y-2">
                <Label>{t("gateway_type")}</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder={t("select_type")} />
                  </SelectTrigger>
                  <SelectContent>
                    {gatewayTypes.map((type) => (
                      <SelectItem key={type.id} value={type.id}>
                        <div className="flex items-center gap-2">
                          <span>{type.icon}</span>
                          <span>{type.name}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label>{t("provider")}</Label>
              <Input placeholder={t("enter_provider_name")} />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>{t("api_key")}</Label>
                <Input placeholder={t("enter_api_key")} type="password" />
              </div>
              <div className="space-y-2">
                <Label>{t("secret_key")}</Label>
                <Input placeholder={t("enter_secret_key")} type="password" />
              </div>
            </div>

            <div className="space-y-2">
              <Label>{t("webhook_url")}</Label>
              <Input placeholder={t("enter_webhook_url")} />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>{t("fee_percentage")}</Label>
                <Input placeholder="1.5" type="number" step="0.1" />
              </div>
              <div className="space-y-2">
                <Label>{t("fixed_fee")}</Label>
                <Input placeholder="100" type="number" />
              </div>
            </div>

            <div className="space-y-2">
              <Label>{t("supported_currencies")}</Label>
              <Input placeholder="XOF, USD, EUR" />
            </div>
          </div>
          
          <div className="flex justify-end space-x-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsAddModalOpen(false)}
            >
              {t("cancel")}
            </Button>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              {t("add_gateway")}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
} 