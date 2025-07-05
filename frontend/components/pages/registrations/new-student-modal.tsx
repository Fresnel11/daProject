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
import { ArrowLeft, ArrowRight, Upload, X, Check } from "lucide-react";

interface NewStudentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const steps = [
  { id: 1, title: "Student Information", subtitle: "Basic student details" },
  { id: 2, title: "Parent/Guardian Information", subtitle: "Contact and guardian details" },
  { id: 3, title: "Academic Information", subtitle: "School and academic details" },
  { id: 4, title: "Documents & Fees", subtitle: "Required documents and payment" },
];

const availableLevels = [
  "CP1", "CP2", "CE1", "CE2", "CM1", "CM2", 
  "6ème", "5ème", "4ème", "3ème", "2nde", "1ère", "Terminale"
];

const requiredDocuments = [
  { id: "birth_certificate", name: "Birth Certificate", required: true },
  { id: "vaccination_record", name: "Vaccination Record", required: true },
  { id: "photo", name: "Student Photo", required: true },
  { id: "previous_school_report", name: "Previous School Report", required: false },
  { id: "medical_certificate", name: "Medical Certificate", required: false },
];

export function NewStudentModal({ open, onOpenChange }: NewStudentModalProps) {
  const { t } = useTranslation();
  const [currentStep, setCurrentStep] = useState(1);
  const [uploadedDocuments, setUploadedDocuments] = useState<string[]>([]);
  const [slideDirection, setSlideDirection] = useState<'left' | 'right'>('right');
  
  const formSchema = z.object({
    // Student Information
    firstName: z.string().min(1, t("required_field")),
    lastName: z.string().min(1, t("required_field")),
    dateOfBirth: z.string().min(1, t("required_field")),
    placeOfBirth: z.string().min(1, t("required_field")),
    nationality: z.string().min(1, t("required_field")),
    gender: z.string().min(1, t("required_field")),
    
    // Parent/Guardian Information
    parentFirstName: z.string().min(1, t("required_field")),
    parentLastName: z.string().min(1, t("required_field")),
    parentEmail: z.string().email(t("invalid_email")),
    parentPhone: z.string().min(1, t("required_field")),
    parentAddress: z.string().min(1, t("required_field")),
    parentOccupation: z.string().optional(),
    emergencyContact: z.string().min(1, t("required_field")),
    emergencyPhone: z.string().min(1, t("required_field")),
    
    // Academic Information
    requestedLevel: z.string().min(1, t("required_field")),
    previousSchool: z.string().optional(),
    hasSpecialNeeds: z.boolean(),
    specialNeedsDescription: z.string().optional(),
    medicalConditions: z.string().optional(),
    
    // Additional Information
    notes: z.string().optional(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      dateOfBirth: "",
      placeOfBirth: "",
      nationality: "",
      gender: "",
      parentFirstName: "",
      parentLastName: "",
      parentEmail: "",
      parentPhone: "",
      parentAddress: "",
      parentOccupation: "",
      emergencyContact: "",
      emergencyPhone: "",
      requestedLevel: "",
      previousSchool: "",
      hasSpecialNeeds: false,
      specialNeedsDescription: "",
      medicalConditions: "",
      notes: "",
    },
  });

  const nextStep = () => {
    if (currentStep < steps.length) {
      setSlideDirection('right');
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setSlideDirection('left');
      setCurrentStep(currentStep - 1);
    }
  };

  const handleDocumentUpload = (documentId: string) => {
    if (!uploadedDocuments.includes(documentId)) {
      setUploadedDocuments([...uploadedDocuments, documentId]);
    }
  };

  const removeDocument = (documentId: string) => {
    setUploadedDocuments(uploadedDocuments.filter(id => id !== documentId));
  };

  function onSubmit(values: z.infer<typeof formSchema>) {
    const studentData = {
      ...values,
      uploadedDocuments,
    };
    console.log("Creating new student:", studentData);
    onOpenChange(false);
    form.reset();
    setCurrentStep(1);
    setUploadedDocuments([]);
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className={`space-y-4 ${slideDirection === 'right' ? 'animate-slide-in-right' : 'animate-slide-in-left'}`}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("first_name")}</FormLabel>
                    <FormControl>
                      <Input placeholder={t("enter_first_name")} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("last_name")}</FormLabel>
                    <FormControl>
                      <Input placeholder={t("enter_last_name")} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="dateOfBirth"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("date_of_birth")}</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="placeOfBirth"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("place_of_birth")}</FormLabel>
                    <FormControl>
                      <Input placeholder={t("enter_place_of_birth")} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="nationality"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("nationality")}</FormLabel>
                    <FormControl>
                      <Input placeholder={t("enter_nationality")} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("gender")}</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder={t("select_gender")} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="male">{t("male")}</SelectItem>
                        <SelectItem value="female">{t("female")}</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className={`space-y-4 ${slideDirection === 'right' ? 'animate-slide-in-right' : 'animate-slide-in-left'}`}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="parentFirstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("parent_first_name")}</FormLabel>
                    <FormControl>
                      <Input placeholder={t("enter_parent_first_name")} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="parentLastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("parent_last_name")}</FormLabel>
                    <FormControl>
                      <Input placeholder={t("enter_parent_last_name")} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="parentEmail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("parent_email")}</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder={t("enter_parent_email")} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="parentPhone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("parent_phone")}</FormLabel>
                    <FormControl>
                      <Input placeholder={t("enter_parent_phone")} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="parentAddress"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("address")}</FormLabel>
                  <FormControl>
                    <Textarea placeholder={t("enter_address")} className="resize-none" rows={3} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="emergencyContact"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("emergency_contact")}</FormLabel>
                    <FormControl>
                      <Input placeholder={t("enter_emergency_contact")} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="emergencyPhone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("emergency_phone")}</FormLabel>
                    <FormControl>
                      <Input placeholder={t("enter_emergency_phone")} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        );

      case 3:
        return (
          <div className={`space-y-4 ${slideDirection === 'right' ? 'animate-slide-in-right' : 'animate-slide-in-left'}`}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="requestedLevel"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("requested_level")}</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder={t("select_level")} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {availableLevels.map((level) => (
                          <SelectItem key={level} value={level}>
                            {level}
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
                name="previousSchool"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("previous_school")} ({t("optional")})</FormLabel>
                    <FormControl>
                      <Input placeholder={t("enter_previous_school")} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="hasSpecialNeeds"
              render={({ field }) => (
                <FormItem className="flex items-center justify-between rounded-lg border p-3">
                  <div className="space-y-0.5">
                    <FormLabel>{t("has_special_needs")}</FormLabel>
                    <p className="text-sm text-muted-foreground">
                      {t("student_has_special_educational_needs")}
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

            {form.watch("hasSpecialNeeds") && (
              <FormField
                control={form.control}
                name="specialNeedsDescription"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("special_needs_description")}</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder={t("describe_special_needs")} 
                        className="resize-none" 
                        rows={3} 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <FormField
              control={form.control}
              name="medicalConditions"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("medical_conditions")} ({t("optional")})</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder={t("describe_medical_conditions")} 
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
        );

      case 4:
        return (
          <div className={`space-y-6 ${slideDirection === 'right' ? 'animate-slide-in-right' : 'animate-slide-in-left'}`}>
            {/* Documents Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">{t("required_documents")}</h3>
              <div className="space-y-3">
                {requiredDocuments.map((doc) => (
                  <div key={doc.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className={`w-4 h-4 rounded-full flex items-center justify-center ${
                        uploadedDocuments.includes(doc.id) 
                          ? 'bg-green-500 text-white' 
                          : 'bg-gray-200'
                      }`}>
                        {uploadedDocuments.includes(doc.id) && <Check className="w-3 h-3" />}
                      </div>
                      <div>
                        <span className="font-medium">{doc.name}</span>
                        {doc.required && (
                          <Badge variant="destructive" className="ml-2 text-xs">
                            {t("required")}
                          </Badge>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {uploadedDocuments.includes(doc.id) ? (
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => removeDocument(doc.id)}
                        >
                          <X className="w-4 h-4 mr-1" />
                          {t("remove")}
                        </Button>
                      ) : (
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => handleDocumentUpload(doc.id)}
                        >
                          <Upload className="w-4 h-4 mr-1" />
                          {t("upload")}
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Fees Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">{t("fees_summary")}</h3>
              <div className="bg-muted/50 p-4 rounded-lg space-y-2">
                <div className="flex justify-between">
                  <span>{t("registration_fee")}</span>
                  <span>€50</span>
                </div>
                <div className="flex justify-between">
                  <span>{t("uniform")}</span>
                  <span>€75</span>
                </div>
                <div className="flex justify-between">
                  <span>{t("books")}</span>
                  <span>€120</span>
                </div>
                <div className="border-t pt-2 flex justify-between font-semibold">
                  <span>{t("total")}</span>
                  <span>€245</span>
                </div>
              </div>
            </div>

            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("additional_notes")} ({t("optional")})</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder={t("enter_additional_notes")} 
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
        );

      default:
        return null;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto animate-scale-in">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            {t("add_new_student")}
          </DialogTitle>
        </DialogHeader>
        
        {/* Progress Indicator */}
        <div className="flex items-center justify-center space-x-4 mb-6 animate-fade-in">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <div className={`progress-step ${
                step.id < currentStep ? 'completed' : 
                step.id === currentStep ? 'active' : 'inactive'
              }`}>
                {step.id < currentStep ? (
                  <Check className="w-5 h-5" />
                ) : (
                  <span className="text-sm font-semibold">{step.id}</span>
                )}
              </div>
              {index < steps.length - 1 && (
                <div className={`progress-line w-16 ${
                  step.id < currentStep ? 'completed' : 
                  step.id === currentStep ? 'active' : ''
                }`} />
              )}
            </div>
          ))}
        </div>

        <div className="text-center mb-6">
          <h3 className="text-lg font-medium">{steps[currentStep - 1].title}</h3>
          <p className="text-sm text-muted-foreground">{steps[currentStep - 1].subtitle}</p>
        </div>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {renderStepContent()}
            
            <div className="flex justify-between pt-6">
              <Button
                type="button"
                variant="outline"
                onClick={currentStep === 1 ? () => onOpenChange(false) : prevStep}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                {currentStep === 1 ? t("cancel") : t("back")}
              </Button>
              
              {currentStep < steps.length ? (
                <Button type="button" onClick={nextStep} className="flex items-center gap-2">
                  {t("next")}
                  <ArrowRight className="w-4 h-4" />
                </Button>
              ) : (
                <Button type="submit" className="flex items-center gap-2">
                  {t("submit_application")}
                  <Check className="w-4 h-4" />
                </Button>
              )}
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}