import { Flex } from "@chakra-ui/react";
import React from "react";
import { useHistory } from "react-router-dom";
import SecondaryButton from "./SecondaryButton";

export default function NavBar() {
  const history = useHistory();

  return (
    <Flex
      justifyContent="flex-end"
      w="100%"
      bg="#1C2938"
      h="max-content"
      py={3}
      px="20px"
    >
      <SecondaryButton
        bg="white"
        label="Your visited links"
        onClick={() => history.push("/visited")}
      />
    </Flex>
  );
}
