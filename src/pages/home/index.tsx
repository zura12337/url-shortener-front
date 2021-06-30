import {
  Box,
  Button,
  Flex,
  Grid,
  Input,
  Link,
  Text,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { getMyUrls, shortenUrl } from "../../api";
import { useHistory } from "react-router-dom";
import { UrlType } from "../../types";

export default function HomePage() {
  const [url, setUrl] = useState<string>("");
  const [myUrls, setMyUrls] = useState<UrlType[]>([]);
  const toast = useToast();
  const history = useHistory();

  useEffect(() => {
    fetchUrls();
  }, []);

  const fetchUrls = async () => {
    const response = await getMyUrls();
    if (response.status === 200) {
      setMyUrls(response.data);
    }
  };

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
            if (response.status === 200) {
              setMyUrls([response.data, ...myUrls]);
            }
          }}
        >
          Shorten
        </Button>
      </Box>
      {myUrls && myUrls.length > 0 && (
        <Box
          w="65%"
          h="max-content"
          p={5}
          bg="white"
          borderRadius="9px"
          mt={10}
        >
          {myUrls.map((url: UrlType) => (
            <Grid
              gridTemplateColumns="6fr 3fr 1fr 1.5fr"
              gridGap={5}
              alignItems="center"
              mt={3}
            >
              <Text w="300px" noOfLines={1} textOverflow="ellipsis">
                {url.originalUrl}
              </Text>
              <Link color="blue.500" href={url.shortUrl} noOfLines={1}>
                {url.shortUrl}
              </Link>
              <Button
                border="3px solid #364D66"
                bg="none"
                color="#364D66"
                _hover={{ bg: "#364D66", color: "white" }}
                _active={{}}
                onClick={() => {
                  navigator.clipboard.writeText(url.shortUrl);
                  toast({
                    title: "Link copied succesfully",
                    duration: 2000,
                    isClosable: true,
                  });
                }}
              >
                Copy
              </Button>
              <Button
                border="3px solid #364D66"
                bg="none"
                color="#364D66"
                _hover={{ bg: "#364D66", color: "white" }}
                _active={{}}
                onClick={() => {
                  history.push(`/statistics/${url.id}`);
                }}
              >
                Statistics
              </Button>
            </Grid>
          ))}
        </Box>
      )}
    </Flex>
  );
}
