import {
  Box,
  Text,
  Flex,
  Grid,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { getUrlData, editUrl } from "../../api";
import { UrlMetadataType, UrlType } from "../../types";
import { useHistory } from "react-router-dom";
import SecondaryButton from "../../components/SecondaryButton";
import Loading from "../../components/Loading";
import Chart from "../../components/Chart";
import {UrlInfo} from "../../components/UrlInfo";

export default function StatisticsPage({ match }: { match: any }) {
  const id = match.params.id;
  const history = useHistory();
  const { data, isLoading: loading } = getUrlData(id);
  const [urlData, setUrlData] = useState<UrlType>();
  const [urlMetadata, setUrlMetadata] = useState<UrlMetadataType>();
  const toast = useToast();

  useEffect(() => {
    if (data) {
      setUrlData(data.url);
      setUrlMetadata(data.metadata);
    }
  }, [data]);

  return (
    <Box pt="5%" px="10%">
      <SecondaryButton
        label="Go Back"
        onClick={() => history.push("/")}
        position="relative"
        bg="white"
        px={[2, 3, 5, 10]}
        py={5}
        _focus={{}}
        _hover={{}}
      />
      {loading && (
        <Grid
          position="absolute"
          w="100%"
          top="0"
          left="0"
          h="100vh"
          placeItems="center"
        >
          <Loading />
        </Grid>
      )}
      {urlData && urlData.status !== "remove" ? (
        <>
          <Text color="white" fontSize={30} mb={5} float="right">
            Link Analytics
          </Text>
          {urlData && (
            <UrlInfo urlData={urlData} urlMetadata={urlMetadata} />
          )}
          {urlData.visitors.length > 0 && urlData.status !== "pause" ? (
            <>
              <Grid
                maxW="100%"
                gridTemplateColumns={["1fr", "1fr", "1fr", "1fr", "1fr 1fr"]}
                gridGap={10}
              >
                <Chart
                  label={`Clicks: ${urlData.visitors.length}`}
                  data={urlData.visitors}
                  objKey="date"
                />
                <Chart
                  label={`Unique users: ${urlData.uniqueVisitors.length}`}
                  data={urlData.uniqueVisitors}
                  objKey="date"
                />
              </Grid>
              <Grid
                maxW="100%"
                gridTemplateColumns={[
                  "1fr",
                  "1fr",
                  "1fr",
                  "1fr",
                  "1fr 1fr 1fr",
                ]}
                gridGap={10}
              >
                <Chart
                  label="Browsers"
                  type="bar"
                  data={urlData.visitors}
                  objKey="browser"
                />
                <Chart
                  label="Devices"
                  type="bar"
                  data={urlData.visitors}
                  objKey="os"
                />
                <Chart
                  label="Geolocation"
                  type="bar"
                  data={urlData.visitors}
                  objKey="location"
                />
              </Grid>
            </>
          ) : urlData.status === "pause" ? (
            <Flex
              justifyContent="center"
              alignItems="center"
              direction="column"
              gridGap={5}
              bg="white"
              borderRadius={9}
              mt="15px"
              py={10}
            >
              <Text textAlign="center" fontSize={32}>
                This URL is disabled
              </Text>
              <SecondaryButton
                bg="white"
                label="Enable"
                onClick={async () => {
                  const response = await editUrl({ id, action: "unpause" });
                  if (response.statusText === "OK") {
                    toast({
                      title: "Link has been enabled",
                      isClosable: true,
                    });
                  }
                }}
              />
            </Flex>
          ) : (
            <Text textAlign="center" mt={50} fontSize={[22, 32]} color="white">
              No one visited this link yet
            </Text>
          )}
        </>
      ) : urlData && urlData.status === "remove" ? (
        <Text
          fontSize={32}
          textAlign="center"
          color="white"
          fontWeight="bold"
          mt="10%"
        >
          This link has been removed by owner
        </Text>
      ) : (
        <></>
      )}
    </Box>
  );
}
