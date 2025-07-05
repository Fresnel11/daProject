"use client";

import { useState } from "react";
import { useTranslation } from "@/lib/i18n/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
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
  MoreHorizontal, 
  Edit, 
  Trash, 
  Play, 
  Pause, 
  Eye,
  Calendar,
  Users,
  DollarSign
} from "lucide-react";
import { CreateCampaignModal } from "@/components/pages/registrations/create-campaign-modal";
import { cn } from "@/lib/utils";

const mockCampaigns = [
  {
    id: "1",
    name: "Rentrée 2025-2026",
    schoolYear: "2025-2026",
    status: "active",
    startDate: "2025-03-01",
    endDate: "2025-06-30",
    totalRegistrations: 1247,
    newStudents: 342,
    reRegistrations: 905,
    revenue: 125000,
    levels: ["CP1", "CP2", "CE1", "CE2", "CM1", "CM2", "6ème", "5ème"],
  },
  {
    id: "2",
    name: "Rentrée 2024-2025",
    schoolYear: "2024-2025",
    status: "completed",
    startDate: "2024-03-01",
    endDate: "2024-06-30",
    totalRegistrations: 1189,
    newStudents: 298,
    reRegistrations: 891,
    revenue: 118900,
    levels: ["CP1", "CP2", "CE1", "CE2", "CM1", "CM2", "6ème", "5ème"],
  },
  {
    id: "3",
    name: "Inscriptions Tardives 2025",
    schoolYear: "2025-2026",
    status: "draft",
    startDate: "2025-07-01",
    endDate: "2025-08-31",
    totalRegistrations: 0,
    newStudents: 0,
    reRegistrations: 0,
    revenue: 0,
    levels: ["CP1", "CE1", "CM1", "6ème"],
  },
];

export function CampaignManagement() {
  const { t } = useTranslation();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "completed": return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
      case "draft": return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
      case "paused": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active": return <Play className="h-3 w-3" />;
      case "completed": return <Eye className="h-3 w-3" />;
      case "draft": return <Edit className="h-3 w-3" />;
      case "paused": return <Pause className="h-3 w-3" />;
      default: return null;
    }
  };

  const filteredCampaigns = mockCampaigns.filter(campaign =>
    campaign.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    campaign.schoolYear.includes(searchTerm)
  );

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex items-center justify-between animate-fade-in-up">
        <div className="flex items-center gap-4">
          <Input
            placeholder={t("search_campaigns")}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-[300px]"
          />
        </div>
        <Button onClick={() => setIsCreateModalOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          {t("create_campaign")}
        </Button>
      </div>

      {/* Campaign Statistics */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 animate-fade-in-up animate-stagger-1">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  {t("active_campaigns")}
                </p>
                <p className="text-2xl font-bold text-green-600">
                  {mockCampaigns.filter(c => c.status === "active").length}
                </p>
              </div>
              <div className="h-12 w-12 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                <Play className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  {t("total_registrations")}
                </p>
                <p className="text-2xl font-bold text-primary">
                  {mockCampaigns.reduce((sum, c) => sum + c.totalRegistrations, 0).toLocaleString()}
                </p>
              </div>
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Users className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  {t("total_revenue")}
                </p>
                <p className="text-2xl font-bold text-blue-600">
                  €{mockCampaigns.reduce((sum, c) => sum + c.revenue, 0).toLocaleString()}
                </p>
              </div>
              <div className="h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  {t("upcoming_deadlines")}
                </p>
                <p className="text-2xl font-bold text-yellow-600">
                  2
                </p>
              </div>
              <div className="h-12 w-12 rounded-full bg-yellow-100 dark:bg-yellow-900 flex items-center justify-center">
                <Calendar className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Campaigns Table */}
      <Card className="animate-fade-in-up animate-stagger-2">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">
            {t("registration_campaigns")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t("campaign_name")}</TableHead>
                  <TableHead>{t("school_year")}</TableHead>
                  <TableHead className="text-center">{t("status")}</TableHead>
                  <TableHead>{t("period")}</TableHead>
                  <TableHead className="text-center">{t("registrations")}</TableHead>
                  <TableHead className="text-center">{t("revenue")}</TableHead>
                  <TableHead>{t("levels")}</TableHead>
                  <TableHead className="text-center">{t("actions")}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCampaigns.map((campaign) => (
                  <TableRow key={campaign.id} className="hover:bg-muted/50">
                    <TableCell className="font-medium">
                      {campaign.name}
                    </TableCell>
                    <TableCell>{campaign.schoolYear}</TableCell>
                    <TableCell className="text-center">
                      <Badge className={cn("font-normal", getStatusColor(campaign.status))}>
                        <div className="flex items-center gap-1">
                          {getStatusIcon(campaign.status)}
                          {t(campaign.status)}
                        </div>
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div>{new Date(campaign.startDate).toLocaleDateString()}</div>
                        <div className="text-muted-foreground">
                          {new Date(campaign.endDate).toLocaleDateString()}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="text-sm">
                        <div className="font-medium">{campaign.totalRegistrations}</div>
                        <div className="text-muted-foreground">
                          {campaign.newStudents} {t("new")} / {campaign.reRegistrations} {t("returning")}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="font-medium">
                        €{campaign.revenue.toLocaleString()}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {campaign.levels.slice(0, 3).map((level) => (
                          <Badge key={level} variant="outline" className="text-xs">
                            {level}
                          </Badge>
                        ))}
                        {campaign.levels.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{campaign.levels.length - 3}
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Eye className="mr-2 h-4 w-4" />
                            {t("view_details")}
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            {t("edit")}
                          </DropdownMenuItem>
                          {campaign.status === "active" ? (
                            <DropdownMenuItem>
                              <Pause className="mr-2 h-4 w-4" />
                              {t("pause")}
                            </DropdownMenuItem>
                          ) : campaign.status === "paused" ? (
                            <DropdownMenuItem>
                              <Play className="mr-2 h-4 w-4" />
                              {t("resume")}
                            </DropdownMenuItem>
                          ) : null}
                          <DropdownMenuItem className="text-destructive">
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

      <CreateCampaignModal
        open={isCreateModalOpen}
        onOpenChange={setIsCreateModalOpen}
      />
    </div>
  );
}