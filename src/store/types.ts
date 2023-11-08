export type State = {
  bloom: boolean;
  data: Record<string, any> | null;
  homeData: Record<string, any>;
  isLoaded: boolean;
  sections: Record<string, any>[];
};

export type Action = {
  setBloom: (bloom: boolean) => void;
  setData: (data: Record<string, any>) => void;
  setIsLoaded: (isLoaded: boolean) => void;
};
