
import React, { ReactElement } from "react"
import {Grid} from "@chakra-ui/react"
import Skeleton from "react-loading-skeleton"

export function UrlLoading(): ReactElement | null {
  return (
    <Grid gridTemplateColumns="7fr 6fr 1fr 1.5fr" gridGap="10px" my={4}>
      <Skeleton width="75%" height="30px" />
      <Skeleton width="90%" height="30px" />
      <Skeleton width="90%" height="30px" />
      <Skeleton height="30px" />
    </Grid>
  )
}
