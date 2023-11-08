import { create, StateCreator } from "zustand";
import { Action, State } from "./types";

const stateCreator: StateCreator<State & Action> = (set) => ({
  bloom: false,
  data: {},
  homeData: {},
  isLoading: true,
  sections: [],

  /// setters

  setBloom: (bloom) => set({ bloom }),
  setData: (data) => {
    if (data) {
      set({ data });
      const sections = data.pages.filter((page: any) => page.id !== "home");
      set({ sections });
      const homeData = data.pages.find((page: any) => page.id === "home");
      set({ homeData });
    }
  },
  setIsLoading: (isLoading: boolean) => set({ isLoading }),
});

const useStore = create<State & Action>(stateCreator);

export default useStore;
