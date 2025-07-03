import useModelInfoStore from "@/src/stores/useModelInfo";
import { updateJsonDataToIDB } from "@/utils/idbModelUtil";
import { FormField } from "../page";
import { Dispatch, SetStateAction, useState } from "react";
import { useTranslations } from "next-intl";
import { toast } from "react-toastify";

export default function useSendFormData() {
  const t = useTranslations();

  const [isLoading] = useState(false);
  const getModelName = useModelInfoStore((state) => state.getModelName);
  const getFwVer = useModelInfoStore((state) => state.getFwVer);
  const getTargetCountry = useModelInfoStore((state) => state.getTargetCountry);
  const modelName = getModelName();
  const fwVer = getFwVer();
  const targetCountry = getTargetCountry();

  const sendFormData = async (
    formData: { [key: string]: FormField },
    setFormData?: Dispatch<SetStateAction<{ [key: string]: FormField }>>
  ) => {
    console.log("formData :::", formData);

    updateJsonDataToIDB(modelName, fwVer, targetCountry, formData);

    if (setFormData) {
      // toast.success(t("common.save_success"));
      setFormData((prev) =>
        Object.entries(prev).reduce((acc, [key, value]) => {
          acc[key] = {
            ...value,
            beforeValue: value.realValue,
            beforeAlertId: value.alert_id,
            beforeTextNum: value.text_num,
          };
          return acc;
        }, {} as { [key: string]: FormField })
      );
    }
  };

  return { sendFormData, isLoading };
}
