import React, { ReactElement, useEffect, useState } from "react";
import { getUrlById } from "../../api";
import { useHistory } from "react-router-dom";
import { Text } from "@chakra-ui/react";

export function RedirectPage({ match }: { match: any }): ReactElement | null {
  const id = match.params.id;
  const [link, setLink] = useState<string>();
  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    fetchUrl();
  }, []);

  useEffect(() => {
    if (link) {
      window.location.href = link;
    }
  }, [link]);

  const fetchUrl = async () => {
    setLoading(true)
    const response = await getUrlById(id);
    if (response.status === 200) {
      setLink(response.data);
    } else {
      setError(response.data);
    }
    setLoading(false)
  };

  return (
    <>
      <Text color="white" textAlign="center" mt="20%" fontSize={38}>
        {loading && "Redirecting..."}
        {error && error}
      </Text>
    </>
  );
}
