import useLangStore from "@/utils/useLangStore";
import {
  Button,
  CircularProgress,
  MenuItem,
  Select,
  Stack,
  Tooltip,
} from "@mui/material";
import { FIELD_VALIDATIONS } from "constants/field";
import styled from "styled-components";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
import InputBox from "@/components/inputbox/InputBox";
import { useState } from "react";
import useParameterStore from "@/utils/useParameterStore";
import { hiddenParameterId } from "../(tabs)/CommandTab";

interface Props {
  id: string;
  imei: string;
  handleSendCommand: (command: string) => void;
  buttonText: string;
  isLoading: boolean;
}

export default function TimeRangeCommandField({
  id,
  imei,
  handleSendCommand,
  buttonText,
  isLoading,
}: Props) {
  const [startHour, setStartHour] = useState<string>("");
  const [startMinute, setStartMinute] = useState<string>("");
  const [endHour, setEndHour] = useState<string>("");
  const [endMinute, setEndMinute] = useState<string>("");

  const { hiddenParameter } = useParameterStore();
  const isHiddenParameter = hiddenParameterId.includes(id);

  const { lang } = useLangStore();

  if (isHiddenParameter && hiddenParameter) return null;

  return (
    <Container>
      <Title $isHiddenParameter={isHiddenParameter}>
        <h3>{FIELD_VALIDATIONS[id].title[lang]}</h3>
        <Tooltip
          title={FIELD_VALIDATIONS[id].tooltip[lang]}
          placement="top"
          slotProps={{
            popper: {
              modifiers: [
                {
                  name: "offset",
                  options: {
                    offset: [0, -12],
                  },
                },
              ],
            },
          }}
        >
          <ErrorOutlineOutlinedIcon
            sx={{ fontSize: "22px", color: "var(--grey5)" }}
          />
        </Tooltip>
        <InputBox.Number>{id}</InputBox.Number>
      </Title>
      <InputWithButton>
        <Stack width={"100%"} direction="row" gap={"8px"} alignItems={"center"}>
          <Stack flex={1} direction="row" gap={"8px"} alignItems={"center"}>
            <Select
              fullWidth
              value={startHour}
              onChange={(e) => setStartHour(e.target.value)}
            >
              <MenuItem value={"00"}>00</MenuItem>
              <MenuItem value={"01"}>01</MenuItem>
              <MenuItem value={"02"}>02</MenuItem>
              <MenuItem value={"03"}>03</MenuItem>
              <MenuItem value={"04"}>04</MenuItem>
              <MenuItem value={"05"}>05</MenuItem>
              <MenuItem value={"06"}>06</MenuItem>
              <MenuItem value={"07"}>07</MenuItem>
              <MenuItem value={"08"}>08</MenuItem>
              <MenuItem value={"09"}>09</MenuItem>
              <MenuItem value={"10"}>10</MenuItem>
              <MenuItem value={"11"}>11</MenuItem>
              <MenuItem value={"12"}>12</MenuItem>
              <MenuItem value={"13"}>13</MenuItem>
              <MenuItem value={"14"}>14</MenuItem>
              <MenuItem value={"15"}>15</MenuItem>
              <MenuItem value={"16"}>16</MenuItem>
              <MenuItem value={"17"}>17</MenuItem>
              <MenuItem value={"18"}>18</MenuItem>
              <MenuItem value={"19"}>19</MenuItem>
              <MenuItem value={"20"}>20</MenuItem>
              <MenuItem value={"21"}>21</MenuItem>
              <MenuItem value={"22"}>22</MenuItem>
              <MenuItem value={"23"}>23</MenuItem>
            </Select>
            :
            <Select
              fullWidth
              value={startMinute}
              onChange={(e) => setStartMinute(e.target.value)}
            >
              <MenuItem value={"00"}>00</MenuItem>
              <MenuItem value={"01"}>01</MenuItem>
              <MenuItem value={"02"}>02</MenuItem>
              <MenuItem value={"03"}>03</MenuItem>
              <MenuItem value={"04"}>04</MenuItem>
              <MenuItem value={"05"}>05</MenuItem>
              <MenuItem value={"06"}>06</MenuItem>
              <MenuItem value={"07"}>07</MenuItem>
              <MenuItem value={"08"}>08</MenuItem>
              <MenuItem value={"09"}>09</MenuItem>
              <MenuItem value={"10"}>10</MenuItem>
              <MenuItem value={"11"}>11</MenuItem>
              <MenuItem value={"12"}>12</MenuItem>
              <MenuItem value={"13"}>13</MenuItem>
              <MenuItem value={"14"}>14</MenuItem>
              <MenuItem value={"15"}>15</MenuItem>
              <MenuItem value={"16"}>16</MenuItem>
              <MenuItem value={"17"}>17</MenuItem>
              <MenuItem value={"18"}>18</MenuItem>
              <MenuItem value={"19"}>19</MenuItem>
              <MenuItem value={"20"}>20</MenuItem>
              <MenuItem value={"21"}>21</MenuItem>
              <MenuItem value={"22"}>22</MenuItem>
              <MenuItem value={"23"}>23</MenuItem>
              <MenuItem value={"24"}>24</MenuItem>
              <MenuItem value={"25"}>25</MenuItem>
              <MenuItem value={"26"}>26</MenuItem>
              <MenuItem value={"27"}>27</MenuItem>
              <MenuItem value={"28"}>28</MenuItem>
              <MenuItem value={"29"}>29</MenuItem>
              <MenuItem value={"30"}>30</MenuItem>
              <MenuItem value={"31"}>31</MenuItem>
              <MenuItem value={"32"}>32</MenuItem>
              <MenuItem value={"33"}>33</MenuItem>
              <MenuItem value={"34"}>34</MenuItem>
              <MenuItem value={"35"}>35</MenuItem>
              <MenuItem value={"36"}>36</MenuItem>
              <MenuItem value={"37"}>37</MenuItem>
              <MenuItem value={"38"}>38</MenuItem>
              <MenuItem value={"39"}>39</MenuItem>
              <MenuItem value={"40"}>40</MenuItem>
              <MenuItem value={"41"}>41</MenuItem>
              <MenuItem value={"42"}>42</MenuItem>
              <MenuItem value={"43"}>43</MenuItem>
              <MenuItem value={"44"}>44</MenuItem>
              <MenuItem value={"45"}>45</MenuItem>
              <MenuItem value={"46"}>46</MenuItem>
              <MenuItem value={"47"}>47</MenuItem>
              <MenuItem value={"48"}>48</MenuItem>
              <MenuItem value={"49"}>49</MenuItem>
              <MenuItem value={"50"}>50</MenuItem>
              <MenuItem value={"51"}>51</MenuItem>
              <MenuItem value={"52"}>52</MenuItem>
              <MenuItem value={"53"}>53</MenuItem>
              <MenuItem value={"54"}>54</MenuItem>
              <MenuItem value={"55"}>55</MenuItem>
              <MenuItem value={"56"}>56</MenuItem>
              <MenuItem value={"57"}>57</MenuItem>
              <MenuItem value={"58"}>58</MenuItem>
              <MenuItem value={"59"}>59</MenuItem>
            </Select>
          </Stack>
          ~
          <Stack flex={1} direction="row" gap={"8px"} alignItems={"center"}>
            <Select
              fullWidth
              value={endHour}
              onChange={(e) => setEndHour(e.target.value)}
            >
              <MenuItem value={"00"}>00</MenuItem>
              <MenuItem value={"01"}>01</MenuItem>
              <MenuItem value={"02"}>02</MenuItem>
              <MenuItem value={"03"}>03</MenuItem>
              <MenuItem value={"04"}>04</MenuItem>
              <MenuItem value={"05"}>05</MenuItem>
              <MenuItem value={"06"}>06</MenuItem>
              <MenuItem value={"07"}>07</MenuItem>
              <MenuItem value={"08"}>08</MenuItem>
              <MenuItem value={"09"}>09</MenuItem>
              <MenuItem value={"10"}>10</MenuItem>
              <MenuItem value={"11"}>11</MenuItem>
              <MenuItem value={"12"}>12</MenuItem>
              <MenuItem value={"13"}>13</MenuItem>
              <MenuItem value={"14"}>14</MenuItem>
              <MenuItem value={"15"}>15</MenuItem>
              <MenuItem value={"16"}>16</MenuItem>
              <MenuItem value={"17"}>17</MenuItem>
              <MenuItem value={"18"}>18</MenuItem>
              <MenuItem value={"19"}>19</MenuItem>
              <MenuItem value={"20"}>20</MenuItem>
              <MenuItem value={"21"}>21</MenuItem>
              <MenuItem value={"22"}>22</MenuItem>
              <MenuItem value={"23"}>23</MenuItem>
            </Select>
            :
            <Select
              fullWidth
              value={endMinute}
              onChange={(e) => setEndMinute(e.target.value)}
            >
              <MenuItem value={"00"}>00</MenuItem>
              <MenuItem value={"01"}>01</MenuItem>
              <MenuItem value={"02"}>02</MenuItem>
              <MenuItem value={"03"}>03</MenuItem>
              <MenuItem value={"04"}>04</MenuItem>
              <MenuItem value={"05"}>05</MenuItem>
              <MenuItem value={"06"}>06</MenuItem>
              <MenuItem value={"07"}>07</MenuItem>
              <MenuItem value={"08"}>08</MenuItem>
              <MenuItem value={"09"}>09</MenuItem>
              <MenuItem value={"10"}>10</MenuItem>
              <MenuItem value={"11"}>11</MenuItem>
              <MenuItem value={"12"}>12</MenuItem>
              <MenuItem value={"13"}>13</MenuItem>
              <MenuItem value={"14"}>14</MenuItem>
              <MenuItem value={"15"}>15</MenuItem>
              <MenuItem value={"16"}>16</MenuItem>
              <MenuItem value={"17"}>17</MenuItem>
              <MenuItem value={"18"}>18</MenuItem>
              <MenuItem value={"19"}>19</MenuItem>
              <MenuItem value={"20"}>20</MenuItem>
              <MenuItem value={"21"}>21</MenuItem>
              <MenuItem value={"22"}>22</MenuItem>
              <MenuItem value={"23"}>23</MenuItem>
              <MenuItem value={"24"}>24</MenuItem>
              <MenuItem value={"25"}>25</MenuItem>
              <MenuItem value={"26"}>26</MenuItem>
              <MenuItem value={"27"}>27</MenuItem>
              <MenuItem value={"28"}>28</MenuItem>
              <MenuItem value={"29"}>29</MenuItem>
              <MenuItem value={"30"}>30</MenuItem>
              <MenuItem value={"31"}>31</MenuItem>
              <MenuItem value={"32"}>32</MenuItem>
              <MenuItem value={"33"}>33</MenuItem>
              <MenuItem value={"34"}>34</MenuItem>
              <MenuItem value={"35"}>35</MenuItem>
              <MenuItem value={"36"}>36</MenuItem>
              <MenuItem value={"37"}>37</MenuItem>
              <MenuItem value={"38"}>38</MenuItem>
              <MenuItem value={"39"}>39</MenuItem>
              <MenuItem value={"40"}>40</MenuItem>
              <MenuItem value={"41"}>41</MenuItem>
              <MenuItem value={"42"}>42</MenuItem>
              <MenuItem value={"43"}>43</MenuItem>
              <MenuItem value={"44"}>44</MenuItem>
              <MenuItem value={"45"}>45</MenuItem>
              <MenuItem value={"46"}>46</MenuItem>
              <MenuItem value={"47"}>47</MenuItem>
              <MenuItem value={"48"}>48</MenuItem>
              <MenuItem value={"49"}>49</MenuItem>
              <MenuItem value={"50"}>50</MenuItem>
              <MenuItem value={"51"}>51</MenuItem>
              <MenuItem value={"52"}>52</MenuItem>
              <MenuItem value={"53"}>53</MenuItem>
              <MenuItem value={"54"}>54</MenuItem>
              <MenuItem value={"55"}>55</MenuItem>
              <MenuItem value={"56"}>56</MenuItem>
              <MenuItem value={"57"}>57</MenuItem>
              <MenuItem value={"58"}>58</MenuItem>
              <MenuItem value={"59"}>59</MenuItem>
            </Select>
          </Stack>
        </Stack>
        <Button
          variant="contained"
          color="secondary"
          disabled={
            !startHour || !startMinute || !endHour || !endMinute || isLoading
          }
          onClick={() => {
            const tabId = id.slice(0, 2);
            const fieldId = id.slice(2);

            const value = `${startHour}:${startMinute},${endHour}:${endMinute}`;

            handleSendCommand(`AT^CMD;${imei};${tabId};${fieldId};${value}`);
          }}
          style={{
            minWidth: "84px",
          }}
        >
          {isLoading ? <CircularProgress size={20} /> : buttonText}
        </Button>
      </InputWithButton>
    </Container>
  );
}

const InputWithButton = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
`;

const Title = styled.div<{ $isHiddenParameter: boolean }>`
  display: flex;
  align-items: center;
  gap: 4px;
  flex: 1;

  h3 {
    width: fit-content;
    color: ${(props) => (props.$isHiddenParameter ? "#FF0000" : "#6f6f6f")};
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  gap: 8px;
`;
