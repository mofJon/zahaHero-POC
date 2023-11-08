export type State = {
  bloom: boolean;
  data: Record<string, any> | null;
  heroLoaded: boolean;
  homeData: Record<string, any>;
  isLoaded: boolean;
  sections: Record<string, any>[];
  shaderLoaded: boolean;
};

export type Action = {
  setBloom: (bloom: boolean) => void;
  setData: (data: Record<string, any>) => void;
  setHeroLoaded: (heroLoaded: boolean) => void;
  setIsLoaded: (isLoaded: boolean) => void;
  setShaderLoaded: (shaderLoaded: boolean) => void;
};
