import { Link, Box, Text, Flex, Grid, Divider, Image } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { getUrlData } from "../../api";
import { UrlMetadataType, UrlType } from "../../types";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
} from "recharts";
import { useHistory } from "react-router-dom";
import SecondaryButton from "../../components/SecondaryButton";
import Loading from "../../components/Loading";
import Chart from "../../components/Chart";

export default function StatisticsPage({ match }: { match: any }) {
  const id = match.params.id;
  const [urlData, setUrlData] = useState<UrlType>();
  const [urlMetadata, setUrlMetadata] = useState<UrlMetadataType>();
  const history = useHistory();
  const [loading, isLoading] = useState<boolean>(false);

  useEffect(() => {
    fetchUrl();
  }, []);

  const fetchUrl = async () => {
    isLoading(true);
    const response = await getUrlData(id);
    if (response.status === 200) {
      setUrlData(response.data.url);
      setUrlMetadata(response.data.metadata);
    }
    isLoading(false);
  };

  return (
    <Box pt="5%" px="10%">
      <SecondaryButton
        label="Go Back"
        onClick={() => history.push("/")}
        position="relative"
        bottom="50px"
        bg="white"
        px={10}
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
      {urlData && urlMetadata && (
        <>
          <Text color="white" fontSize={30} mb={5}>
            Link Analytics
          </Text>
          <Flex
            bg="white"
            px={5}
            py={4}
            h="130px"
            w="100%"
            boxShadow="5px 0 10px rgba(0,0,0,.3)"
            borderRadius="5px"
            position="relative"
            gridGap={5}
            alignItems="center"
          >
            <Image
              src={urlMetadata.image}
              alt={urlMetadata.title}
              borderRadius="10px"
              h="max-content"
              w="140px"
            />
            <Box>
              <Text mb={2}>{urlMetadata.title}</Text>
              <Text color="gray.500">{urlData.originalUrl}</Text>
              <Divider my={3} />
              <Link color="blue.600" href={urlData.shortUrl}>
                {urlData.shortUrl}
              </Link>
              <Box
                position="absolute"
                borderWidth="1px"
                borderColor="gray.500"
                color="gray.500"
                px={2}
                py={1}
                top="10px"
                right="10px"
                borderRadius={5}
                fontSize={14}
              >
                {urlData.date}
              </Box>
            </Box>
          </Flex>
          {urlData.visitors.length > 0 ? (
            <Grid maxW="100%" gridTemplateColumns={["1fr", "1fr", "1fr", "1fr", "1fr 1fr"]} gridGap={10}>
              <Chart
                label={`Clicks: ${urlData.visitors.length}`}
                data={urlData.visitors}
                objKey="visitors"
              />
              <Chart
                label={`Unique users: ${urlData.uniqueVisitors.length}`}
                data={urlData.uniqueVisitors}
                objKey="uniqueVisitors"
              />
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
          ) : (
            <Text textAlign="center" mt={50} fontSize={32} color="white">
              No one visited this link yet
            </Text>
          )}
        </>
      )}
    </Box>
  );
}
