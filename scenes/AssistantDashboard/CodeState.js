import { Box } from "@mui/material";
import { CodeBlock } from "react-code-blocks";


const CodeState = ({ student, selectedTask, currentView }) => {

  const handleSmallCodeContent = () => {
    if (!student) return " "; 

    let codeContent = "";

    switch (currentView) {
      case "general":
      case "outlierprediction":
        codeContent = student.Current_Code || " ";
        break;
      case "solutionType":
        codeContent = student.solution || " ";
        break;
      case "predictedscore":
        codeContent = student.Current_Code || " ";
        break;
      default:
        codeContent = " ";

    }

    // Ensure there are at least 15 lines
    let newLineCount = (codeContent.match(/\n/g) || []).length;
    for (let i = newLineCount; i < 15; i++) {
      codeContent += "\n";
    }

    return codeContent;
  };


  
  return (
    <Box>
      {student ? (
        <>
           {currentView === "predictedscore" || currentView === "outlierprediction" ? (
            <>
              <h3> Selected Student: {student.Student_Id}</h3>
              <p> Time Since Start: {student.Time_Since_Start} minutes </p>
              <p> Previous State: {student.Previous_States} </p>
              <p> Task: {student.Task} </p>
            </>
          ) : (
            <>
              <h3> Selected Student: {student.Name}</h3>
            </>
          )}
          <p> Code State </p>
          <div className="code-block">
            <CodeBlock
             text={handleSmallCodeContent() || " "}
              language="java"
              showLineNumbers={true}
              wrapLines={true}
              theme="atom-one-dark"
            />
          </div>
        </>
      ) : (
        <h3 style={{ textAlign: "center" }}>
          {" "}
          Please select a student in the matrix{" "}
        </h3>
      )}
    </Box>
  );
};

export default CodeState;
