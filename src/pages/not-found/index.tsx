import React, { ReactElement } from "react"
import { Box, Flex, Text } from '@chakra-ui/react';
import SecondaryButton from "../../components/SecondaryButton";
import {useHistory} from "react-router-dom";

export function NotFoundPage(): ReactElement | null {
  const history = useHistory();

  return (
    <Flex direction="column" w="100%" h="80vh" alignItems="center" justifyContent="center" gridGap={4}>
      <Text fontSize={48} color="white">
        Page Not Found!
      </Text>
      <SecondaryButton bg="white" label="Go back" onClick={() => history.push("/")} px={10} py={5}/>
    </Flex>
  )
}
