import useModelInfoStore from "@/src/stores/useModelInfo";
import { updateJsonDataToIDB } from "@/utils/idbModelUtil";
import { FormField } from "../page";
import { useState } from "react";

export default function useSendFormData() {
  const [isLoading] = useState(false);
  const getModelName = useModelInfoStore((state) => state.getModelName);
  const modelName = getModelName();

  const sendFormData = async (formData: { [key: string]: FormField }) => {
    console.log("Form values:", formData);
    console.log("modelName :::", modelName);
    updateJsonDataToIDB(modelName, formData);
  };

  return { sendFormData, isLoading };
}
