import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { handleQueryFilter } from "@utility/utility";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { useTheme } from "@mui/material/styles";
import Button from "@mui/material/Button";

const Timeline = ({
  query,
  queryFilter,
  onTimeChange,
  locked = false,
  lockedTime = 0,
  resetIndicatorCounter,
  currentView,
}) => {
  const theme = useTheme();
  const [currentSelectedTimeIndex, setCurrentSelectedTimeIndex] = useState(0);
  const [isPolling, setIsPolling] = useState(false);
  const [timePoints, setTimePoints] = useState([]);
  const [maxTime, setMaxTime] = useState(0);
  const [simulationIntervalId, setSimulationIntervalId] = useState(null);

  let variables = handleQueryFilter({})
  if (queryFilter) {
    variables = handleQueryFilter(queryFilter, {});
  }
  const { loading, error, data, startPolling, stopPolling } = useQuery(query, {
    variables,
    fetchPolicy: "no-cache",
  });

  useEffect(() => {
    if (locked) {
      setCurrentSelectedTimeIndex(lockedTime);
      onTimeChange(lockedTime);
    } else {
      console.log("Current Index: ", currentSelectedTimeIndex);
      onTimeChange(currentSelectedTimeIndex);
    }
  }, [currentSelectedTimeIndex, onTimeChange, locked, lockedTime]);

  useEffect(() => {
    if (isPolling && !locked) {
      startPolling(5000);
    } else {
      stopPolling();
    }
    return () => stopPolling();
  }, [isPolling, startPolling, stopPolling, locked]);

  useEffect(() => {
    if (data && data.GetAssistantData) {
      if (currentView === "predictedscore" || currentView === "outlierprediction") {
        const studentsArray = data.GetAssistantData;
        const newTimePoints = studentsArray.flatMap((student) =>
          student.data.map((time) => time.Time_Since_Start)
        );
        setTimePoints(newTimePoints);
        setMaxTime(Math.max(...newTimePoints));
        setCurrentSelectedTimeIndex(Math.min(...newTimePoints));
      } else {
        const studentsArray = data.GetAssistantGeneral;
        const newTimePoints = studentsArray.flatMap((student) =>
          student.data.map((time) => time.Time_Worked / 60)
        );
        setTimePoints(newTimePoints);
        setMaxTime(23213.4);
      }
    }
  }, [data]);

  const handleStart = () => {
    if (!locked) {
      setIsPolling(true);

      const uniqueSortedTimePoints = Array.from(new Set(timePoints)).sort(
        (a, b) => a - b
      );

      let simulationIndex = 0;
      const intervalId = setInterval(() => {
        simulationIndex += 1;
        if (simulationIndex >= uniqueSortedTimePoints.length) {
          clearInterval(intervalId);
          setIsPolling(false);
          return;
        }
        setCurrentSelectedTimeIndex(uniqueSortedTimePoints[simulationIndex]);
      }, 100); // Run the simulation every 100 milliseconds for 10x speed

      setSimulationIntervalId(intervalId);
      setIsPolling(true);
    }
  };

  const handleStop = () => {
    stopPolling();
    if (simulationIntervalId) {
      clearInterval(simulationIntervalId);
    }
    setIsPolling(false);
  };

  useEffect(() => {
    return () => {
      if (simulationIntervalId) {
        clearInterval(simulationIntervalId);
      }
    };
  }, [simulationIntervalId]);

  useEffect(() => {
    if (resetIndicatorCounter) {
      handleReset();
    }
  }, [resetIndicatorCounter]);

  const handleReset = () => {
    if (isPolling) {
      stopPolling();
      setIsPolling(false);
    }
    if (simulationIntervalId) {
      clearInterval(simulationIntervalId);
      setSimulationIntervalId(null);
    }
    setCurrentSelectedTimeIndex(0);
  };

  return (
    <>
      <div className="timeline-layout">
        <p>Time Since Start: {currentSelectedTimeIndex} min</p>
        <Box className="code-state-slider">
          <Slider
            defaultValue={0}
            aria-label="Timeline"
            valueLabelDisplay="auto"
            min={0}
            max={maxTime}
            step={null}
            value={locked ? lockedTime : currentSelectedTimeIndex}
            onChange={(e, value) => {
              if (!locked) {
                setCurrentSelectedTimeIndex(value);
                onTimeChange(value);
              }
            }}
            marks={timePoints.map((time) => ({ value: time }))}
            disabled={locked}
            sx={{
              color:
                theme.palette.mode === "dark"
                  ? theme.palette.secondary.main
                  : theme.palette.primary.main,
              "& .MuiSlider-rail": {
                color:
                  theme.palette.mode === "dark"
                    ? theme.palette.grey[700]
                    : theme.palette.grey[300],
              },
              "& .MuiSlider-track": {
                color:
                  theme.palette.mode === "dark"
                    ? theme.palette.secondary.main
                    : theme.palette.primary.main,
              },
              "& .MuiSlider-thumb": {
                backgroundColor:
                  theme.palette.mode === "dark"
                    ? "#ffffff"
                    : theme.palette.primary.main,
              },
            }}
          />
        </Box>
        <Button
          variant="contained"
          color="primary"
          onClick={handleStart}
          disabled={isPolling}
        >
          Start
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleStop}
          disabled={!isPolling}
        >
          Stop
        </Button>
        <Button variant="contained" color="secondary" onClick={handleReset}>
          Reset
        </Button>
      </div>
    </>
  );
};

export default Timeline;
