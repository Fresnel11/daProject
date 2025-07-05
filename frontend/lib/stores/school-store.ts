import { create } from "zustand";
import { registerSchool as registerSchoolService } from "../services/school-service";

interface SchoolRegisterState {
  loading: boolean;
  error: string | null;
  success: boolean;
  registerSchool: (data: any, onSuccess?: () => void) => Promise<void>;
  reset: () => void;
}

export const useSchoolStore = create<SchoolRegisterState>((set) => ({
  loading: false,
  error: null,
  success: false,
  registerSchool: async (data, onSuccess) => {
    set({ loading: true, error: null, success: false });
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
}));
