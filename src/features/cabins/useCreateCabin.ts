import toast from "react-hot-toast";
import { createCabin as createCabinApi } from "../../services/apiCabins";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCreateCabin = (reset?: () => void) => {
  const queryClient = useQueryClient();

  const { mutate: createCabin, isPending: isCreating } = useMutation({
    mutationFn: createCabinApi,
    onSuccess: () => {
      toast.success("Cabin successfully created");
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
      if (reset) reset();
    },
    onError: (err) => toast.error(err.message),
  });

  return { isCreating, createCabin };
};
