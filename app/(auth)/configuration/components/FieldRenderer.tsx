import {
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import { Field } from "../../../../src/hooks/useTransformConfigData";
import InputBox from "../../../../components/inputbox/InputBox";

interface FieldRendererProps {
  field: Field;
  value: string;
  onChange: (value: string, options?: Partial<Field>) => void;
  isChange: boolean;
}

export const tabNameToHref = (tabName: string) => {
  return tabName.toLowerCase().replaceAll(/[_ /:]/g, "-");
};

const FieldRenderer: React.FC<FieldRendererProps> = ({
  field,
  value,
  onChange,
  isChange,
}) => {
  const fieldName = field.fieldName;

  console.log("isChange >>>", isChange);

  switch (field.type) {
    case "combo":
      const options = field.options || [];

      return (
        <InputBox>
          <InputBox.Head>
            <InputBox.Title>
              {fieldName}
              <i>*</i>
            </InputBox.Title>
            <InputBox.Info tooltipText="tooptip example" />
            {/* <InputBox.Number>1600</InputBox.Number> */}
            {isChange && <span className="notification" />}
          </InputBox.Head>
          <InputBox.Body>
            <Select
              value={value}
              onChange={(e) => {
                onChange(e.target.value);
              }}
              sx={{ width: "100%" }}
            >
              {options.map((option, index) => (
                <MenuItem key={index.toString()} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </InputBox.Body>
        </InputBox>
      );
    case "passwd":
      return (
        <InputBox>
          <InputBox.Head>
            <InputBox.Title>
              {fieldName}
              <i>*</i>
            </InputBox.Title>
            <InputBox.Info tooltipText="tooptip example" />
            {/* <InputBox.Number>1600</InputBox.Number> */}
            {isChange && <span className="notification" />}
          </InputBox.Head>
          <InputBox.Body>
            <TextField
              type="password"
              inputProps={{ maxLength: field.max }}
              fullWidth
              value={value}
              onChange={(e) => {
                onChange(e.target.value);
              }}
            />
          </InputBox.Body>
        </InputBox>
      );
    case "edit":
    case "ip":
    case "any":
      return (
        <InputBox>
          <InputBox.Head>
            <InputBox.Title>
              {fieldName}
              <i>*</i>
            </InputBox.Title>
            <InputBox.Info tooltipText="tooptip example" />
            {/* <InputBox.Number>1600</InputBox.Number> */}
            {isChange && <span className="notification" />}
          </InputBox.Head>
          <InputBox.Body>
            <TextField
              inputProps={{ maxLength: field.max }}
              fullWidth
              value={value}
              onChange={(e) => {
                onChange(e.target.value);
              }}
            />
          </InputBox.Body>
        </InputBox>
      );
    case "edit_number":
      return (
        <InputBox>
          <InputBox.Head>
            <InputBox.Title>
              {fieldName}
              <i>*</i>
            </InputBox.Title>
            <InputBox.Info tooltipText="tooptip example" />
            {/* <InputBox.Number>1600</InputBox.Number> */}
            {isChange && <span className="notification" />}
          </InputBox.Head>
          <InputBox.Body>
            <TextField
              inputProps={{ maxLength: field.max }}
              fullWidth
              value={value}
              onChange={(e) => {
                onChange(e.target.value);
              }}
            />
          </InputBox.Body>
        </InputBox>
      );

    case "edit+button":
      let allChecked = false;

      const valueNumberDecimal = parseInt(value, 16).toString(2);
      const size = Number(field.num);
      const values = String(valueNumberDecimal).split("");
      const valuesSize = values.length;

      for (let i = 0; i < size - valuesSize; i++) {
        values.unshift("0");
      }

      const handleAllCheck = (checked: boolean) => {
        let changeValues = [];

        if (checked) {
          changeValues = new Array(size).fill("1");
        } else {
          changeValues = new Array(size).fill("0");
        }

        const changeValue = parseInt(changeValues.join(""), 2).toString(16);

        onChange(changeValue);
      };

      const handleChange = (checked: boolean, index: number) => {
        const chagneValues = values.map((item, valueIndex) =>
          valueIndex === index ? (checked ? "1" : "0") : item
        );
        console.log("values >>>>", values);
        console.log("chagneValues >>>>", chagneValues);

        const changeValue = parseInt(chagneValues.join(""), 2).toString(16);

        console.log("changeValue >>>", changeValue);

        onChange(changeValue);
      };

      if (values.every((item) => item === "1")) {
        allChecked = true;
      } else {
        allChecked = false;
      }

      return (
        <>
          <InputBox>
            <InputBox.Head>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                sx={{ width: "100%" }}
              >
                <Stack direction="row" alignItems="center" gap="8px">
                  <InputBox.Title>
                    {fieldName}
                    <i>*</i>
                  </InputBox.Title>
                  <InputBox.Info tooltipText="tooptip example" />
                  {/* <InputBox.Number>1900</InputBox.Number> */}
                  {isChange && <span className="notification" />}
                </Stack>
              </Stack>
            </InputBox.Head>
            <Stack>
              <FormControlLabel
                value="All"
                control={
                  <Checkbox
                    onChange={(e) => handleAllCheck(e.target.checked)}
                  />
                }
                label="All"
                checked={allChecked}
              />
              <Divider sx={{ margin: "8px 0" }} />
            </Stack>
            <InputBox.Body>
              <FormControl
                sx={{ flexDirection: "row", gap: "10px", flexWrap: "wrap" }}
              >
                {field.assignList.map((item, index) => (
                  <FormControlLabel
                    key={index.toString()}
                    name={item.typeName}
                    control={
                      <Checkbox
                        checked={values[index] === "1"}
                        onChange={(_, checked) => {
                          handleChange(checked, index);
                        }}
                      />
                    }
                    label={item.label}
                  />
                ))}
              </FormControl>
            </InputBox.Body>
          </InputBox>
        </>
      );
    case "alert_id":
      return (
        <Stack direction="row" alignItems="center" gap="8px">
          <Stack
            direction="row"
            alignItems="center"
            gap="8px"
            sx={{ marginBottom: "12px" }}
          >
            <Checkbox
              checked={Number(value) === 1}
              onChange={(e) => {
                onChange(e.target.checked ? "1" : "0");
              }}
            />
            <TextField
              sx={{ width: 50 }}
              value={field.alert_id}
              onChange={(e) => {
                onChange(field.value, {
                  alert_id: e.target.value,
                });
              }}
            />
          </Stack>
          <InputBox.Head>
            <InputBox.Title>
              {fieldName}
              <i>*</i>
            </InputBox.Title>
            <InputBox.Info tooltipText="tooptip example" />
            {/* <InputBox.Number>1339</InputBox.Number> */}
            {isChange && <span className="notification" />}
          </InputBox.Head>
        </Stack>
      );
    case "sAssign":
    case "mAssign":
    case "lAssign":
      return (
        <InputBox>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <InputBox.Head>
              <InputBox.Title>
                {fieldName}
                <i>*</i>
              </InputBox.Title>
              <InputBox.Info tooltipText="tooptip example" />
              {/* <InputBox.Number>1055</InputBox.Number> */}
              {isChange && <span className="notification" />}
            </InputBox.Head>
            <InputBox.Body>
              <Checkbox
                checked={Number(value) === 1}
                onChange={(e) => {
                  onChange(e.target.checked ? "1" : "0");
                }}
              />
            </InputBox.Body>
          </Stack>
        </InputBox>
      );
    default:
      return (
        <Stack
          direction="row"
          alignItems="center"
          gap="8px"
          height="56px"
          borderBottom="1px solid var(--grey3)"
        >
          <div className="list-title">{fieldName}</div>
          <div>{value}</div>
        </Stack>
      );
  }
};
export default FieldRenderer;
