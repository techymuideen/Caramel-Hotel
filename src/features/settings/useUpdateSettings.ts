import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSettings as updateSettingsApi } from "../../services/apiSettings";
import toast from "react-hot-toast";

export const useUpdateSettings = () => {
  const queryClient = useQueryClient();

  const { mutate: updateSettings, isPending: isUpdating } = useMutation({
    mutationFn: updateSettingsApi,
    onSuccess: () => {
      toast.success("Settings successfully edited");
      queryClient.invalidateQueries({ queryKey: ["settings"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isUpdating, updateSettings };
};
