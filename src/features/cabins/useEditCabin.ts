import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FormValues } from "../../models/cabin";
import toast from "react-hot-toast";
import { editCabin as editCabinApi } from "../../services/apiCabins";

export const useEditCabin = (reset: () => void) => {
  const queryClient = useQueryClient();

  const { mutate: editCabin, isPending: isEditing } = useMutation({
    mutationFn: ({
      newCabinData,
      id,
    }: {
      newCabinData: FormValues;
      id: number;
    }) => editCabinApi(newCabinData, id),
    onSuccess: () => {
      toast.success("Cabin successfully edited");
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
      if (reset) reset();
    },
    onError: (err) => toast.error(err.message),
  });

  return { isEditing, editCabin };
};
