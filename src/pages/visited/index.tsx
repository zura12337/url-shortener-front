import { Box, Flex } from "@chakra-ui/react";
import React from "react";
import { getMyVisitedLinks } from "../../api";
import UrlsList from "../../components/UrlsList";

export default function VisitedUrlsPage() {
  const { links, isLoading } = getMyVisitedLinks();

  return (
    <Flex w="100%" minH="90vh" justifyContent="center" alignItems="center">
      <UrlsList urls={links} loading={isLoading} />
    </Flex>
  );
}
