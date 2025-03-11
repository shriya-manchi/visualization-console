import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import Box from "@mui/material/Box";
import SchoolIcon from "@mui/icons-material/School";
import WarningIcon from "@mui/icons-material/Warning";
import ModeStandbyIcon from "@mui/icons-material/ModeStandby";
import { handleQueryFilter } from "@utility/utility";

const Circle = ({
  query,
  queryFilter,
  selectedTime,
  onStudentSelect,
  currentView,
  updateTotalStudents,
  selectedTask,
}) => {
  const [studentStatus, setStudentStatus] = useState([]);
  const [selectedStudentId, setSelectedStudentId] = useState(null);

  let variable = handleQueryFilter({});
  if (queryFilter) {
    variable = handleQueryFilter(queryFilter, {});
  }
  const { loading, error, data, startPolling } = useQuery(query, {
    variables: variable,
    fetchPolicy: "no-cache",
  });

  useEffect(() => {
    startPolling(5000);
    return () => startPolling(0);
  }, [startPolling]);

  useEffect(() => {
    if (data) {
      if (currentView === "predictedscore" || currentView === "outlierprediction") {
        let updatedStatus = new Map();
        (data.GetAssistantData ?? []).forEach(({ id, data }) => {
          (data ?? []).forEach(
            ({ Time_Since_Start, Student_Id, Task, ...rest }) => {
              if (
                Time_Since_Start <= selectedTime &&
                (!selectedTask || Task === selectedTask)
              ) {
                // Check if Task matches selectedTask
                const existing = updatedStatus.get(Student_Id);
                if (!existing || existing.Time_Since_Start < Time_Since_Start) {
                  updatedStatus.set(Student_Id, {
                    Student_Id,
                    Time_Since_Start,
                    Task,
                    ...rest,
                  });
                }
              }
            }
          );
        });

        let sortedStatus = Array.from(updatedStatus.values()).sort((a, b) => {
          const nameA = a.Student_Id.replace(/\d+/g, ""),
            nameB = b.Student_Id.replace(/\d+/g, "");
          const numPartA = parseInt(a.Student_Id.replace(/^\D+/g, ""), 10),
            numPartB = parseInt(b.Student_Id.replace(/^\D+/g, ""), 10);
          if (nameA === nameB) return numPartA - numPartB;
          return nameA.localeCompare(nameB);
        });

        setStudentStatus(sortedStatus);
        updateTotalStudents(sortedStatus.length);
      } else {
        const studentsArray = data.GetAssistantGeneral ?? [];
        setStudentStatus(
          studentsArray.flatMap((student) => student.data ?? [])
        );
        updateTotalStudents(studentsArray.length);
      }
    }
  }, [data, selectedTime, currentView, selectedTask, updateTotalStudents]); // Include selectedTask in dependencies

  const getIconComponent = (status) => {
    switch (currentView) {
      case "general":
        if (status.Finish)
          return <SchoolIcon sx={{ height: "3vh", width: "3vh" }} />;
        if (status.Difficulty)
          return <WarningIcon sx={{ height: "3vh", width: "3vh" }} />;
        if (status.Idle)
          return <ModeStandbyIcon sx={{ height: "3vh", width: "3vh" }} />;
        break;
      case "outlierprediction":
        if (status.Finish)
          return <SchoolIcon sx={{ height: "3vh", width: "3vh" }} />;
        if (status.Outlier)
          return <WarningIcon sx={{ height: "3vh", width: "3vh" }} />;
        if (status.Idle)
          return <ModeStandbyIcon sx={{ height: "3vh", width: "3vh" }} />;
        break;
      case "predictedscore":
        if (status.Finish)
          return <SchoolIcon sx={{ height: "3vh", width: "3vh" }} />;
        if (status.Low_Predicted_Score)
          return <WarningIcon sx={{ height: "3vh", width: "3vh" }} />;
        if (status.Idle)
          return <ModeStandbyIcon sx={{ height: "3vh", width: "3vh" }} />;
        break;
      case "solutionType":
        return status.Solution_Type;
      default:
        return null;
    }
  };

  const clamp = (value, min, max) => Math.min(Math.max(value, min), max);
  const getColorGradient = (Predicted_Score, Time_Worked) => {
    let normalizedValue;
    const yellowR = 240,
      yellowG = 184,
      yellowB = 89;
    const blueR = 173,
      blueG = 216,
      blueB = 230;

    if (currentView === "predictedscore" || currentView === "outlierprediction") {
      normalizedValue = Math.min(Math.max(Predicted_Score, 0), 100) / 100;
    } else if (currentView === "solutionType") {
      return "rgb(173, 216, 230)";
    } else {
      normalizedValue = Math.min(Math.max(Time_Worked, 0), 100) / 100;
    }

    const interpolatedR = Math.round(
      yellowR + (blueR - yellowR) * normalizedValue
    );
    const interpolatedG = Math.round(
      yellowG + (blueG - yellowG) * normalizedValue
    );
    const interpolatedB = Math.round(
      yellowB + (blueB - yellowB) * normalizedValue
    );

    return `rgb(${interpolatedR}, ${interpolatedG}, ${interpolatedB})`;
  };

  const onClickStudent = (student) => {
    setSelectedStudentId(student.Student_Id);
    onStudentSelect({
      ...student,
      Student_Id: student.Student_Id,
      Time_Since_Start: student.Time_Since_Start,
      Current_Code: student.Current_Code,
      Code_Snapshot: student.Code_Snapshot,
      solution: student.solution,
      Previous_States: student.Previous_States,
      Name: student.Name,
      Time_Worked: student.Time_Worked,
      Outlier: student.Outlier
    });
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        gap: 0.5,
        paddingBottom: 10,
        width: "75%",
      }}
    >
      {studentStatus.map((status) => {
        const IconComponent = getIconComponent(status);
        const backgroundColor = getColorGradient(
          status.Predicted_Score,
          status.Time_Worked
        );
        const isSelected = status.Student_Id === selectedStudentId;

        return (
          <Box
            key={status.Student_Id}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "6vh",
              width: "6vh",
              borderRadius: "50%",
              backgroundColor,
              borderStyle: "dashed",
              borderWidth: "3px",
              borderColor: isSelected ? "black" : "transparent",
              color: "white",
              fontSize: "2vh",
              margin: "0.3vh",
            }}
            onClick={() => onClickStudent(status)}
          >
            {IconComponent}
          </Box>
        );
      })}
    </Box>
  );
};

export default Circle;
