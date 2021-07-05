import React, { ReactElement, useEffect } from "react"
import {getUrlById} from "../../api";
import {useHistory} from "react-router-dom";

export function RedirectPage({ match }: { match: any }): ReactElement | null {
  const id = match.params.id; 
  const history = useHistory();

  useEffect(() => {
    getLink()
  }, [])

  const getLink = async () => {
    const response = await getUrlById(id);
    if(response) {
      window.location.href = response.data;
    } else {
      history.push("/404");
    }
  }

  return (
    <></>
  )
}
