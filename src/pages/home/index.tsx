import { Box, Button, Flex, Input, Text } from "@chakra-ui/react";
import React from "react";

export default function HomePage() {
  return (
    <Flex w="100%" h="100vh" justifyContent="center">
      <Flex
        w="100%"
        h="max-content"
        bg="#28384A"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
        gridGap={5}
        py="100px"
      >
        <Text
          fontFamily="heading"
          fontSize={62}
          letterSpacing="1.2px"
          color="white"
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
          >
            Shorten
          </Button>
        </Box>
      </Flex>
    </Flex>
  );
}
