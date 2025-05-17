import useModelInfoStore from "@/src/stores/useModelInfo";
import { updateJsonDataToIDB } from "@/utils/idbModelUtil";
import { FormField } from "../page";
import { Dispatch, SetStateAction, useState } from "react";

export default function useSendFormData() {
  const [isLoading] = useState(false);
  const getModelName = useModelInfoStore((state) => state.getModelName);
  const modelName = getModelName();

  const sendFormData = async (
    formData: { [key: string]: FormField },
    setFormData?: Dispatch<SetStateAction<{ [key: string]: FormField }>>
  ) => {
    updateJsonDataToIDB(modelName, formData);

    if (setFormData) {
      setFormData((prev) =>
        Object.entries(prev).reduce((acc, [key, value]) => {
          acc[key] = { ...value, beforeValue: value.realValue };
          return acc;
        }, {} as { [key: string]: FormField })
      );
    }
  };

  return { sendFormData, isLoading };
}
