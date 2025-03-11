import { Box } from "@mui/material";

const backgroundColors = {
  correct: "rgb(204, 230, 193)",
  incorrect: "rgb(235, 203, 204)",
  noSubmission: "#000000",
};

const textColor = {
  correct: "darkgreen",
  incorrect: "darkred",
  noSubmission: "#ffffff",
};

const Brick = ({ student }) => {
  const determineBackgroundColor = (student) => {
    return student.Correct
      ? backgroundColors.correct
      : backgroundColors.incorrect;
  };

  const determineTextColor = (student) => {
    return student.Correct ? textColor.correct : textColor.incorrect;
  };

  // Set the background color
  const background = determineBackgroundColor(student);

  // Set the text color
  const text = determineTextColor(student);

  const printName = student.Student_Name.length > 6 
    ? student.Student_Name.substring(0, 6) + "..." 
    : student.Student_Name;

  return (
    <Box
      sx={{
        textAlign: "left",
        borderRadius: "10px",
        borderStyle: "solid",
        borderColor: "lightgray",
        cursor: "pointer",
        display: "inline-block",
        backgroundColor: background,
        color: text,
        padding: "3px",
        borderRadius: "4px",
        width: "80px",
      }}
    >
      <span>{printName}</span>
    </Box>
  );
};

export default Brick;
