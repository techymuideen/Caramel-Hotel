import { useForm, SubmitHandler } from "react-hook-form";

import { useCreateCabin } from "./useCreateCabin";

import { useEditCabin } from "./useEditCabin";
import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";
import { FormValues } from "../../models/cabin";

const CreateCabinForm: React.FC<{
  cabinToEdit?: FormValues;
}> = ({ cabinToEdit = {}, onCloseModal }) => {
  const { id: editId, ...editValues } = cabinToEdit || {};
  const isEditSession = Boolean(editId);

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    defaultValues: isEditSession ? editValues : {},
  });

  const { isCreating, createCabin } = useCreateCabin(reset);
  const { isEditing, editCabin } = useEditCabin(reset);

  const isWorking = isCreating || isEditing;

  const onSubmit: SubmitHandler<FormValues> = (data: FormValues) => {
    const image = typeof data.image === "string" ? data.image : data.image[0];

    if (isEditSession)
      editCabin(
        { newCabinData: { ...data, image }, id: editId! },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        },
      );
    else
      createCabin(
        { ...data, image },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        },
      );
  };

  const onError = (errors: object) => {
    console.log("Form errors:", errors);
  };

  return (
    <Form
      type={onCloseModal ? "modal" : "regular"}
      onSubmit={handleSubmit(onSubmit, onError)}
    >
      <FormRow label="Cabin name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          disabled={isWorking}
          {...register("name", { required: "This field is required" })}
        />
      </FormRow>

      <FormRow label="Maximum capacity" error={errors?.maxCapacity?.message}>
        <Input
          type="number"
          id="maxCapacity"
          disabled={isWorking}
          {...register("maxCapacity", {
            required: "This field is required",
            min: {
              value: 1,
              message: "The value must be greater than 1",
            },
          })}
        />
      </FormRow>

      <FormRow label="Regular price" error={errors?.regularPrice?.message}>
        <Input
          type="number"
          id="regularPrice"
          disabled={isWorking}
          {...register("regularPrice", { required: "This field is required" })}
        />
      </FormRow>

      <FormRow label="Discount" error={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          defaultValue={0}
          disabled={isWorking}
          {...register("discount", {
            validate: (value) =>
              value <= getValues().regularPrice ||
              "Discount should be less than regular price",
          })}
        />
      </FormRow>

      <FormRow label="Description for website">
        <Textarea
          id="description"
          defaultValue=""
          {...register("description")}
          disabled={isWorking}
        />
      </FormRow>

      <FormRow label="Cabin photo">
        <FileInput
          id="image"
          accept="image/*"
          {...register("image", {
            required: !isEditSession && "This field is required",
          })}
        />
      </FormRow>

      <FormRow>
        <Button
          onClick={() => onCloseModal?.()}
          $variation="secondary"
          type="reset"
        >
          Cancel
        </Button>
        <Button disabled={isWorking}>
          {isEditSession ? "Edit cabin" : "Create new cabin"}
        </Button>
      </FormRow>
    </Form>
  );
};

export default CreateCabinForm;
