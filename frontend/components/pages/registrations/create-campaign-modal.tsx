"use client";

import { useState } from "react";
import { useTranslation } from "@/lib/i18n/client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { X, Plus } from "lucide-react";

interface CreateCampaignModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const availableLevels = [
  "CP1", "CP2", "CE1", "CE2", "CM1", "CM2", 
  "6ème", "5ème", "4ème", "3ème", "2nde", "1ère", "Terminale"
];

const feeTypes = [
  { id: "registration", name: "Registration Fee", defaultAmount: 50 },
  { id: "reregistration", name: "Re-registration Fee", defaultAmount: 30 },
  { id: "uniform", name: "Uniform", defaultAmount: 75 },
  { id: "books", name: "Books", defaultAmount: 120 },
  { id: "activities", name: "Activities", defaultAmount: 40 },
];

export function CreateCampaignModal({ open, onOpenChange }: CreateCampaignModalProps) {
  const { t } = useTranslation();
  const [selectedLevels, setSelectedLevels] = useState<string[]>([]);
  const [fees, setFees] = useState<Array<{id: string, name: string, amount: number, enabled: boolean}>>([]);
  
  const formSchema = z.object({
    name: z.string().min(1, t("required_field")),
    schoolYear: z.string().min(1, t("required_field")),
    description: z.string().optional(),
    startDate: z.string().min(1, t("required_field")),
    endDate: z.string().min(1, t("required_field")),
    maxCapacityPerClass: z.string().min(1, t("required_field")),
    allowNewStudents: z.boolean(),
    allowReRegistrations: z.boolean(),
    autoLevelProgression: z.boolean(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      schoolYear: "",
      description: "",
      startDate: "",
      endDate: "",
      maxCapacityPerClass: "30",
      allowNewStudents: true,
      allowReRegistrations: true,
      autoLevelProgression: true,
    },
  });

  const addLevel = (level: string) => {
    if (!selectedLevels.includes(level)) {
      setSelectedLevels([...selectedLevels, level]);
    }
  };

  const removeLevel = (level: string) => {
    setSelectedLevels(selectedLevels.filter(l => l !== level));
  };

  const addFee = (feeType: typeof feeTypes[0]) => {
    if (!fees.find(f => f.id === feeType.id)) {
      setFees([...fees, {
        id: feeType.id,
        name: feeType.name,
        amount: feeType.defaultAmount,
        enabled: true
      }]);
    }
  };

  const updateFeeAmount = (id: string, amount: number) => {
    setFees(fees.map(f => f.id === id ? { ...f, amount } : f));
  };

  const toggleFee = (id: string) => {
    setFees(fees.map(f => f.id === id ? { ...f, enabled: !f.enabled } : f));
  };

  const removeFee = (id: string) => {
    setFees(fees.filter(f => f.id !== id));
  };

  function onSubmit(values: z.infer<typeof formSchema>) {
    const campaignData = {
      ...values,
      levels: selectedLevels,
      fees: fees.filter(f => f.enabled),
    };
    console.log("Creating campaign:", campaignData);
    onOpenChange(false);
    form.reset();
    setSelectedLevels([]);
    setFees([]);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto animate-scale-in">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            {t("create_registration_campaign")}
          </DialogTitle>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Basic Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">{t("basic_information")}</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("campaign_name")}</FormLabel>
                      <FormControl>
                        <Input placeholder={t("enter_campaign_name")} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="schoolYear"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("school_year")}</FormLabel>
                      <FormControl>
                        <Input placeholder="2025-2026" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("description")} ({t("optional")})</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder={t("enter_campaign_description")}
                        className="resize-none"
                        rows={3}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Campaign Period */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">{t("campaign_period")}</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="startDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("start_date")}</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="endDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("end_date")}</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Available Levels */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">{t("available_levels")}</h3>
              
              <div className="space-y-3">
                <Select onValueChange={addLevel}>
                  <SelectTrigger>
                    <SelectValue placeholder={t("select_level_to_add")} />
                  </SelectTrigger>
                  <SelectContent>
                    {availableLevels
                      .filter(level => !selectedLevels.includes(level))
                      .map((level) => (
                        <SelectItem key={level} value={level}>
                          {level}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>

                <div className="flex flex-wrap gap-2">
                  {selectedLevels.map((level) => (
                    <Badge key={level} variant="secondary" className="flex items-center gap-1">
                      {level}
                      <button
                        type="button"
                        onClick={() => removeLevel(level)}
                        className="ml-1 hover:bg-destructive/20 rounded-full p-0.5"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            {/* Capacity Settings */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">{t("capacity_settings")}</h3>
              
              <FormField
                control={form.control}
                name="maxCapacityPerClass"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("max_capacity_per_class")}</FormLabel>
                    <FormControl>
                      <Input type="number" min="1" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Registration Options */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">{t("registration_options")}</h3>
              
              <div className="space-y-3">
                <FormField
                  control={form.control}
                  name="allowNewStudents"
                  render={({ field }) => (
                    <FormItem className="flex items-center justify-between rounded-lg border p-3">
                      <div className="space-y-0.5">
                        <FormLabel>{t("allow_new_students")}</FormLabel>
                        <p className="text-sm text-muted-foreground">
                          {t("allow_new_student_registrations")}
                        </p>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="allowReRegistrations"
                  render={({ field }) => (
                    <FormItem className="flex items-center justify-between rounded-lg border p-3">
                      <div className="space-y-0.5">
                        <FormLabel>{t("allow_re_registrations")}</FormLabel>
                        <p className="text-sm text-muted-foreground">
                          {t("allow_existing_student_re_registrations")}
                        </p>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="autoLevelProgression"
                  render={({ field }) => (
                    <FormItem className="flex items-center justify-between rounded-lg border p-3">
                      <div className="space-y-0.5">
                        <FormLabel>{t("auto_level_progression")}</FormLabel>
                        <p className="text-sm text-muted-foreground">
                          {t("automatically_advance_students_to_next_level")}
                        </p>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Fees Configuration */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">{t("fees_configuration")}</h3>
              
              <div className="space-y-3">
                <Select onValueChange={(value) => {
                  const feeType = feeTypes.find(f => f.id === value);
                  if (feeType) addFee(feeType);
                }}>
                  <SelectTrigger>
                    <SelectValue placeholder={t("add_fee_type")} />
                  </SelectTrigger>
                  <SelectContent>
                    {feeTypes
                      .filter(feeType => !fees.find(f => f.id === feeType.id) && !!feeType.id)
                      .map((feeType) => (
                        <SelectItem key={feeType.id} value={feeType.id}>
                          {feeType.name}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>

                <div className="space-y-2">
                  {fees.map((fee) => (
                    <div key={fee.id} className="flex items-center gap-3 p-3 border rounded-lg">
                      <Switch
                        checked={fee.enabled}
                        onCheckedChange={() => toggleFee(fee.id)}
                      />
                      <div className="flex-1">
                        <span className="font-medium">{fee.name}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">€</span>
                        <Input
                          type="number"
                          value={fee.amount}
                          onChange={(e) => updateFeeAmount(fee.id, Number(e.target.value))}
                          className="w-20"
                          min="0"
                          step="0.01"
                        />
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => removeFee(fee.id)}
                        className="h-8 w-8 text-destructive"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
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
              <Button type="submit">
                {t("create_campaign")}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}