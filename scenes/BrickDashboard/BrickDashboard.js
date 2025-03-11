import { Box, useTheme, Dialog, DialogTitle, DialogActions, DialogContent, Button } from "@mui/material";
import Header from "@components/Header";
import DataContext from "@context/DataContext";
import { useContext, useEffect, useState } from "react";
import { tokens } from "@styles/theme";
import GraphQLMenu from "@scenes/Global/GraphQLMenu";
import { GET_UNIQUE_VALUE_LIST_METRIC } from "@graphql/Queries/Queries";
import { GET_BRICK_DATA } from "@graphql/Queries/Queries";
import { GET_BRICK_TEST_DATA } from "@graphql/Queries/Queries";
import Bricks from "@scenes/BrickDashboard/Bricks";
import StudentsAttemptsTable from "@scenes/BrickDashboard/StudentsAttemptsTable";
import BrickLegend from "@scenes/BrickDashboard/BrickLegend";
import ProgressBar from "@scenes/BrickDashboard/ProgressBar";
import StudentsFilter from "@scenes/BrickDashboard/StudentsFilter";
import CodeState from "@scenes/BrickDashboard/CodeState/CodeState";

const ClassView = ({ colors, context }) => {
  const [filterState] = useState({
    Course_Id: context.Course_Id,
    Session_Id: context.Session_Id
  });

  const [selectedQuestion, setSelectedQuestion] = useState({
    Course_Id: context.Course_Id,
    Session_Id: context.Session_Id,
    Question_Id: "All",
  });

  const [status, setStatus] = useState(0);
  const [selectedStudent, setSelectedStudent] = useState(null);

  const handleStudentsFilterChange = (status) => {
    setStatus(status);
  };

  const handleCodeButtonClick = (student) => {
    setSelectedStudent(student);
  };

  return (
    <Box
      display="grid"
      gridTemplateColumns="repeat(12, 1fr)"
      gridAutoRows="auto"
      gap="10px"
    >
      {selectedQuestion.Question_Id === "All" || selectedQuestion.Timestamp === "All" ? (
        <Box gridColumn="span 12">
          <Box display="flex" borderRadius="3px">
            <GraphQLMenu
              query={GET_UNIQUE_VALUE_LIST_METRIC}
              queryFilter={filterState}
              minWidth={140}
              id="questionid"
              title="Question"
              fieldTitle="Question_Id"
              state={selectedQuestion}
              setState={setSelectedQuestion}
            />
          </Box>
          <h2>Select a Check to Run Bricks</h2>
        </Box>
      ) : (
        <Box gridColumn="span 12" bgcolor={colors.primary} justifyContent="center">
          <Box display="flex" flexDirection="column" borderRadius="3px" paddingBottom={2}>
            <GraphQLMenu
              query={GET_UNIQUE_VALUE_LIST_METRIC}
              queryFilter={filterState}
              minWidth={140}
              id="questionid"
              title="Question"
              fieldTitle="Question_Id"
              state={selectedQuestion}
              setState={setSelectedQuestion}
            />
            <StudentsFilter studentsFilter={handleStudentsFilterChange} />
          </Box>
          <Bricks
            query={GET_BRICK_DATA}
            queryFilter={selectedQuestion}
            statusFilter={status}
          />
          <BrickLegend />
          <ProgressBar query={GET_BRICK_DATA} queryFilter={selectedQuestion} />

          <Box display="flex" flexDirection="column" gap="10px">
            <Box width="100%" gridRow="span 2">
              <StudentsAttemptsTable
                query={GET_BRICK_DATA}
                queryFilter={selectedQuestion}
                onCodeButtonClick={handleCodeButtonClick}
              />
            </Box>
          </Box>
        </Box>
      )}
      {selectedStudent && (
        <Dialog open={Boolean(selectedStudent)} onClose={() => setSelectedStudent(null)} maxWidth="lg" fullWidth>
          <DialogTitle>Student Code</DialogTitle>
          <DialogContent>
            <CodeState
              query={GET_BRICK_TEST_DATA}
              queryFilter={selectedQuestion}
              currentSelectedStudent={selectedStudent}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setSelectedStudent(null)} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </Box>
  );
};

const BrickDashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { context } = useContext(DataContext);

  return (
    <Box m="10px">
      <div className="prediction-dashboard-layout">
        <Header
          title="Bricks"
          subtitle="Class Overview of Progress on a Single Question"
        />
        {context.Course_Id === "All" || context.Session_Id === "All" ? (
          <h2>Select a Course and Exercise</h2>
        ) : (
          <ClassView colors={colors} context={context} />
        )}
      </div>
    </Box>
  );
};

export default BrickDashboard;
