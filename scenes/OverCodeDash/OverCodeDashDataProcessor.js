const OverCodeDashDataprocessor = (data) => {
  // Check if data is defined
  if (!data || !data.GetMetricData) {
    console.log("Data is not defined");
    return null;
  }

  const metricData = data.GetMetricData;

  const filteredData = [];

  for (let i = 0; i < metricData.length; i++) {
    const filteredLogs = metricData[i].data;

    // Add a new field of Correctness
    if (metricData[i].id === "Outlier") {
      filteredLogs.forEach((log) => {
        log.Correct = "Outlier";
      });
    } else if (metricData[i].id === "Correct") {
      filteredLogs.forEach((log) => {
        log.Correct = "Correct";
      });
    } else if (metricData[i].id === "Incorrect") {
      filteredLogs.forEach((log) => {
        log.Correct = "Incorrect";
      });
    }

    filteredData.push(...filteredLogs);
  }

  // Create three maps, correct code lines, incorrect code lines, and outlier code lines
  let correctCodeLines = new Map();
  let incorrectCodeLines = new Map();
  let outlierCodeLines = new Map();

  // For each log in filteredData, seperate the code into lines
  // Store the code lines into the corresponding map, based on the correctness, if the code line is already in the map, increase the count by 1
  filteredData.forEach((log) => {
    const lines = log.Code.split("\n"); // Assuming each log has a `code` property which contains the code

    lines.forEach((line) => {
      // Remove the log that is a comment or empty
      if (
        line.trim().startsWith("//") ||
        line.trim().startsWith("#") ||
        line.trim() === ""
      ) {
        return;
      }

      let trimmedLine = line.trim(); // Trim the line to remove any leading or trailing whitespace
      if (log.Correct === "Correct") {
        correctCodeLines.set(
          trimmedLine,
          (correctCodeLines.get(trimmedLine) || 0) + 1
        );
      } else if (log.Correct === "Incorrect") {
        incorrectCodeLines.set(
          trimmedLine,
          (incorrectCodeLines.get(trimmedLine) || 0) + 1
        );
      } else if (log.Correct === "Outlier") {
        outlierCodeLines.set(
          trimmedLine,
          (outlierCodeLines.get(trimmedLine) || 0) + 1
        );
      }
    });
  });

  // Removethe entries from the incorrectCodeLines map that are present in the correctCodeLines map
  for (let correctKey of correctCodeLines.keys()) {
    if (incorrectCodeLines.has(correctKey)) {
      incorrectCodeLines.delete(correctKey);
    }
  }

  // Sort the maps by the count of the code lines
  function sortedMap(map) {
    // Sort in descending order of values (counts)
    return new Map([...map.entries()].sort((a, b) => b[1] - a[1]));
  }

  // Sort the maps
  const sortedCorrectCodeLines = sortedMap(correctCodeLines);
  const sortedIncorrectCodeLines = sortedMap(incorrectCodeLines);
  const sortedOutlierCodeLines = sortedMap(outlierCodeLines);

  return {
    sortedCorrectCodeLines,
    sortedIncorrectCodeLines,
    sortedOutlierCodeLines,
  };
};

export default OverCodeDashDataprocessor;
