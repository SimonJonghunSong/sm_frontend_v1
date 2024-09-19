import { MenuItem, Select, SelectChangeEvent } from "@mui/material";
import React, { Dispatch, SetStateAction, useState } from "react";

const selectCountryData = [
  { label: "USA", value: "usa" },
  { label: "Portugal", value: "portugal" },
  { label: "Spain", value: "spain" },
];

export default function SelectCountry({
  setCountryData,
}: {
  setCountryData?: Dispatch<SetStateAction<string>>;
}) {
  const [country, setCountry] = useState<string>("");

  const handleSelectChange = (
    e: SelectChangeEvent,
    setState: Dispatch<SetStateAction<string>>
  ) => {
    setState(e.target.value);

    setCountryData && setCountryData(e.target.value);
  };

  return (
    <Select
      displayEmpty
      renderValue={(v) =>
        v?.length ? (
          selectCountryData.find((item) => item.value === v).label
        ) : (
          <span className="text-grey-5">Select</span>
        )
      }
      value={country}
      onChange={(e) => handleSelectChange(e, setCountry)}
      sx={{ width: "100%" }}
    >
      {selectCountryData.map((item) => (
        <MenuItem key={item.value} value={item.value}>
          {item.label}
        </MenuItem>
      ))}
    </Select>
  );
}
