import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { handleQueryFilter } from "@utility/utility";
import { useTheme } from "@mui/material/styles";

const ClassSummary = ({ query, queryFilter, selectedTime, currentView, onTaskSelect }) => {
  const [tasksCompletion, setTasksCompletion] = useState([]);
  const [overallCompletion, setOverallCompletion] = useState(0);
  const [selectedTask, setSelectedTask] = useState(null);
  const theme = useTheme();

  let variable = handleQueryFilter({});
  if (queryFilter) {
    variable = handleQueryFilter(queryFilter, {});
  }
  const { loading, error, data, startPolling } = useQuery(query, {
    variables: variable,
    fetchPolicy: "no-cache",
  });

  startPolling(5000);

  useEffect(() => {
    if (data && data.GetAssistantData) {
      if (currentView === "predictedscore" || currentView === "outlierprediction") {
        const studentsArray = data.GetAssistantData;
        const tasksUpToSelectedTime = studentsArray.flatMap((student) =>
          student.data.filter((task) => task.Time_Since_Start <= selectedTime)
        );
        const uniqueTasks = [
          ...new Set(tasksUpToSelectedTime.map((task) => task.Task)),
        ];
        uniqueTasks.sort((a, b) => {
          const regex = /(\D+)(\d+)/;
          const matchA = a.match(regex);
          const matchB = b.match(regex);
          if (matchA && matchB) {
            const [, lettersA, numA] = matchA;
            const [, lettersB, numB] = matchB;
            if (lettersA === lettersB) {
              return Number(numA) - Number(numB);
            }
            return lettersA.localeCompare(lettersB);
          }
          return a.localeCompare(b);
        });

        const tasksCompletion = uniqueTasks.map((taskName) => {
          const totalStudents = studentsArray.length;
          var all_students = [];
          studentsArray.forEach((item) =>
            all_students.push(item.data[0].Student_Id)
          );
          const uniqueStudents = [...new Set(all_students)];
          console.log(uniqueStudents);
          const all = studentsArray.filter((student) =>
            student.data.some(
              (task) =>
                task.Task === taskName &&
                task.Finish === true &&
                task.Time_Since_Start <= selectedTime
            )
          );
          var some_students = [];

          all.forEach((item) => some_students.push(item.data[0].Student_Id));
          var someUnique = [...new Set(some_students)];

          return {
            taskName,
            percentageFinished:
              (someUnique.length / uniqueStudents.length) * 100,
          };
        });
        setTasksCompletion(tasksCompletion);
      } else if (currentView === "solutionType") {
        setOverallCompletion(100);
      } else {
        const studentsArray = data.GetAssistantGeneral;
        if (Array.isArray(studentsArray)) {
          const totalStudents = studentsArray.reduce(
            (acc, student) => acc + (student.data?.length || 0),
            0
          );
          const finishedTasks = studentsArray.reduce(
            (acc, student) =>
              acc + (student.data?.filter((task) => task.Finish).length || 0),
            0
          );

          const completionPercentage =
            totalStudents > 0 ? (finishedTasks / totalStudents) * 100 : 0;
          setOverallCompletion(completionPercentage);
        }
      }
    }
  }, [data, selectedTime, currentView]);

  const handleClick = (taskName) => {
    setSelectedTask(taskName);
    onTaskSelect(taskName);
  };

  return (
    <>
      {(currentView === "predictedscore" || currentView === "outlierprediction") && tasksCompletion.length > 0 ? (
        tasksCompletion.map(({ taskName, percentageFinished }) => (
          <div
            key={taskName}
            className="progress-bar-container"
            onClick={() => handleClick(taskName)}
          >
            <h3
              style={{
                color:
                  taskName === selectedTask
                    ? "#8ebfb7"
                    : theme.palette.text.primary,
              }}
            >
              {taskName}
            </h3>
            <div
              className="progress-bar"
              style={{
                backgroundColor:
                  taskName === selectedTask ? "#8ebfb7" : "lightgray",
              }}
            >
              <div
                className="progress-finished"
                style={{ width: `${percentageFinished}%` }}
              >
                <p className="student-groups-percentage">
                  {percentageFinished.toFixed(2)}%
                </p>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="progress-bar-container">
          <h3>Overall Completion</h3>
          <div className="progress-bar">
            <div
              className="progress-finished"
              style={{ width: `${overallCompletion}%` }}
            >
              <p className="student-groups-percentage">
                {overallCompletion.toFixed(2)}%
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ClassSummary;
