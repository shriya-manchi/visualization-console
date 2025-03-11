import {
  Box,
  useTheme,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  Button,
} from "@mui/material";
import Header from "@components/Header";
import DataContext from "@context/DataContext";
import { useContext, useEffect, useState } from "react";
import { tokens } from "@styles/theme";
import { MenuItem, Select, FormControl, InputLabel } from "@mui/material";
import CodeState from "./CodeState";
import { GET_ASSISTANT_DATA } from "@graphql/Queries/Queries";
import { GET_GENERAL_DATA } from "@graphql/Queries/Queries";
import ClassSummary from "./ClassSummary";
import Timeline from "./Timeline";
import Circle from "./Circle";
import Legend from "./Legend";
import { Typography } from "@mui/material";

const AssistantDashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { context } = useContext(DataContext);
  
  //TODO: Add query filter for session id
  const [queryFilter, setQueryFilter] = useState({
  });

  const [totalStudents, setTotalStudents] = useState(0);
  const [query, setQuery] = useState(GET_ASSISTANT_DATA);
  const [showSolutionTypeLegend, toggleSolutionTypeLegend] = useState(false);
  const [showOutlierTypeLegend, toggleOutlierTypeLegend] = useState(false);
  const [showPredictedScoreLegend, togglePredictedScoreLegend] =
    useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [view, setView] = useState("outlierprediction");
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [resetTimelineCounter, setResetTimelineCounter] = useState(0);
  const [selectedTask, setSelectedTask] = useState(null);

  const handleTimeChange = (time) => {
    setCurrentTime(time);
  };

  const handleStudentSelect = (student) => {
    setSelectedStudent(student);
  };

  const updateTotalStudents = (newTotal) => {
    setTotalStudents(newTotal);
  };

  const handleTaskSelect = (task) => {
    if (view === "predictedscore") {
      setSelectedTask(task);
    }
  };

  const handleViewTypeChange = (event) => {
    const newViewType = event.target.value;
    setView(newViewType);
    switch (newViewType) {
      case "general":
        toggleSolutionTypeLegend(false);
        toggleOutlierTypeLegend(true);
        togglePredictedScoreLegend(false);
        setQuery(GET_GENERAL_DATA);
      case "outlierprediction":
        toggleSolutionTypeLegend(false);
        toggleOutlierTypeLegend(true);
        togglePredictedScoreLegend(false);
        setResetTimelineCounter((prevCounter) => prevCounter + 1);
        setQuery(GET_ASSISTANT_DATA);
        break;
      case "solutionType":
        toggleSolutionTypeLegend(true);
        toggleOutlierTypeLegend(false);
        togglePredictedScoreLegend(false);
        setQuery(GET_GENERAL_DATA);
        break;
      case "predictedscore":
        toggleSolutionTypeLegend(false);
        toggleOutlierTypeLegend(false);
        togglePredictedScoreLegend(true);
        setResetTimelineCounter((prevCounter) => prevCounter + 1);
        setQuery(GET_ASSISTANT_DATA);
        break;
    }
  };

  const isTimelineLocked = view === "general" || view === "solutionType";
  const lockedTime = view === "general";
  1244035.0 / 60;

  console.log("selected student:", selectedStudent);
  console.log("selected task:", selectedTask);

  const topLayoutStyle = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  };

  return (
    <div className="dashboard-container">
      <Box>
        <div className="prediction-dashboard-layout">
          <div style={topLayoutStyle}>
            <div className="timeline-class-summary-container">
              <Header
                title="Assistant Dashboard"
                subtitle="Score Prediction-based Progress and Difficulty"
              />
              <h2>Timeline</h2>
              <Timeline
                query={query}
                queryFilter={queryFilter}
                onTimeChange={handleTimeChange}
                locked={isTimelineLocked}
                lockedTime={lockedTime}
                resetIndicatorCounter={resetTimelineCounter}
                currentView={view}
              />
              <h2>Class Summary</h2>
              <ClassSummary
                query={query}
                queryFilter={queryFilter}
                selectedTime={currentTime}
                currentView={view}
                onTaskSelect={handleTaskSelect}
              />
            </div>
            <div className="code-state-section">
              <Legend
                showSolutionTypeLegend={showSolutionTypeLegend}
                showOutlierTypeLegend={showOutlierTypeLegend}
                showPredictedScoreLegend={showPredictedScoreLegend}
              />
            </div>
          </div>
          <h2>Classroom {`(n=${totalStudents})`}</h2>
          <div className="classroom-section">
            <div className="view-type-selector">
              <FormControl
                variant="outlined"
                sx={{ m: 1, minWidth: 150 }}
                className="form-control"
              >
                <InputLabel id="view-type-label">View Type</InputLabel>
                <Select
                  labelId="view-type-label"
                  id="view-type-select"
                  value={view}
                  onChange={handleViewTypeChange}
                  label="View Type"
                >
                  {/* <MenuItem value="general">General</MenuItem> */}
                  <MenuItem value="outlierprediction">
                    Outlier Prediction
                  </MenuItem>
                  {/* <MenuItem value="solutionType">Solution Type</MenuItem> */}
                  <MenuItem value="predictedscore">Predicted Score</MenuItem>
                </Select>
              </FormControl>
              <div className="circle-row" style={{ flex: 1 }}>
                {(selectedTask && view === "predictedscore") ||
                  (view === "outlierprediction" && (
                    <Circle
                      query={query}
                      queryFilter={queryFilter}
                      selectedTime={currentTime}
                      onStudentSelect={handleStudentSelect}
                      currentView={view}
                      updateTotalStudents={updateTotalStudents}
                      selectedTask={selectedTask}
                    />
                  ))}
                {view !== "predictedscore" ||
                  (view != "outlierprediction" && (
                    <Circle
                      query={query}
                      queryFilter={queryFilter}
                      selectedTime={currentTime}
                      onStudentSelect={handleStudentSelect}
                      currentView={view}
                      updateTotalStudents={updateTotalStudents}
                    />
                  ))}
              </div>
            </div>
          </div>
          {}
        </div>
        {selectedStudent && (
          <Dialog
            open={Boolean(selectedStudent)}
            onClose={() => setSelectedStudent(null)}
            maxWidth="lg"
            fullWidth
          >
            <DialogTitle>Student Code</DialogTitle>
            <DialogContent>
              <CodeState
                student={selectedStudent}
                currentTime={currentTime}
                currentView={view}
                selectedTask={selectedTask}
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
    </div>
  );
};

export default AssistantDashboard;
