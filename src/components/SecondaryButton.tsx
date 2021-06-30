import { Button } from "@chakra-ui/react";
import React from "react";

export default function SecondaryButton({
  label,
  onClick,
}: {
  label: string;
  onClick: Function;
}) {
  return (
    <Button
      border="3px solid #364D66"
      bg="none"
      color="#364D66"
      _hover={{ bg: "#364D66", color: "white" }}
      _active={{}}
      onClick={() => onClick()}
    >
      {label}
    </Button>
  );
}
