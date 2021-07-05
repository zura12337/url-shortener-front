import { Box, Button, Grid, Link, Text, useToast } from "@chakra-ui/react";
import React from "react";
import { UrlType } from "../types";
import { useHistory } from "react-router-dom";
import SecondaryButton from "./SecondaryButton";
import {UrlLoading} from "./UrlLoading";

export default function UrlsList({ urls, loading }: { urls: UrlType[], loading?: boolean }) {
  const toast = useToast();
  const history = useHistory();

  return (
    <Box w="75%" h="max-content" p={5} bg="white" borderRadius="9px">
      {urls && urls.length > 0 ? (urls.map((url: UrlType) => (
        <Grid
          gridTemplateColumns="7fr 2.7fr 1fr 1.4fr"
          gridGap={5}
          alignItems="center"
          mt={3}
        >
          <Text noOfLines={1} textOverflow="ellipsis">
            {url.originalUrl}
          </Text>
          <Link color="blue.500" href={url.shortUrl} noOfLines={1} _focus={{}}>
            {url.shortUrl}
          </Link>
          <SecondaryButton
            label="Copy"
            onClick={() => {
              navigator.clipboard.writeText(url.shortUrl);
              toast({
                title: "Link copied succesfully",
                duration: 2000,
                isClosable: true,
              });
            }}
          />
          <SecondaryButton
            label="Statistics"
            onClick={() => {
              history.push(`/statistics/${url.id}`);
            }}
          />
        </Grid>
      ))) : loading ? (
        <>
          <UrlLoading />
          <UrlLoading />
          <UrlLoading />
          <UrlLoading />
          <UrlLoading />
          <UrlLoading />
        </>
      ) : (
        <Text fontSize={22} textAlign="center" fontWeight="bold">You have not shortened URL yet.</Text>
      )}
    </Box>
  );
}
