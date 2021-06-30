import { Link, Box, Text, Flex, Grid, Divider } from "@chakra-ui/react";
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
} from "recharts";
import { useHistory } from "react-router-dom";
import SecondaryButton from "../../components/SecondaryButton";
import Loading from "../../components/Loading";

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

  const processData = (data: any[]) => {
    const processedData: any[] = [];

    data.forEach((visitor: any) => {
      if (processedData.length === 0) {
        processedData.push({ date: visitor.date, count: 1 });
      } else {
        if (processedData.find((v) => v.date === visitor.date)) {
          processedData.find((v: any, i: number) => {
            if (v.date === visitor.date) {
              processedData[i]["count"]++;
            }
          });
        } else {
          processedData.push({ date: visitor.date, count: 1 });
        }
      }
    });

    return processedData;
  };

  return (
    <Box pt="5%" px="10%">
      <SecondaryButton
        label="Go Back"
        onClick={() => history.push("/")}
        position="absolute"
        top="10px"
        left="10px"
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
          <Box
            bg="white"
            px={5}
            py={4}
            h="max-content"
            w="100%"
            boxShadow="5px 0 10px rgba(0,0,0,.3)"
            borderRadius="5px"
            position="relative"
          >
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
          <Grid gridTemplateColumns="1fr 1fr" gridGap={10}>
            <Box
              bg="white"
              borderRadius="20px"
              boxShadow="5px 0 10px rgba(0,0,0,.3)"
              mt="50px"
              py={5}
              pr={10}
            >
              <Text mb={5} ml={10} color="gray.700">
                Clicks: <strong>{urlData.visitors.length}</strong>
              </Text>
              <LineChart
                width={570}
                height={300}
                data={processData(urlData.visitors)}
              >
                <Line
                  type="monotone"
                  dataKey="count"
                  stroke="#325a84"
                  strokeWidth="3px"
                />
                <CartesianGrid strokeDasharray="10 10" />
                <XAxis dataKey="date" padding={{ left: 10 }} />
                <YAxis
                  dataKey="count"
                  allowDecimals={false}
                  padding={{ bottom: 10 }}
                />
                <Tooltip />
              </LineChart>
            </Box>
            <Box
              bg="white"
              borderRadius="20px"
              boxShadow="5px 0 10px rgba(0,0,0,.3)"
              mt="50px"
              py={5}
              pr={10}
            >
              <Text mb={5} ml={10} color="gray.700">
                Unique users: <strong>{urlData.uniqueVisitors.length}</strong>
              </Text>
              <LineChart
                width={570}
                height={300}
                data={processData(urlData.uniqueVisitors)}
              >
                <Line
                  type="monotone"
                  dataKey="count"
                  stroke="#325a84"
                  strokeWidth="3px"
                />
                <CartesianGrid strokeDasharray="10 10" />
                <XAxis dataKey="date" padding={{ left: 10 }} />
                <YAxis
                  dataKey="count"
                  allowDecimals={false}
                  padding={{ bottom: 10 }}
                />
                <Tooltip />
              </LineChart>
            </Box>
          </Grid>
        </>
      )}
    </Box>
  );
}
