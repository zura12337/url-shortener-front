import { Button } from "@chakra-ui/react";
import React from "react";

export default function PrimaryButton({
  label,
  onClick,
  ...rest
}: {
  label: string;
  onClick: Function;
  [x: string]: any;
}) {
  return (
    <Button
      bg="#28384A"
      color="white"
      fontWeight="light"
      px={10}
      py="25px"
      _hover={{ bg: "#1c2938" }}
      _focus={{}}
      _active={{}}
      zIndex={1}
      onClick={() => onClick()}
      {...rest}
    >
      {label}
    </Button>
  );
}
