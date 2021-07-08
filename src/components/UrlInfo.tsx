import React, { ReactElement } from "react"
import {Flex, Box, Image, Text, Divider, Link, Button, useToast} from "@chakra-ui/react";
import {Dropdown} from "./Dropdown";
import {FiMoreHorizontal} from "react-icons/fi";
import {editUrl, getUserRole} from "../api";
import {useHistory} from "react-router-dom";
import {UrlMetadataType, UrlType} from "../types";
import ImagePlaceholder from "../assets/image_placeholder.jpg";

export function UrlInfo({ urlMetadata, urlData }: { urlMetadata?: UrlMetadataType, urlData: UrlType }): ReactElement | null {
  const toast = useToast();
  const history = useHistory();
  const { role } = getUserRole(urlData.id);

  return (
          <Flex
            direction={["column", "row"]}
            bg="white"
            px={5}
            py={4}
            overflow="hidden"
            h="max-content"
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
              w={["80%","140px"]}
              marginTop={[50, 0, 0]}
            />
            <Box w="80%" pb={[5, 0]}>
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
                <Dropdown
                  icon={<FiMoreHorizontal size={25} />}
                  position="absolute"
                  top="10px"
                  right="10px"
                >
                  {urlData.status === "active" ? (
                    <Button
                      _hover={{}}
                      _active={{}}
                      bg="none"
                      w="max-content"
                      h="max-content"
                      _focus={{}}
                      p={0}
                      fontSize={12}
                      onClick={async () => {
                        const response: any = await editUrl({
                          id: urlData.id,
                          action: "pause",
                        });
                        if (response?.status === 200) {
                          toast({
                            title: "Link has been disabled",
                            isClosable: true,
                          });
                        } else if (response) {
                          toast({
                            title: response.data,
                            status: "error",
                            isClosable: true,
                          });
                        }
                      }}
                    >
                      Disable Link
                    </Button>
                  ) : (
                    <Button
                      _hover={{}}
                      _active={{}}
                      bg="none"
                      w="max-content"
                      h="max-content"
                      _focus={{}}
                      p={0}
                      fontSize={12}
                      onClick={async () => {
                        const response: any = await editUrl({
                          id: urlData.id,
                          action: "unpause",
                        });
                        if (response?.status === 200) {
                          toast({
                            title: "Link has been enabled",
                            isClosable: true,
                          });
                        } else if (response) {
                          toast({
                            title: response?.data,
                            status: "error",
                            isClosable: true,
                          });
                        }
                      }}
                    >
                      Enable Link
                    </Button>
                  )}
                  <Button
                    _hover={{}}
                    _active={{}}
                    bg="none"
                    _focus={{}}
                    p={0}
                    fontSize={12}
                    h="max-content"
                    w="max-content"
                    onClick={async () => {
                      const response: any = await editUrl({
                        id: urlData.id,
                        action: "remove",
                      });
                      if (response?.status === 200) {
                        toast({
                          title: "Link has been removed",
                          isClosable: true,
                        });
                        history.push("/");
                      } else if (response) {
                        toast({
                          title: response?.data,
                          status: "error",
                          isClosable: true,
                        });
                      }
                    }}
                  >
                    Remove Link
                  </Button>
                </Dropdown>
              )}
            </Box>
          </Flex>
)
}
