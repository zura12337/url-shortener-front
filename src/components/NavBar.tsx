import { Flex, Text } from "@chakra-ui/react";
import React from "react";
import { useHistory, Link } from "react-router-dom";
import SecondaryButton from "./SecondaryButton";

export default function NavBar() {
  const history = useHistory();

  return (
    <Flex
      justifyContent="space-between"
      w="100%"
      bg="#1C2938"
      h="max-content"
      py={3}
      px="20px"
      alignItems="center"
    >
      <Link to="/">
        <Text fontFamily="heading" color="white" fontSize={48} lineHeight=".5" >
          Link Shortener
        </Text>
      </Link>
      <SecondaryButton
        bg="white"
        label="Your visited links"
        onClick={() => history.push("/visited")}
      />
    </Flex>
  );
}
