import { create } from "zustand";
import {
  registerSchool as registerSchoolService,
  checkEmailExists as checkEmailExistsService,
  checkSchoolEmailExists as checkSchoolEmailExistsService,
  checkSchoolPhoneExists as checkSchoolPhoneExistsService,
  checkSchoolWebsiteExists as checkSchoolWebsiteExistsService,
  checkDirectorPhoneExists as checkDirectorPhoneExistsService,
} from "../services/school-service";

interface SchoolRegisterState {
  loading: boolean;
  error: string | null;
  success: boolean;
  registerSchool: (data: any, onSuccess?: () => void) => Promise<void>;
  reset: () => void;
  checkEmailExists: (email: string) => Promise<boolean>;
  checkSchoolEmailExists: (email: string) => Promise<boolean>;
  checkSchoolPhoneExists: (phone: string) => Promise<boolean>;
  checkSchoolWebsiteExists: (website: string) => Promise<boolean>;
  checkDirectorPhoneExists: (phone: string) => Promise<boolean>;
}

export const useSchoolStore = create<SchoolRegisterState>((set) => ({
  loading: false,
  error: null,
  success: false,
  registerSchool: async (data, onSuccess) => {
    set({ loading: false, error: null, success: false });
    try {
      await registerSchoolService(data);
      set({ success: true });
      if (onSuccess) onSuccess();
    } catch (err: any) {
      set({ error: err.message || "Erreur lors de l'inscription" });
    } finally {
      set({ loading: false });
    }
  },
  reset: () => set({ loading: false, error: null, success: false }),
  checkEmailExists: async (email) => {
    return await checkEmailExistsService(email);
  },
  checkSchoolEmailExists: async (email) => {
    return await checkSchoolEmailExistsService(email);
  },
  checkSchoolPhoneExists: async (phone) => {
    return await checkSchoolPhoneExistsService(phone);
  },
  checkSchoolWebsiteExists: async (website) => {
    return await checkSchoolWebsiteExistsService(website);
  },
  checkDirectorPhoneExists: async (phone) => {
    return await checkDirectorPhoneExistsService(phone);
  },
}));
