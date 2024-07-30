import { CabinUploadValues, FormValues } from "../models/cabin";
import supabase, { supabaseUrl } from "./supabase";

export const getCabins = async () => {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error("Cabins cannot be loaded");
  }

  return data;
};

export const createCabin = async (newCabin: CabinUploadValues) => {
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);

  const imageName = `${Math.random()}-${newCabin.image?.name}`.replaceAll(
    "/",
    "",
  );
  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  // 1. Create Cabin
  const { data, error } = await supabase
    .from("cabins")
    .insert([{ ...newCabin, image: imagePath }])
    .select()
    .single();

  if (error) {
    throw new Error("Cabin could not be created");
  }

  if (hasImagePath) return data;

  // 2. Upload image
  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  // 3. Delete the cabin if there was an error uploading image
  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);
    console.error(storageError);
    throw new Error(
      "Cabin image could not be uploaded and the cabin was not created",
    );
  }

  return data;
};

export const editCabin = async (newCabin: FormValues, id: number) => {
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);

  const imageName = `${Math.random()}-${newCabin.image?.name}`.replaceAll(
    "/",
    "",
  );
  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  // Edit Cabin
  const { data, error } = await supabase
    .from("cabins")
    .update({ ...newCabin, image: imagePath })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error("Update Error:", error);
    throw new Error("Cabin could not be edited");
  }

  // Handle no rows returned
  if (data.length === 0) {
    console.error("No rows returned for the given ID.");
    throw new Error("No cabin found with the given ID.");
  }

  // 2. Upload image if it's a new image
  if (!hasImagePath) {
    const { error: storageError } = await supabase.storage
      .from("cabin-images")
      .upload(imageName, newCabin.image);

    // 3. Delete the cabin if there was an error uploading image
    if (storageError) {
      await supabase.from("cabins").delete().eq("id", id);
      console.error("Storage Error:", storageError);
      throw new Error(
        "Cabin image could not be uploaded and the cabin was not updated",
      );
    }
  }

  return data;
};

export const deleteCabin = async (id: number) => {
  const { error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Cabin cannot be deleted");
  }
};
