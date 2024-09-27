export function splitArrayIntoChunks<T>(array: T[], chunkSize = 20) {
  let result = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    result.push(array.slice(i, i + chunkSize));
  }

  return result as T[][];
}

interface IChunkDataByNumber {
  prefix: string;
  target: string;
  chuckString?: string;
  chunkSize?: number;
}

export function chunkDataByNumber({
  prefix,
  target,
  chuckString = ";",
  chunkSize = 20,
}: IChunkDataByNumber) {
  return splitArrayIntoChunks(target.split(chuckString), chunkSize).map(
    (item) => `${prefix}${item.join(chuckString)}`
  );
}

type TWriteFunc = ({
  data,
  port,
  writer,
  callback,
}: {
  data: string;
  port: SerialPort;
  writer: WritableStreamDefaultWriter<string>;
  callback?: () => void;
}) => Promise<boolean>;

interface IWriteOptions {
  write: TWriteFunc;
  writer: WritableStreamDefaultWriter<string>;
  port: SerialPort;
  callback?: () => void;
}

export async function writeChunkData(
  { write, writer, port, callback }: IWriteOptions,
  chunks: string[]
) {
  for (let i = 0; i < chunks.length; i++) {
    await write({
      data: chunks[i],
      writer,
      port,
      callback,
    });
  }
}

export async function chunkDataByNumberAndWrite(
  writeOptions: IWriteOptions,
  chunkOptions: IChunkDataByNumber
) {
  const writeChunkDatas = chunkDataByNumber(chunkOptions);

  await writeChunkData(writeOptions, writeChunkDatas);
}
