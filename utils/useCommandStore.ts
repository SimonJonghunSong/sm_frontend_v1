import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CommandState {
  commands: {
    id: number;
    message: string;
  }[];
  addCommand: (message: string) => void;
  removeCommand: (idx: number) => void;
  updateCommand: (idx: number, message: string) => void;
}

const useCommandStore = create(
  persist<CommandState>(
    (set) => ({
      commands: [],
      addCommand: (message) =>
        set((state) => {
          const findItem = state.commands.find(
            ({ message: messageState }) => messageState === message
          );

          if (findItem) {
            return {
              commands: [
                findItem,
                ...state.commands.filter(({ id }) => id !== findItem.id),
              ],
            };
          }

          return {
            commands: [
              { id: state.commands.length, message },
              ...state.commands,
            ].slice(0, 20),
          };
        }),
      removeCommand: (idx) =>
        set((state) => ({
          commands: state.commands.filter(({ id }) => id !== idx),
        })),
      updateCommand: (idx, message) =>
        set((state) => ({
          commands: state.commands.map((command) =>
            command.id === idx ? { ...command, message } : command
          ),
        })),
    }),
    {
      name: "commandStore",
    }
  )
);

export default useCommandStore;
