// src/types.d.ts 또는 프로젝트 루트의 types.d.ts
interface Navigator {
  serial: Serial;
}

interface Serial {
  removeEventListener(arg0: string, onPortDisconnect: (e) => void): unknown;
  addEventListener(arg0: string, onconnect: (e: any) => void): unknown;
  requestPort(options?: SerialPortRequestOptions): Promise<SerialPort>;
  getPorts(): Promise<SerialPort[]>;
}

interface SerialPortRequestOptions {
  filters: SerialPortFilter[];
}

interface SerialPortFilter {
  usbVendorId?: number;
  usbProductId?: number;
}

interface SerialPort {
  circulargeofence: string;
  polygongeofence: string;
  onaftercirculargeofence: () => void;
  iscircularfetching: boolean;
  circularfetchcount: number;
  polygonfetchcount: any;
  ispolygonfetching: boolean;
  onafterpolygongeofence: () => void;
  oneditsuccess: () => void;
  onprev: any;
  grpNo: number;
  imei: string;
  forget(): unknown;
  ondisconnect: (e: any) => void;
  injectedId: string;
  getInfo(): {
    usbProductId: number;
    usbVendorId: number;
  };
  readonly readable: ReadableStream<Uint8Array>;
  readonly writable: WritableStream<Uint8Array>;
  open(options: SerialOptions): Promise<void>;
  close(): Promise<void>;
}

interface SerialOptions {
  baudRate: number;
  dataBits?: number;
  stopBits?: number;
  parity?: "none" | "even" | "odd";
  bufferSize?: number;
  flowControl?: "none" | "hardware";
}

interface ReadableStreamDefaultReader<R = any> {
  read(): Promise<ReadableStreamReadResult<R>>;
  releaseLock(): void;
}

interface ReadableStreamReadResult<T> {
  done: boolean;
  value: T;
}

interface WritableStreamDefaultWriter<W = any> {
  write(chunk: W): Promise<void>;
  close(): Promise<void>;
  releaseLock(): void;
}
