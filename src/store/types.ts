export type State = {
  bloom: boolean;
  data: Record<string, any>;
  homeData: Record<string, any>;
  isLoading: boolean;
  sections: Record<string, any>[];
};

export type Action = {
  setBloom: (bloom: boolean) => void;
  setData: (data: Record<string, any>) => void;
  setIsLoading: (isLoading: boolean) => void;
};
