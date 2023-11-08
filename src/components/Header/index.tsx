"use client";
import { FC } from "react";
import { MotionBox, Text } from "@components";
import { Container, HStack, Spacer } from "@panda/jsx";
import Image from "next/image";
import Nav from "@assets/images/iconNav.svg";
import { headerContainer, logoHolder, headerHolder, headerNav } from "./styles";
import { fadeIn } from "@theme/animations";
import { useRouter } from "next/navigation";

interface HeaderProps {
  isActive?: boolean;
}

const Header: FC<HeaderProps> = ({ isActive = true }) => {
  const router = useRouter();

  const handleGoHome = () => {
    router.push("/");
  };

  return (
    <Container {...headerContainer}>
      <HStack {...headerHolder}>
        <MotionBox {...fadeIn(isActive)} {...logoHolder} onClick={handleGoHome}>
          Zaha Hadid Architects
        </MotionBox>
        <MotionBox {...headerNav}>
          <Image
            alt="nav"
            src={`${Nav.src}`}
            quality={100}
            width={65}
            height={65}
            style={{ marginRight: "-1rem" }}
          />
        </MotionBox>
      </HStack>
    </Container>
  );
};

export default Header;
