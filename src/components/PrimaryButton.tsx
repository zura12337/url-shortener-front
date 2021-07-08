import { Button } from "@chakra-ui/react";
import React from "react";
import { ClipLoader } from 'react-spinners'

export default function PrimaryButton({
  label,
  onClick,
  loading,
  ...rest
}: {
  label: string;
  onClick: Function;
  loading?: boolean,
  [x: string]: any;
}) {
  return (
    <Button
      bg="#28384A"
      color="white"
      fontWeight="light"
      px={[5, 10]}
      py={["10px","25px"]}
      _hover={{ bg: "#1c2938" }}
      _focus={{}}
      _active={{}}
      zIndex={1}
      onClick={() => onClick()}
      display="flex"
      gridGap={[2, 3]}
      disabled={loading}
      {...rest}
    >
      {loading && <ClipLoader size={18} color="white"/>}
      {label}
    </Button>
  );
}
