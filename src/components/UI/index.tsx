"use client";
import { FC, ReactNode, useEffect } from "react";
import { Header } from "@components";
import useStore from "@store";

interface IUI {
  children: ReactNode;
  data: Record<string, any>;
}

const UI: FC<IUI> = ({ children, data }) => {
  const [storedData, setData] = useStore((state) => [
    state.data,
    state.setData,
  ]);

  // wouldn't do this with remote fetches. Just for local JSON
  useEffect(() => {
    if (data && data !== storedData) {
      setData(data);
    }
  }, [data]);

  return (
    <>
      <Header />
      {children}
    </>
  );
};

export default UI;
