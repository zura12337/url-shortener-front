import { Box, Text, Flex } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { getUrlData } from "../../api";
import { UrlType } from "../../types";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from 'recharts';
import {Link, useHistory} from "react-router-dom";
import SecondaryButton from "../../components/SecondaryButton";
import PrimaryButton from "../../components/PrimaryButton";

export default function StatisticsPage({ match }: { match: any }) {
  const id = match.params.id;
  const [urlData, setUrlData] = useState<UrlType>();
  const history = useHistory();

  useEffect(() => {
    fetchUrl();
  }, []);

  const fetchUrl = async () => {
    const response = await getUrlData(id);
    if (response.status === 200) {
      setUrlData(response.data);
      processData(response.data.visitors);
    }
  };

  const processData = (data: any[]) => {
    const processedData: any[] = [];

    data.forEach((visitor: any) => {
      if(processedData.length === 0) {
        processedData.push({ date: visitor.date, count: 1 });
      } else {
        if(processedData.find(v => v.date === visitor.date)) {
         processedData.find((v: any, i: number) => {
            if(v.date === visitor.date) {
              processedData[i]["count"]++;
            } 
          }) 
        } else {
          processedData.push({ date: visitor.date, count: 1 });
        }
      }
    })

    return processedData;
  }

  return (
    <Box mx="10%">
      <SecondaryButton label="Go Back" onClick={() => history.push("/")} position="absolute" top="10px" left="10px" bg="white" px={10} py={5} _focus={{}} _hover={{}}/>
      {urlData && (
        <>
          <Text textAlign="center" pt="50px" fontSize={20} fontWeight="bold" color="white" m="auto">Displaying statistics for url<br /><a target="_blank" href={urlData.shortUrl}>{urlData.shortUrl}</a></Text> 
          <Flex gridGap={10}>
            <Box bg="white" borderRadius="20px" boxShadow="5px 0 10px rgba(0,0,0,.3)" w="max-content" mt="100px" py={5} pr={10}>
              <Text mb={5} ml={10} color="gray.700">Clicks | last 30 days: <strong>{urlData.visitors.length}</strong></Text>
              <LineChart width={550} height={300} data={processData(urlData.visitors)}>
                <Line type="monotone" dataKey="count" stroke="#325a84" strokeWidth="3px"/>
                <CartesianGrid strokeDasharray="10 10" />
                <XAxis dataKey="date"  padding={{ left: 10 }}/>
                <YAxis dataKey="count" allowDecimals={false}  padding={{ bottom: 10 }} />
                <Tooltip />
               </LineChart>
            </Box>
            <Box bg="white" borderRadius="20px" boxShadow="5px 0 10px rgba(0,0,0,.3)" w="max-content" mt="100px" py={5} pr={10}>
              <Text mb={5} ml={10} color="gray.700">Unique users | last 30 days: <strong>{urlData.uniqueVisitors.length}</strong></Text>
              <LineChart width={550} height={300} data={processData(urlData.uniqueVisitors)}>
                <Line type="monotone" dataKey="count" stroke="#325a84" strokeWidth="3px"/>
                <CartesianGrid strokeDasharray="10 10" />
                <XAxis dataKey="date"  padding={{ left: 10 }}/>
                <YAxis dataKey="count" allowDecimals={false}  padding={{ bottom: 10 }} />
                <Tooltip />
               </LineChart>
            </Box>
          </Flex>
        </>
      )}
    </Box>);
}
