import { Box, useTheme } from "@mui/material";
import Header from "@components/Header";
import DataContext from "@context/DataContext";
import { useContext, useState } from "react";
import { tokens } from "@styles/theme";
import GraphQLMenu from "@scenes/Global/GraphQLMenu";
import { GET_UNIQUE_VALUE_LIST_METRIC } from "@graphql/Queries/Queries";
import VizProgScatter from "@scenes/VizProgDash/VizProgScatter";

const VizProgView = ({ colors, context }) => {
  const [question, setQuestion] = useState({
    Course_Id: context.Course_Id,
    Session_Id: context.Session_Id,
    Question_Id: "All",
    Metric: "All",
    Timestamp: "All",
  });

  return (
    <Box
      display="grid"
      gridTemplateColumns="repeat(12, 2fr)"
      gridAutoRows="80px"
      gap="0px"
    >
      <Box gridColumn="span 12" gridRow="span 1">
        <GraphQLMenu
          query={GET_UNIQUE_VALUE_LIST_METRIC}
          queryFilter={question}
          minWidth={140}
          id="questionid"
          title="Question"
          fieldTitle="Question_Id"
          state={question}
          setState={setQuestion}
        />
        <GraphQLMenu
          query={GET_UNIQUE_VALUE_LIST_METRIC}
          queryFilter={question}
          minWidth={140}
          id="metric"
          title="Metric"
          fieldTitle="Metric"
          state={question}
          setState={setQuestion}
        />
        <GraphQLMenu
          query={GET_UNIQUE_VALUE_LIST_METRIC}
          queryFilter={question}
          minWidth={140}
          id="timestamp"
          title="Timestamp"
          fieldTitle="Timestamp"
          state={question}
          setState={setQuestion}
        />
      </Box>
      {question.Question_Id === "All" ||
      question.Metric === "All" ||
      question.Timestamp === "All" ? (
        <Box gridColumn="span 12">
          <h2>Select a Question, Metric, and Timestamp to run VizProg</h2>
        </Box>
      ) : (
        <Box
          gridColumn="span 12"
          gridRow="span 11"
          bgcolor={colors.primary[400]}
        >
          <VizProgScatter queryFilter={question} />
        </Box>
      )}
    </Box>
  );
};

const VizProgDash = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { context } = useContext(DataContext);

  return (
    <Box height="100%" display="flex" flexDirection="row">
      <div className="dashboard-container">
        <div className="prediction-dashboard-layout">
          <Header
            title="VizProg"
            subtitle="Class Overview of Progress on a Single Question"
          />
          {context.Course_Id === "All" || context.Session_Id === "All" ? (
            <h2>Select a Course and Exercise</h2>
          ) : (
            (console.log(context),
            (<VizProgView colors={colors} context={context} />))
          )}
        </div>
      </div>
    </Box>
  );
};

export default VizProgDash;
