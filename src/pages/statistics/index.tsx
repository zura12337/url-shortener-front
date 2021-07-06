import { Link, Box, Text, Flex, Grid, Divider, Image, Button, useToast } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { getUrlData, editUrl, getUserRole } from "../../api";
import { UrlMetadataType, UrlType } from "../../types";
import { useHistory } from "react-router-dom";
import SecondaryButton from "../../components/SecondaryButton";
import Loading from "../../components/Loading";
import Chart from "../../components/Chart";
import ImagePlaceholder from '../../assets/image_placeholder.jpg';
import {Dropdown} from "../../components/Dropdown";
import { FiMoreHorizontal } from 'react-icons/fi';

export default function StatisticsPage({ match }: { match: any }) {
  const id = match.params.id;
  const history = useHistory();
  const { data, isLoading: loading } = getUrlData(id);
  const [urlData, setUrlData] = useState<UrlType>();
  const [urlMetadata, setUrlMetadata] = useState<UrlMetadataType>();
  const [expanded, setExpanded] = useState<boolean>(false);
  const toast = useToast();
  const { role } = getUserRole(id);

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
      {urlData && urlData.status !== "remove" ? (
        <>
          <Text color="white" fontSize={30} mb={5} float="right">
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
              src={urlMetadata?.image || ImagePlaceholder}
              alt={urlMetadata?.title}
              borderRadius="10px"
              h="max-content"
              maxH="100%"
              objectFit="cover"
              w="140px"
            />
            <Box>
              <Text mb={2}>{urlMetadata?.title}</Text>
              <Text color="gray.500">{urlData.originalUrl}</Text>
              <Divider my={3} />
              <Link color="blue.600" href={urlData.shortUrl} _focus={{}}>
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
                right={role === "admin" ? "60px" : "10px"}
                borderRadius={5}
                fontSize={14}
                height="31px"
              >
                {urlData.date}
              </Box>
              {role === "admin" && (
                <Dropdown icon={<FiMoreHorizontal size={25}/>} position="absolute" top="10px" right="10px">
                    {urlData.status === "active" ? (
                      <Button _hover={{}} _active={{}} bg="none" w="max-content" h="max-content" _focus={{}} p={0} fontSize={12} onClick={async () => {
                          const response: any = await editUrl({ id, action: "pause" })
                          if(response?.status === 200) {
                            toast({
                              title: "Link has been disabled",
                              isClosable: true,
                            })
                          } else if (response) {
                            toast({
                              title: response.data,
                              status: "error",
                              isClosable: true
                            })
                          }
                        }}
                      >
                        Disable Link
                      </Button> 
                    ) : (
                      <Button _hover={{}} _active={{}} bg="none" w="max-content" h="max-content" _focus={{}} p={0} fontSize={12} onClick={async () => {
                          const response: any = await editUrl({ id, action: "unpause" })
                          if(response?.status === 200) {
                            toast({
                              title: "Link has been enabled",
                              isClosable: true,
                            })
                          } else if (response) {
                          toast({
                            title: response?.data,
                            status: "error",
                            isClosable: true
                          })
                        }
                        }}
                      >
                        Enable Link
                      </Button> 
                    )}
                    <Button _hover={{}} _active={{}} bg="none" _focus={{}} p={0} fontSize={12}  h="max-content" w="max-content" onClick={async () => {
                        const response: any = await editUrl({ id, action: "remove" });
                        if(response?.status === 200) {
                          toast({
                            title: "Link has been removed",
                            isClosable: true,
                          })
                          history.push("/")
                        } else if (response) {
                          toast({
                            title: response?.data,
                            status: "error",
                            isClosable: true
                          })
                        }
                      }}
                    >
                      Remove Link
                    </Button> 
                </Dropdown>
              )}
            </Box>
          </Flex>
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
          ) : urlData.visitors.length === 0 ? (
            <Text textAlign="center" mt={50} fontSize={32} color="white">
              No one visited this link yet
            </Text>
          ) : (
            <Flex justifyContent="center" alignItems="center" direction="column" gridGap={5} bg="white" borderRadius={9} mt="15px" py={10}>
              <Text textAlign="center" fontSize={32}>
                This URL is disabled
              </Text>
              <SecondaryButton bg="white" label="Enable" onClick={async () => {
                const response = await editUrl({ id, action: "unpause" })
                if(response.statusText === "OK") {
                  toast({
                    title: "Link has been enabled",
                    isClosable: true,
                  })
                } 
              }}/>
            </Flex>
          )}
        </>
      ) : urlData && urlData.status === "remove" ? (
        <Text fontSize={32} textAlign="center" color="white" fontWeight="bold" mt="10%">This link has been removed by owner</Text>
      ) : (<></>)}
    </Box>
  );
}
