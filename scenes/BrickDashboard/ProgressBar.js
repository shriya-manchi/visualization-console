import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { handleQueryFilter } from "@utility/utility";

const ProgressBar = ({ query, queryFilter = {} }) => {
  const [percentageFinished, setPercentageFinished] = useState(0);

  const variable = handleQueryFilter(queryFilter, {});
  const { loading, error, data, startPolling } = useQuery(query, {
    variables: variable,
    fetchPolicy: "no-cache",
  });

  startPolling(5000);

  useEffect(() => {
    if (data !== undefined) {
      const studentsArray = data.GetBrickData;
      const totalStudents = studentsArray.length;
      const totalFinished = studentsArray.filter((student) => {
        return student.data[0].Correct === true;
      }).length;

      setPercentageFinished((totalFinished / totalStudents) * 100);
    }
  }, [data]);

  return (
    <div className="progress-bar">
      <div
        className="progress-finished"
        style={{ width: `${percentageFinished}%` }}
      >
        <p className="student-groups-percentage">
          {percentageFinished.toFixed(2)}%
        </p>
      </div>
    </div>
  );
};

export default ProgressBar;
