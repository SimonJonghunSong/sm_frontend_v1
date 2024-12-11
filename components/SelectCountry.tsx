import { MenuItem, Select, SelectChangeEvent } from "@mui/material";
import React, { Dispatch, SetStateAction, useState } from "react";

export const selectCountryData = [
  { label: "United States", value: "usa" },
  { label: "Brasil", value: "brasil" },
  { label: "México", value: "méxico" },
  { label: "Europe", value: "europe" },
];

export default function SelectCountry({
  setCountryData,
  defaultCountry,
}: {
  setCountryData?: (country: string) => void;
  defaultCountry?: string;
}) {
  const [country, setCountry] = useState<string>(defaultCountry || "");

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
