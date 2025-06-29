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
  isLock: boolean;
  password: string;
  isAlertSend?: boolean;
  onbuffervalue(value: string): unknown;
  onpolygonedit: (value: string) => void;
  circleoutputactivehandler(value: string): unknown;
  iscircleoutputactivefetching: boolean;
  onread(value: string): unknown;
  onjsonpacketcountup: (count: number) => void;
  onafterjsonpacket: () => void;
  iserrorvalue: boolean;
  iscircularpointfetching: any;
  circlehandler(value: string): unknown;
  isjsonpackagefetching: boolean;
  ispackagecountfetching: boolean;
  isimeifetching: boolean;
  modelinfo: string;
  ismodelinfofetching: boolean;
  isRdyStatusFetching: boolean;
  polygonhandler: (value: any) => void;
  ispolygonpointfetching: boolean;
  circlemax: number;
  polygonmax: number;
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
  needsGeofenceRefetch?: boolean;
  isReadyToUse?: boolean;
  isCsvFetching: boolean;
  onCsvDataFetched?: (data: string) => void;
  onEndCsvDataFetched?: () => void;
  onEndCurrentSttDataFetched?: (data: string) => void;
  onEndCurrentAltDataFetched?: (data: string) => void;
  isSttDataFetching?: boolean;
  isAltDataFetching?: boolean;
  isDeviceVersionsFetching?: boolean;
  onEndDeviceVersionsFetched?: (data: string) => void;
  ismodemversionfetching?: boolean;
  modemversion?: string;
  isDeviceCommandSend?: boolean;
  isFirstLoad?: boolean;
  isQuecModel?: boolean;
  isHealthCheck?: boolean;
  connected?: boolean;
  isLoadImei: boolean;
  onLoadImei: (data: string) => void;
  loadedImei?: string;
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
