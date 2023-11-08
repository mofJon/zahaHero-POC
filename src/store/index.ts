import { create, StateCreator } from "zustand";
import { Action, State } from "./types";

const stateCreator: StateCreator<State & Action> = (set) => ({
  bloom: false,
  data: null,
  homeData: {},
  isLoaded: false,
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
  setIsLoaded: (isLoaded: boolean) => set({ isLoaded }),
});

const useStore = create<State & Action>(stateCreator);

export default useStore;
