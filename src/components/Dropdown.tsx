import React, { ReactElement, useState, useRef } from "react"
import {Button, Box, Flex} from "@chakra-ui/react"
import useOutsideClick from '../utils/useOutsideClick';

export function Dropdown({ label, icon, children, ...rest }: { label?: string, icon?:any, children: any, [x:string]: any }): ReactElement | null {
  const [expanded, setExpanded] = useState<boolean>(false)

  const ref: any = useRef();

  useOutsideClick(ref, () => {
    setExpanded(false);
  })
  
  return (
    <Box {...rest} >
      <Button 
        borderRadius={5} 
        _hover={{}} 
        _active={{}} 
        _focus={{}}
        height="31px"
        onClick={() => setExpanded(!expanded)}
        borderWidth="1px"
        borderColor={expanded ? "gray.300" : "transparent"}
        bg={"none"}
        transitionDuration="0"
        px={2}
        fontSize={13}
        ref={ref}
      >
        {icon && icon}
        {label && label}
      </Button>
      {expanded && (
        <Flex 
          direction="column" 
          bg="#f7f7f7" 
          borderWidth="1px" 
          borderColor="gray.300" 
          px={3} 
          py="10px" 
          position="absolute" 
          right="0"
          marginTop="5px" 
          alignItems="flex-start" 
          borderRadius="5px" 
          boxShadow="0 5px 10px rgba(0,0,0,.2)"
          gridGap={4}
        >
          {children}
        </Flex>
      )}
    </Box>
  )
}
