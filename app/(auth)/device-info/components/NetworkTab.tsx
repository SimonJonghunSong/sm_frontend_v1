import { Dispatch, SetStateAction } from "react";

interface Props {
  formData: {
    [key: string]: {
      value: string;
      realValue: string;
    };
  };
  setFormData: Dispatch<
    SetStateAction<{
      [key: string]: {
        value: string;
        realValue: string;
      };
    }>
  >;
}

export default function NetworkTab({ formData, setFormData }: Props) {
  console.log("formData ::::", formData);

  return (
    <div className="contentWrap">
      <section>
        <h1>Network</h1>
        {typeof formData?.["1000"] !== "undefined" && <div>컴포넌트1000</div>}
        {typeof formData?.["1001"] !== "undefined" && <div>컴포넌트1001</div>}
        {typeof formData?.["1002"] !== "undefined" && <div>컴포넌트1002</div>}
        {typeof formData?.["1003"] !== "undefined" && <div>컴포넌트1003</div>}
        {typeof formData?.["1004"] !== "undefined" && <div>컴포넌트1004</div>}
        {typeof formData?.["1005"] !== "undefined" && <div>컴포넌트1005</div>}
      </section>
    </div>
  );
}
