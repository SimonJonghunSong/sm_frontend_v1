"use client";

import { send } from "process";
import {
  createContext,
  PropsWithChildren,
  useContext,
  useRef,
  useState,
} from "react";

// RESOURCES:
// https://web.dev/serial/
// https://reillyeon.github.io/serial/#onconnect-attribute-0
// https://codelabs.developers.google.com/codelabs/web-serial

export type PortState = "closed" | "closing" | "open" | "opening";

export type SerialMessage = {
  value: string;
  timestamp: number;
};

const log = (...args) => console.log(...args);

type SerialMessageCallback = (message: SerialMessage) => void;

export interface SerialContextValue {
  selectPort: () => void;
  manualConnect: () => void;
  write: (message: string) => void;
  close: () => void;
  msg: string[];
}
export const SerialContext = createContext<SerialContextValue>({
  selectPort: () => {},
  manualConnect: () => {},
  write: () => {},
  close: () => {},
  msg: [],
});

const encoder = new TextEncoder();
const decoder = new TextDecoder();

export const useSerial = () => useContext(SerialContext);

interface SerialProviderProps {}

const SerialProvider = ({
  children,
}: PropsWithChildren<SerialProviderProps>) => {
  const portRef = useRef<SerialPort | null>(null);
  const readerRef = useRef<ReadableStreamDefaultReader | null>(null);
  const [msg, setMsg] = useState<string[]>([]);

  const selectPort = async () => {
    try {
      if (!navigator.serial) return false;

      const port = await navigator.serial.requestPort();
      log(port);
      const { usbProductId, usbVendorId } = await port.getInfo();
      const portList = await navigator.serial.getPorts();
      portRef.current = portList.find(
        (p) =>
          p.getInfo().usbProductId === usbProductId &&
          p.getInfo().usbVendorId === usbVendorId
      );
      return true;
    } catch (e) {}
  };

  const connect = async () => {
    if (!portRef.current) return;
    try {
      await portRef.current.open({
        baudRate: 115200,
      });
      log(portRef.current);
      monitor();
    } catch (error) {
      console.log(error);
    }
  };

  async function monitor() {
    const reader = portRef.current.readable.getReader();
    readerRef.current = reader;

    try {
      while (true) {
        const { value, done } = await readerRef.current.read();
        console.log(portRef.current.readable.tee());

        console.log("reading......");
        if (done) {
          readerRef.current.releaseLock();
          break;
        }
        const decoded = decoder.decode(value);
        setMsg((prev) => [...prev, decoded]);
      }
    } catch (error) {
      console.log("reading error", error);
    } finally {
      readerRef.current.releaseLock();
    }
  }

  const write = async (data: string) => {
    if (portRef.current.writable) {
      try {
        const writer = portRef.current.writable.getWriter();
        await writer.write(encoder.encode(data));
        writer.releaseLock();
      } catch (error) {
        console.log("write Error: ", error);
      }
    }
  };

  const close = async () => {
    if (readerRef.current) {
      await readerRef.current.cancel();
    }
    await portRef.current.close();
  };

  return (
    <SerialContext.Provider
      value={{
        selectPort,
        write,
        close,
        manualConnect: connect,
        msg,
      }}
    >
      {children}
    </SerialContext.Provider>
  );
};

export default SerialProvider;
