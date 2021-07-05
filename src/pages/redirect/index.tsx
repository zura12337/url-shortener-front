import React, { ReactElement, useEffect } from "react";
import { getUrlById } from "../../api";
import { useHistory } from "react-router-dom";

export function RedirectPage({ match }: { match: any }): ReactElement | null {
  const id = match.params.id;
  const history = useHistory();
  const { data: link, error } = getUrlById(id);

  useEffect(() => {
    if (link) {
      window.location.href = link;
    } else if (error) {
      history.push("/404");
    }
  }, [link]);

  return <></>;
}
