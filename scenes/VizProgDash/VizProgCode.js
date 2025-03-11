import React from 'react';
import { Button } from '@mui/material';
import { CodeBlock } from 'react-code-blocks';
import { useTheme } from '@mui/material/styles';
import Tooltip from '@mui/material/Tooltip';
const VizProgCode = ({ selectedStudents, codeBlockIndex, setCodeBlockIndex }) => {
    const theme = useTheme();
    if (!selectedStudents || selectedStudents.length === 0) {
      return (
        <div className="code-block-container" style={{ padding: '10px', border: `1px solid ${theme.palette.divider}`, borderRadius: '4px' }}>
          <div className="selected-students-list" style={{ marginBottom: '5px' }}>
              <h3>Please select a student on the plot to view theie code</h3>
            </div>
          </div>
      );
  }

    const submissions = selectedStudents;
    const submission = submissions[codeBlockIndex];

    console.log('submission:', submission);
    console.log('Student_Id:', submission.data.Student_Id);
    console.log('Code:', submission.data.Code);

    const handleStudentButtonClick = (index) => {
        setCodeBlockIndex(index);
    };

    const buttonStyle = (index) => ({
        margin: '5px',
        backgroundColor: codeBlockIndex === index 
        ? (theme.palette.mode === 'dark' ? theme.palette.secondary.main : theme.palette.primary.main) 
        : theme.palette.background.paper,
        color: codeBlockIndex === index ? theme.palette.primary.contrastText : theme.palette.text.primary,
        border: codeBlockIndex === index ? 'none' : `1px solid ${theme.palette.divider}`,
    });


    const navButtonStyle = {
        width: "100px",
        margin: '5px',
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.text.primary,
        borderColor: theme.palette.divider
    };


    return (
        <div className="code-block-container" style={{ padding: '10px', border: `1px solid ${theme.palette.divider}`, borderRadius: '4px' }}>
          <div className="selected-students-list" style={{ marginBottom: '5px' }}>
            <h2>Selected Students: </h2>
                {selectedStudents.map((student, index) => (
                    <Tooltip title={student.data.Student_Id} key={student.data.Student_Id} placement="top">
                        <Button
                            variant="outlined"
                            size="small"
                            onClick={() => handleStudentButtonClick(index)}
                            style={buttonStyle(index)} 
                        >
                            {`Student ${index + 1}`}
                        </Button>
                    </Tooltip>
                ))}
            </div>

            <h2>Student: </h2>
            <p>{submission.data.Student_Id}</p>
            <div>
                <CodeBlock
              text={submission.data.Code}
              language="python"
              showLineNumbers={true}
              wrapLines={true}
              theme="atom-one-dark"
            />
            </div>
            <div className="code-block-button">
            {codeBlockIndex > 0 && (
              <Button
                sx={{ width: "100px" }}
                variant="outlined"
                onClick={() => {
                  setCodeBlockIndex(codeBlockIndex - 1);
                }}
                style={navButtonStyle}
              >
                Previous
              </Button>
            )}

            {codeBlockIndex < submissions.length - 1 && (
              <Button
                sx={{ width: "100px" }}
                variant="outlined"
                onClick={() => {
                  setCodeBlockIndex(codeBlockIndex + 1);
                }}
                style={navButtonStyle}
              >
                Next
              </Button>
            )}
          </div>
        </div>
    );
};

export default VizProgCode;
