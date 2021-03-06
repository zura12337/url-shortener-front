import { Box, Text } from "@chakra-ui/react";
import React, { useRef, useState, useEffect, useLayoutEffect } from "react";
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
import { colors } from "../utils/colors";

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
  const [chartDimensions, setChartDimensions] = useState<{ x: number, y: number }>({ x: 0, y: 0});

  const ref: any = useRef(null);

  const updateDimensions = () => {
    if (ref?.current) setChartDimensions({ x: ref?.current?.offsetWidth - 50, y: ref?.current?.offsetHeight });
  };

  useEffect(() => {
    window.addEventListener("resize", updateDimensions);
    if (ref.current) {
      setChartDimensions({ x: ref?.current?.offsetWidth - 50, y: ref?.current?.offsetHeight - 20 });
    }
    return () => {
      window.removeEventListener("resize", updateDimensions);
    };
  }, []);

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

    processedData.sort(function(a: any, b: any) {
      return new Date(a.date) - new Date(b.date);
    })

    return processedData;
  };

  return (
    <Box
      bg="white"
      borderRadius="20px"
      boxShadow="5px 0 10px rgba(0,0,0,.3)"
      my="15px"
      py="10px"
      pr="50px"
      ref={ref}
    >
      <Text mb={5} ml={10} color="gray.700">
        {label}
      </Text>
      {type === "line" ? (
        <LineChart
          width={chartDimensions.x}
          height={window.innerWidth < 720 ? chartDimensions.x : chartDimensions.x - 250}
          data={processData(data, objKey)}
        >
          <Line
            type="linear"
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
        <PieChart
          margin={{ left: 50 }}
          width={chartDimensions.x}
          height={chartDimensions.x}
        >
          <Pie
            data={processData(data, objKey)}
            dataKey="count"
            nameKey={objKey}
            cx="50%"
            cy="50%"
            outerRadius={chartDimensions.x / 3}
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
