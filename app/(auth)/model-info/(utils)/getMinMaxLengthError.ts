import { FormField } from "../page";
import { FIELD_ERRORS } from "constants/fieldErrorValidations";

const getMinMaxLengthError = ({
  id,
  formData,
  min,
  max,
}: {
  id: string;
  formData: { [key: string]: FormField };
  min: number;
  max: number;
}) => {
  if (!formData[id])
    return {
      customError: undefined,
      customErrorMessage: undefined,
    };

  return {
    customError:
      String(formData[id]?.realValue).length < min ||
      String(formData[id]?.realValue).length > max,
    customErrorMessage:
      String(formData[id]?.realValue).length < min
        ? FIELD_ERRORS[id].en
        : String(formData[id]?.realValue).length > max
        ? FIELD_ERRORS[id].en
        : undefined,
  };
};

export default getMinMaxLengthError;
