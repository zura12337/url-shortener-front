import { Box, Button, Flex, Input, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { shortenUrl } from "../../api";

export default function HomePage() {
  const [url, setUrl] = useState<string>("");
  const [error, setError] = useState<string>("TESTING");

  return (
    <Flex
      w="100%"
      h="100vh"
      bg="#364d66"
      alignItems="center"
      flexDirection="column"
      gridGap={5}
    >
      <Text
        fontFamily="heading"
        fontSize={62}
        letterSpacing="1.2px"
        color="white"
        mt={100}
      >
        Link Shortener
      </Text>
      <Box position="relative" w="50%">
        <Input
          name="url"
          bg="white"
          placeholder="Shorten your link"
          w="100%"
          fontFamily="body"
          fontSize={18}
          h="60px"
          p={5}
          onChange={(e: any) => setUrl(e.target.value)}
          border={error && "3px solid red.400"}
        />
        <Button
          position="absolute"
          top="5px"
          right="5px"
          bg="#28384A"
          color="white"
          fontWeight="light"
          px={10}
          py="25px"
          _hover={{ bg: "#1c2938" }}
          _focus={{}}
          _active={{}}
          zIndex={1}
          onClick={async () => {
            const response = await shortenUrl(url);
            console.log(response);
          }}
        >
          Shorten
        </Button>
      </Box>
    </Flex>
  );
}
