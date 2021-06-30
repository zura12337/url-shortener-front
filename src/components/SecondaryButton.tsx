import { Button } from "@chakra-ui/react";
import React from "react";

export default function SecondaryButton({
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
      border="3px solid #364D66"
      bg="none"
      color="#364D66"
      _hover={{ bg: "#364D66", color: "white" }}
      _active={{}}
      onClick={() => onClick()}
      {...rest}
    >
      {label}
    </Button>
  );
}
