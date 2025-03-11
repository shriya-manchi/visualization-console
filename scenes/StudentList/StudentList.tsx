import { Box, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "@styles/theme";
import { useQuery } from "@apollo/client";
import Header from "@components/Header";
import { GET_STUDENT_LIST } from "@graphql/Queries";
import { useContext } from "react";
import DataContext from "@context/DataContext";
import { handleQueryFilter } from "@utility/utility";

const columns = {
  All: [
    {
      field: "Student_Id",
      headerName: "Student ID",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "Course_Id",
      headerName: "Course",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "Session_Id",
      headerName: "Exercise",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "Milestones_Hit",
      headerName: "Milestones Hit",
      cellClassName: "name-column--cell",
      type: "number",
    },
    {
      field: "Last_Milestone",
      headerName: "Last Milestone",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "Last_Milestone_Timestamp",
      headerName: "Last Milestone Timestamp",
      flex: 1,
      cellClassName: "name-column--cell",
      type: "dateTime",
      valueGetter: ({ value }: any) => value && new Date(value),
    },
    {
      field: "Total_Events",
      headerName: "Events",
      cellClassName: "name-column--cell",
      type: "number",
    },
    {
      field: "Last_Event_Timestamp",
      headerName: "Last Event Timestamp",
      flex: 1,
      cellClassName: "name-column--cell",
      type: "dateTime",
      valueGetter: ({ value }: any) => value && new Date(value),
    },
  ],
  Course_Id: [
    {
      field: "Student_Id",
      headerName: "Student ID",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "Session_Id",
      headerName: "Exercise",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "Milestones_Hit",
      headerName: "Milestones Hit",
      cellClassName: "name-column--cell",
      type: "number",
    },
    {
      field: "Last_Milestone",
      headerName: "Last Milestone",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "Last_Milestone_Timestamp",
      headerName: "Last Milestone Timestamp",
      flex: 1,
      cellClassName: "name-column--cell",
      type: "dateTime",
      valueGetter: ({ value }: any) => value && new Date(value),
    },
    {
      field: "Total_Events",
      headerName: "Events",
      cellClassName: "name-column--cell",
      type: "number",
    },
    {
      field: "Time_Spent",
      headerName: "Time Spent (Minutes)",
      flex: 1,
      cellClassName: "name-column--cell",
      type: "number",
    },
    {
      field: "First_Event_Timestamp",
      headerName: "First Event Timestamp",
      flex: 1,
      cellClassName: "name-column--cell",
      type: "dateTime",
      valueGetter: ({ value }: any) => value && new Date(value),
    },
  ],
  Session_Id: [
    {
      field: "Student_Id",
      headerName: "Student ID",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "Course_Id",
      headerName: "Course",
      flex: 1,
      cellClassName: "name-column--cell",
    },

    {
      field: "Milestones_Hit",
      headerName: "Milestones Hit",
      cellClassName: "name-column--cell",
      type: "number",
    },
    {
      field: "Last_Milestone",
      headerName: "Last Milestone",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "Last_Milestone_Timestamp",
      headerName: "Last Milestone Timestamp",
      flex: 1,
      cellClassName: "name-column--cell",
      type: "dateTime",
      valueGetter: ({ value }: any) => value && new Date(value),
    },
    {
      field: "Total_Events",
      headerName: "Events",
      cellClassName: "name-column--cell",
      type: "number",
    },
    {
      field: "Time_Spent",
      headerName: "Time Spent (Minutes)",
      flex: 1,
      cellClassName: "name-column--cell",
      type: "number",
    },
    {
      field: "First_Event_Timestamp",
      headerName: "First Event Timestamp",
      flex: 1,
      cellClassName: "name-column--cell",
      type: "dateTime",
      valueGetter: ({ value }: any) => value && new Date(value),
    },
  ],
  Both: [
    {
      field: "Student_Id",
      headerName: "Student ID",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "Milestones_Hit",
      headerName: "Milestones Hit",
      cellClassName: "name-column--cell",
      type: "number",
    },
    {
      field: "Last_Milestone",
      headerName: "Last Milestone",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "Last_Milestone_Timestamp",
      headerName: "Last Milestone Timestamp",
      flex: 1,
      cellClassName: "name-column--cell",
      type: "dateTime",
      valueGetter: ({ value }: any) => value && new Date(value),
    },
    {
      field: "Total_Events",
      headerName: "Events",
      cellClassName: "name-column--cell",
      type: "number",
    },
    {
      field: "Time_Spent",
      headerName: "Time Spent (Minutes)",
      flex: 1,
      cellClassName: "name-column--cell",
      type: "number",
    },
    {
      field: "First_Event_Timestamp",
      headerName: "First Event Timestamp",
      flex: 1,
      cellClassName: "name-column--cell",
      type: "dateTime",
      valueGetter: ({ value }: any) => value && new Date(value),
    },
    {
      field: "Last_Event_Timestamp",
      headerName: "Last Event Timestamp",
      flex: 1,
      cellClassName: "name-column--cell",
      type: "dateTime",
      valueGetter: ({ value }: any) => value && new Date(value),
    },
  ],
};

const placeholder = [
  {
    id: 0,
    Student_Id: "Loading",
    Student_Name: "Loading",
    Course_Id: "Loading",
    Session_Id: "Loading",
    Milestonse_Hit: 0,
    Last_Milestone: "",
    Last_Milestone_Timestamp: "",
    Total_Events: 0,
    First_Event_Timestamp: "",
    Last_Event_Timestamp: "",
  },
];

const StudentTable = () => {
  const { context } = useContext(DataContext);
  const variable = handleQueryFilter(context, {});

  const { loading, error, data, startPolling } = useQuery(GET_STUDENT_LIST, {
    fetchPolicy: "no-cache",
    variables: variable,
  });

  if (loading || error)
    return <DataGrid rows={placeholder} columns={columns.All} />;

  let columnSchema =
    variable.Course_Id && variable.Session_Id
      ? columns.Both
      : variable.Course_Id
      ? columns.Course_Id
      : variable.Session_Id
      ? columns.Session_Id
      : columns.All;
  startPolling(5000);
  return <DataGrid rows={data.GetStudentSummary} columns={columnSchema} />;
};

const StudentList = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box m="20px">
      <Header
        title="Student List"
        subtitle="Event Data for All Filtered Students"
      />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >
        <StudentTable />
      </Box>
    </Box>
  );
};

export default StudentList;
