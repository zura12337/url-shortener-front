import { Box } from "@chakra-ui/react";
import React from "react";
import { FadeLoader } from "react-spinners";

export default function Loading() {
  return (
    <Box zIndex={2}>
      <FadeLoader color="white" />
    </Box>
  );
}
