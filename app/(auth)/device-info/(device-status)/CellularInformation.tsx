import InputBox from "@/components/inputbox/InputBox";
import { SwitchPrimary } from "@/components/switches";
import useLangStore from "@/utils/useLangStore";
import { Stack } from "@mui/material";
import { SECTIONS } from "constants/searchField";
import styled from "styled-components";

export default function CellularInformation() {
  const { lang } = useLangStore();
  return (
    <Container>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Stack direction="row" alignItems="center" gap={"4px"}>
          <h1 data-section-id={SECTIONS.CellularInformation.en}>
            {SECTIONS.CellularInformation[lang]}
          </h1>
        </Stack>
      </Stack>
      <Stack direction="column" flex={1}>
        <FieldItem>
          <FieldLabel>Modem Status</FieldLabel>
          <FieldValue>-</FieldValue>
        </FieldItem>
        <FieldItem>
          <FieldLabel>Network Status</FieldLabel>
          <FieldValue>-</FieldValue>
        </FieldItem>
        <FieldItem>
          <FieldLabel>Current Operator</FieldLabel>
          <FieldValue>-</FieldValue>
        </FieldItem>
        <FieldItem>
          <FieldLabel>Signal Level</FieldLabel>
          <FieldValue>-</FieldValue>
        </FieldItem>
        <FieldItem>
          <FieldLabel>Socket Type</FieldLabel>
          <FieldValue>-</FieldValue>
        </FieldItem>
        <FieldItem>
          <FieldLabel>Socket</FieldLabel>
          <FieldValue>-</FieldValue>
        </FieldItem>
      </Stack>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  box-shadow: 0px 1px 5px 0px #0000001a;
  border-radius: 8px;
  padding: 24px;
  gap: 16px;

  h1 {
    padding: 16px 0;
    font-weight: 700;
    font-size: 16px;
    line-height: 14px;
  }
`;

const FieldItem = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 1px solid var(--grey4);
`;
const FieldLabel = styled.div`
  flex: 1;
  padding: 24px 4px;
  font-size: 14px;
  line-height: 14px;
`;
const FieldValue = styled.div`
  flex: 1;
  padding: 24px 8px;
  font-size: 14px;
  line-height: 14px;
`;
