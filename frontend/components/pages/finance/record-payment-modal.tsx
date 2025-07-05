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

interface RecordPaymentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const students = [
  { id: "STU001", name: "Alice Johnson", class: "6th Grade A" },
  { id: "STU002", name: "Bob Smith", class: "5th Grade B" },
  { id: "STU003", name: "Charlie Brown", class: "7th Grade A" },
  { id: "STU004", name: "Diana Prince", class: "8th Grade A" },
];

const feeTypes = [
  { id: "tuition", name: "Tuition", amount: 45000 },
  { id: "registration", name: "Registration", amount: 25000 },
  { id: "canteen", name: "Canteen", amount: 15000 },
  { id: "uniforms", name: "Uniforms", amount: 35000 },
  { id: "activities", name: "Activities", amount: 20000 },
];

const paymentMethods = [
  "Cash",
  "Bank Transfer",
  "Mobile Money",
  "Check",
  "Online Payment",
];

export function RecordPaymentModal({ open, onOpenChange }: RecordPaymentModalProps) {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  
  const formSchema = z.object({
    studentId: z.string().min(1, t("required_field")),
    feeType: z.string().min(1, t("required_field")),
    period: z.string().min(1, t("required_field")),
    amount: z.string().min(1, t("required_field")),
    paidAmount: z.string().min(1, t("required_field")),
    paymentMethod: z.string().min(1, t("required_field")),
    paymentDate: z.string().min(1, t("required_field")),
    reference: z.string().optional(),
    notes: z.string().optional(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      studentId: "",
      feeType: "",
      period: "",
      amount: "",
      paidAmount: "",
      paymentMethod: "",
      paymentDate: new Date().toISOString().split('T')[0],
      reference: "",
      notes: "",
    },
  });

  const selectedFeeType = form.watch("feeType");
  const selectedStudent = form.watch("studentId");

  // Auto-fill amount when fee type is selected
  const handleFeeTypeChange = (feeTypeId: string) => {
    const feeType = feeTypes.find(f => f.id === feeTypeId);
    if (feeType) {
      form.setValue("amount", feeType.amount.toString());
      form.setValue("paidAmount", feeType.amount.toString());
    }
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    console.log("Recording payment:", values);
    onOpenChange(false);
    form.reset();
    setIsLoading(false);
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'XOF',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] animate-scale-in">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            {t("record_payment")}
          </DialogTitle>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="studentId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("student")}</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder={t("select_student")} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {students.map((student) => (
                          <SelectItem key={student.id} value={student.id}>
                            <div>
                              <div className="font-medium">{student.name}</div>
                              <div className="text-sm text-muted-foreground">{student.class}</div>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="feeType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("fee_type")}</FormLabel>
                    <Select 
                      onValueChange={(value) => {
                        field.onChange(value);
                        handleFeeTypeChange(value);
                      }} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder={t("select_fee_type")} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {feeTypes.map((feeType) => (
                          <SelectItem key={feeType.id} value={feeType.id}>
                            <div className="flex justify-between items-center w-full">
                              <span>{t(feeType.name.toLowerCase())}</span>
                              <span className="text-sm text-muted-foreground ml-2">
                                {formatCurrency(feeType.amount)}
                              </span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="period"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("period")}</FormLabel>
                  <FormControl>
                    <Input placeholder={t("enter_period")} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("total_amount")} (XOF)</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        placeholder="0"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="paidAmount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("paid_amount")} (XOF)</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        placeholder="0"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="paymentMethod"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("payment_method")}</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder={t("select_payment_method")} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {paymentMethods.map((method) => (
                          <SelectItem key={method} value={method}>
                            {t(method.toLowerCase().replace(' ', '_'))}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="paymentDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("payment_date")}</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="reference"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("reference_number")} ({t("optional")})</FormLabel>
                  <FormControl>
                    <Input placeholder={t("enter_reference_number")} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("notes")} ({t("optional")})</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder={t("enter_notes")}
                      className="resize-none"
                      rows={3}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="flex justify-end space-x-2 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                disabled={isLoading}
              >
                {t("cancel")}
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <div className="spinner" />
                    <span>{t("recording")}</span>
                  </div>
                ) : (
                  t("record_payment")
                )}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}