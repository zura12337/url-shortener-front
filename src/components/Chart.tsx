import { Box, Text } from "@chakra-ui/react";
import React from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from "recharts";

export default function Chart({
  label,
  data,
  type = "line",
  objKey,
}: {
  label: string;
  data: any;
  type?: string;
  objKey: string;
}) {
  const colors = [
    "blue",
    "orange",
    "red",
    "cyan",
    "green",
    "gray",
    "purple",
    "yellow",
    "silver",
  ];

  const processData = (data: any[], key: string) => {
    const processedData: any[] = [];

    data.forEach((visitor: any) => {
      if (processedData.length === 0) {
        processedData.push({ [key]: visitor[key], count: 1 });
      } else {
        if (processedData.find((v) => v[key] === visitor[key])) {
          processedData.find((v: any, i: number) => {
            if (v[key] === visitor[key]) {
              processedData[i]["count"]++;
            }
          });
        } else {
          processedData.push({ [key]: visitor[key], count: 1 });
        }
      }
    });

    return processedData;
  };

  return (
    <Box
      bg="white"
      borderRadius="20px"
      boxShadow="5px 0 10px rgba(0,0,0,.3)"
      mt="30px"
      py={5}
      pr={10}
    >
      <Text mb={5} ml={10} color="gray.700">
        {label}
      </Text>
      {type === "line" ? (
        <LineChart width={570} height={300} data={processData(data, objKey)}>
          <Line
            type="monotone"
            dataKey="count"
            stroke="#325a84"
            strokeWidth="3px"
          />
          <CartesianGrid strokeDasharray="10 10" />
          <XAxis dataKey="date" padding={{ left: 10 }} />
          <YAxis
            dataKey="count"
            allowDecimals={false}
            padding={{ bottom: 10 }}
          />
          <Tooltip />
        </LineChart>
      ) : (
        <PieChart width={570} height={300}>
          <Pie
            data={processData(data, objKey)}
            dataKey="count"
            nameKey={objKey}
            cx="50%"
            cy="50%"
            outerRadius={130}
          >
            {processData(data, objKey).map((entry: any, index) => (
              <Cell key={`cell-${index}`} fill={colors[index]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      )}
    </Box>
  );
}
