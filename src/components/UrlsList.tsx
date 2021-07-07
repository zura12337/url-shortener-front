import {
  Box,
  Button,
  Checkbox,
  Flex,
  Grid,
  Link,
  Text,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { UrlType } from "../types";
import { useHistory } from "react-router-dom";
import SecondaryButton from "./SecondaryButton";
import { UrlLoading } from "./UrlLoading";
export default function UrlsList({
  urls,
  loading,
  filterOption = false,
  errorMessage = "You have not shortened URL yet.",
}: {
  urls: UrlType[];
  loading?: boolean;
  filterOption?: boolean;
  errorMessage?: string;
}) {
  const [copied, setCopied] = useState<number>();
  const [filterRemoved, setFilterRemoved] = useState<boolean>(false);

  const toast = useToast();
  const history = useHistory();

  return (
    <Box w="75%" h="max-content" px={5} bg="white" borderRadius="9px">
      {filterOption && (
        <Flex alignItems="center" gridGap={2} justifyContent="flex-end">
          <Checkbox
            name="filter"
            my={5}
            id="filter"
            onChange={(e: any) => setFilterRemoved(e.target.checked)}
          />
          <Text fontWeight="medium">
            <label htmlFor="filter">Filter removed urls</label>
          </Text>
        </Flex>
      )}
      {urls && urls.length > 0 ? (
        urls
          .filter((url) =>
            filterRemoved ? url.status !== "remove" : url.status !== undefined
          )
          .map((url: UrlType, i: number) => (
            <Grid
              gridTemplateColumns="7fr 2.7fr 1fr 1.4fr"
              gridGap={5}
              alignItems="center"
              my={4}
              key={url._id}
            >
              {url.status === "remove" && !filterRemoved ? (
                <Text my="7px" fontWeight="bold">
                  [Removed]
                </Text>
              ) : (
                <>
                  <Text noOfLines={1} textOverflow="ellipsis">
                    <strong>{url.status === "pause" && "[Disabled]"}</strong>{" "}
                    {url.originalUrl}
                  </Text>
                  <Link
                    color="blue.500"
                    href={url.shortUrl}
                    noOfLines={1}
                    _focus={{}}
                  >
                    {url.shortUrl}
                  </Link>
                  <SecondaryButton
                    label={copied === i ? "Copied!" : "Copy"}
                    bg={copied === i ? "#364D66" : "none"}
                    color={copied === i ? "white" : "#364D66"}
                    onClick={() => {
                      navigator.clipboard.writeText(url.shortUrl);
                      toast({
                        title: "Link copied succesfully",
                        duration: 2000,
                        isClosable: true,
                      });
                      setCopied(i);
                    }}
                  />
                  <SecondaryButton
                    label="Statistics"
                    onClick={() => {
                      history.push(`/statistics/${url.id}`);
                    }}
                  />
                </>
              )}
            </Grid>
          ))
      ) : loading ? (
        <>
          <UrlLoading />
          <UrlLoading />
          <UrlLoading />
          <UrlLoading />
          <UrlLoading />
          <UrlLoading />
        </>
      ) : (
        <Text fontSize={22} textAlign="center" fontWeight="bold" my={7}>
          {errorMessage}
        </Text>
      )}
    </Box>
  );
}
