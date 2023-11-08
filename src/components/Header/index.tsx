"use client";
import { FC } from "react";
import { MotionBox, Text } from "@components";
import { Container, HStack, Spacer } from "@panda/jsx";
import Image from "next/image";
import Nav from "@assets/images/iconNav.svg";
import { headerContainer, logoHolder, headerHolder, headerNav } from "./styles";
import { fadeIn } from "@theme/animations";
import { useRouter, usePathname } from "next/navigation";
import useStore from "@store";
interface HeaderProps {
  isActive?: boolean;
}

const Header: FC<HeaderProps> = ({ isActive = true }) => {
  const isLoaded = useStore((state) => state.isLoaded);
  const router = useRouter();
  const pathname = usePathname();

  if (pathname === "/") return null;

  const handleGoHome = () => {
    router.push("/");
  };

  return (
    <Container {...headerContainer}>
      <HStack {...headerHolder}>
        <MotionBox {...fadeIn(isActive)} {...logoHolder} onClick={handleGoHome}>
          Zaha Hadid Architects
        </MotionBox>
        <MotionBox {...headerNav} {...fadeIn(isLoaded, 1.4)}>
          <Image
            alt="nav"
            src={`${Nav.src}`}
            quality={100}
            width={65}
            height={65}
            priority
            style={{ marginRight: "-1rem" }}
          />
        </MotionBox>
      </HStack>
    </Container>
  );
};

export default Header;
