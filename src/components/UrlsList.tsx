import { Box, Button, Grid, Link, Text, useToast } from "@chakra-ui/react";
import React from "react";
import { UrlType } from "../types";
import { useHistory } from "react-router-dom";
import SecondaryButton from "./SecondaryButton";

export default function UrlsList({ urls }: { urls: UrlType[] }) {
  const toast = useToast();
  const history = useHistory();

  return (
    <Box w="75%" h="max-content" p={5} bg="white" borderRadius="9px" mt={10}>
      {urls.map((url: UrlType) => (
        <Grid
          gridTemplateColumns="7fr 6fr 1fr 1.5fr"
          gridGap={5}
          alignItems="center"
          mt={3}
        >
          <Text noOfLines={1} textOverflow="ellipsis">
            {url.originalUrl}
          </Text>
          <Link color="blue.500" href={url.shortUrl} noOfLines={1}>
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
      ))}
    </Box>
  );
}
