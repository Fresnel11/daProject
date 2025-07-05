"use client";

import { useState } from "react";
import { useTranslation } from "@/lib/i18n/client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarIcon, Download, FileText, Settings } from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { cn } from "@/lib/utils";

interface ExportDataModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onExport: (exportData: any) => void;
}

export const getExportTypes = (t: (key: string) => string) => [
  { id: "monthly_report", name: t("monthly_report"), description: t("monthly_report_description") },
  { id: "quarterly_export", name: t("quarterly_export"), description: t("quarterly_export_description") },
  { id: "annual_report", name: t("annual_report"), description: t("annual_report_description") },
  { id: "payment_history", name: t("payment_history"), description: t("payment_history_description") },
  { id: "student_finances", name: t("student_finances"), description: t("student_finances_description") },
  { id: "custom_export", name: t("custom_export"), description: t("custom_export_description") },
];

export const getExportFormats = (t: (key: string) => string) => [
  { id: "PDF", name: "PDF", description: t("portable_document") },
  { id: "Excel", name: "Excel", description: t("spreadsheet") },
  { id: "CSV", name: "CSV", description: t("comma_separated_data") },
  { id: "JSON", name: "JSON", description: t("structured_data") },
];

export function ExportDataModal({ open, onOpenChange, onExport }: ExportDataModalProps) {
  const { t } = useTranslation();
  const exportTypes = getExportTypes(t);
  const exportFormats = getExportFormats(t);
  const [selectedType, setSelectedType] = useState("");
  const [selectedFormat, setSelectedFormat] = useState("");
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [includeCharts, setIncludeCharts] = useState(true);
  const [includeDetails, setIncludeDetails] = useState(true);
  const [exportName, setExportName] = useState("");

  const handleExport = () => {
    if (!selectedType || !selectedFormat || !startDate || !endDate) return;

    const exportData = {
      type: selectedType,
      format: selectedFormat,
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
      includeCharts,
      includeDetails,
      name: exportName || `${selectedType}_${format(startDate, 'yyyy-MM-dd')}_${format(endDate, 'yyyy-MM-dd')}`,
    };

    onExport(exportData);
    onOpenChange(false);
    
    // Reset form
    setSelectedType("");
    setSelectedFormat("");
    setStartDate(undefined);
    setEndDate(undefined);
    setIncludeCharts(true);
    setIncludeDetails(true);
    setExportName("");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-hidden animate-scale-in">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold flex items-center gap-2">
            <Download className="h-5 w-5" />
            {t("export_data")}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Export Type Selection */}
          <div className="space-y-4">
            <Label className="text-base font-medium">{t("export_type")}</Label>
            <div className="grid grid-cols-1 gap-3">
              {exportTypes.map((type) => (
                <Card 
                  key={type.id}
                  className={cn(
                    "cursor-pointer transition-all hover:border-primary",
                    selectedType === type.id && "border-primary bg-primary/5"
                  )}
                  onClick={() => setSelectedType(type.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-3">
                      <Checkbox
                        checked={selectedType === type.id}
                        onCheckedChange={() => setSelectedType(type.id)}
                      />
                      <div className="space-y-1">
                        <h4 className="font-medium">{type.name}</h4>
                        <p className="text-sm text-muted-foreground">{type.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Export Format */}
          <div className="space-y-3">
            <Label className="text-base font-medium">{t("export_format")}</Label>
            <Select value={selectedFormat} onValueChange={setSelectedFormat}>
              <SelectTrigger>
                <SelectValue placeholder={t("select_format")} />
              </SelectTrigger>
              <SelectContent>
                {exportFormats.map((format) => (
                  <SelectItem key={format.id} value={format.id}>
                    <div className="flex items-center space-x-2">
                      <FileText className="h-4 w-4" />
                      <span>{format.name}</span>
                      <span className="text-muted-foreground">({format.description})</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Date Range */}
          <div className="space-y-3">
            <Label className="text-base font-medium">{t("date_range")}</Label>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-sm">{t("start_date")}</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !startDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {startDate ? format(startDate, "PPP", { locale: fr }) : t("select_date")}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={startDate}
                      onSelect={setStartDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              
              <div className="space-y-2">
                <Label className="text-sm">{t("end_date")}</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !endDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {endDate ? format(endDate, "PPP", { locale: fr }) : t("select_date")}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={endDate}
                      onSelect={setEndDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </div>

          {/* Export Options */}
          <div className="space-y-3">
            <Label className="text-base font-medium">{t("export_options")}</Label>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="includeCharts"
                  checked={includeCharts}
                  onCheckedChange={(checked) => setIncludeCharts(checked as boolean)}
                />
                <Label htmlFor="includeCharts" className="text-sm">
                  {t("include_charts_and_graphs")}
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="includeDetails"
                  checked={includeDetails}
                  onCheckedChange={(checked) => setIncludeDetails(checked as boolean)}
                />
                <Label htmlFor="includeDetails" className="text-sm">
                  {t("include_detailed_transactions")}
                </Label>
              </div>
            </div>
          </div>

          {/* Export Name */}
          <div className="space-y-3">
            <Label className="text-base font-medium">{t("export_name")}</Label>
            <Input
              placeholder={t("enter_export_name")}
              value={exportName}
              onChange={(e) => setExportName(e.target.value)}
            />
          </div>
        </div>
        
        <div className="flex justify-end space-x-2 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
          >
            {t("cancel")}
          </Button>
          <Button 
            onClick={handleExport}
            disabled={!selectedType || !selectedFormat || !startDate || !endDate}
          >
            <Download className="mr-2 h-4 w-4" />
            {t("generate_export")}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
} 