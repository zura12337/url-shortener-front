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
import UrlsList from "../../components/UrlsList";
import PrimaryButton from "../../components/PrimaryButton";

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
        <PrimaryButton
          label="Shorten"
          onClick={async () => {
            const response = await shortenUrl(url);
            if (response.status === 200) {
              setMyUrls([response.data, ...myUrls]);
            }
          }}
          position="absolute"
          top="5px"
          right="5px"
        />
      </Box>
      {myUrls && myUrls.length > 0 && <UrlsList urls={myUrls} />}
    </Flex>
  );
}
