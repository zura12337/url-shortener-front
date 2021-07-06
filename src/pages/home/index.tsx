import { Box, Flex, Input, Text, useToast } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { getMyUrls, shortenUrl } from "../../api";
import { UrlType } from "../../types";
import UrlsList from "../../components/UrlsList";
import PrimaryButton from "../../components/PrimaryButton";

export default function HomePage() {
  const [url, setUrl] = useState<string>("");
  const { data: urls, isLoading: urlsLoading } = getMyUrls();
  const [myUrls, setMyUrls] = useState<UrlType[]>([])
  const [newUrlLoading, setNewUrlLoading] = useState<boolean>(false);
  const toast = useToast();

  useEffect(() => {
    setMyUrls(urls);
  }, [urls])

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
        fontSize={75}
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
          borderWidth="2px"
        />
        <PrimaryButton
          label="Shorten"
          onClick={async () => {
            setNewUrlLoading(true);
            const response = await shortenUrl(url);
            if (response.status === 200) {
              let newUrls;
              if (myUrls && myUrls.find(item => item.originalUrl === response.data.originalUrl)) {
                newUrls = myUrls.filter((url: UrlType) => url.originalUrl !== response.data.originalUrl);
                newUrls = [response.data, ...newUrls];
              } else {
                newUrls = [response.data, ...myUrls];
              }
              setMyUrls(newUrls);
            } else {
              toast({
                title: response.data,
                status: "error",
                isClosable: true,
              })
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
