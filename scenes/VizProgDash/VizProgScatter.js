import React, { useEffect } from "react";
import { ResponsiveScatterPlot } from "@nivo/scatterplot";
import { useQuery } from "@apollo/client";
import { GET_METRIC_DATA, GET_VIZ_PROG_DATA } from "@graphql/Queries/Queries";
import { useTheme } from "@mui/material/styles";
import { useState } from "react";
import VizProgCode from "./VizProgCode";
import { handleQueryFilter } from "@utility/utility";
import VizProgSearch from "./VizProgSearch";

const VizProgScatter = ({ queryFilter }) => {
  const theme = useTheme();
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [codeBlockIndex, setCodeBlockIndex] = useState(0);
  const variables = handleQueryFilter(queryFilter);
  const { loading, error, data, startPolling } = useQuery(GET_METRIC_DATA, {
    variables: variables,
    fetchPolicy: "no-cache",
  });

  useEffect(() => {
    startPolling(5000);
    return () => startPolling(0);
  }, [startPolling]);

  const nivoData = data
    ? data.GetMetricData.map((item) => ({
        id: item.id,
        data: item.data.map((d) => ({
          x: d.x,
          y: d.y,
          Student_Id: d.Student_Id,
          Code: d.Code,
        })),
      }))
    : [];

  const handleDotClick = (dot) => {
    setSelectedStudents((prev) => {
      const exists = prev.find((d) => d.id === dot.id);
      if (exists) {
        return prev.filter((d) => d.id !== dot.id); // Toggle off
      } else {
        return [...prev, dot]; // Toggle on
      }
    });
  };

  const textColor = theme.palette.mode === "dark" ? "white" : "black";
  const tooltipBackgroundColor =
    theme.palette.mode === "dark"
      ? "rgba(0, 0, 0, 0.6)"
      : "rgba(255, 255, 255, 0.8)";

  const nivoTheme = {
    axis: {
      ticks: {
        text: {
          fill: textColor,
        },
      },
    },
    tooltip: {
      container: {
        background: tooltipBackgroundColor,
        color: textColor,
        fontSize: "14px",
      },
    },

    legends: {
      text: {
        fill: textColor,
      },
    },
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        height: "100%",
        width: "100%",
      }}
    >
      <div style={{ flex: 2, width: "100%" }}>
        {nivoData !== null && (
          <ResponsiveScatterPlot
            data={nivoData}
            theme={nivoTheme}
            onClick={handleDotClick}
            margin={{ top: 20, right: 50, bottom: 70, left: 50 }}
            xScale={{ type: "linear", min: "auto", max: "auto" }}
            yScale={{ type: "linear", min: "auto", max: "auto" }}
            axisTop={null}
            axisRight={null}
            axisBottom={{
              orient: "bottom",
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legendPosition: "middle",
              legendOffset: 46,
            }}
            axisLeft={{
              orient: "left",
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legendPosition: "middle",
              legendOffset: -60,
            }}
            legends={[
              {
                anchor: "bottom",
                direction: "row",
                justify: false,
                translateX: 0,
                translateY: 60,
                itemsSpacing: 0,
                itemDirection: "left-to-right",
                itemWidth: 100,
                itemHeight: 20,
                symbolSize: 12,
                symbolShape: "circle",
                effects: [
                  {
                    on: "hover",
                    style: {
                      itemOpacity: 1,
                    },
                  },
                ],
              },
            ]}
          />
        )}
      </div>
      <div
        style={{
          flex: 1,
          minHeight: "100%",
          overflowY: "auto",
          width: "100%",
          marginRight: "10px",
        }}
      >
        <VizProgSearch queryFilter={queryFilter} />
      </div>
      <div
        style={{
          flex: 1,
          minHeight: "100%",
          overflowY: "auto",
          width: "100%",
          marginRight: "20px",
        }}
      >
        <VizProgCode
          selectedStudents={selectedStudents}
          codeBlockIndex={codeBlockIndex}
          setCodeBlockIndex={setCodeBlockIndex}
        />
      </div>
    </div>
  );
};
export default VizProgScatter;
