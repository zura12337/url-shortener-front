import { Box, Flex, Input, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { getMyUrls, shortenUrl } from "../../api";
import { UrlType } from "../../types";
import UrlsList from "../../components/UrlsList";
import PrimaryButton from "../../components/PrimaryButton";

export default function HomePage() {
  const [url, setUrl] = useState<string>("");
  const [myUrls, setMyUrls] = useState<UrlType[]>([]);
  const [urlsLoading, setUrlsLoading] = useState<boolean>(false);
  const [newUrlLoading, setNewUrlLoading] = useState<boolean>(false);

  useEffect(() => {
    fetchUrls();
  }, []);

  const fetchUrls = async () => {
    setUrlsLoading(true);
    const response = await getMyUrls();
    if (response.status === 200) {
      setMyUrls(response.data);
    }
    setUrlsLoading(false);
  };

  return (
    <Flex
      w="100%"
      h="100vh"
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
          value={url}
          onChange={(e: any) => setUrl(e.target.value)}
        />
        <PrimaryButton
          label="Shorten"
          onClick={async () => {
            setNewUrlLoading(true);
            const response = await shortenUrl(url);
            if (response.status === 200) {
              let newUrls;
              if (myUrls.includes(response.data)) {
                newUrls = myUrls.filter((url) => url.id !== response.data.id);
                newUrls = [response.data, ...newUrls];
              } else {
                newUrls = [response.data, ...myUrls];
              }
              setMyUrls(newUrls);
            }
            setUrl("");
            setNewUrlLoading(false);
          }}
          loading={newUrlLoading}
          position="absolute"
          top="5px"
          right="5px"
        />
      </Box>
      <UrlsList urls={myUrls} loading={urlsLoading} />
    </Flex>
  );
}
