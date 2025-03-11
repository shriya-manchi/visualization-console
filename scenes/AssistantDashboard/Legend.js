import WarningIcon from "@mui/icons-material/Warning";
import SchoolIcon from "@mui/icons-material/School";
import ModeStandbyIcon from "@mui/icons-material/ModeStandby";
import { useTheme } from "@mui/material/styles";

const Legend = ({
  showSolutionTypeLegend,
  showOutlierTypeLegend,
  showPredictedScoreLegend,
}) => {
  const theme = useTheme();
  const keyBoxStyle = {
    backgroundColor: theme.palette.background.default,
    backgroundBlendMode: "soild",
  };
  return (
    <div>
      {showSolutionTypeLegend ? (
        <div className="prediction-algorithm-legends-layout-solutionType">
          <div style={{ textAlign: "center" }}>Key</div>
          <div className="prediction-algorithm-legends">
            <div className="prediction-algorithm-legend-solutionType">
              <div
                className="prediction-algorithm-legend-item"
                // style={{ backgroundColor: "rgb(181, 215, 228)" }}
              >
                1
              </div>
              For loop with add 1
            </div>
            <div className="prediction-algorithm-legend-solutionType">
              <div
                className="prediction-algorithm-legend-item"
                // style={{ backgroundColor: "rgb(181, 215, 228)" }}
              >
                2
              </div>
              Count() method with add 1
            </div>
            <div className="prediction-algorithm-legend-solutionType">
              <div
                className="prediction-algorithm-legend-item"
                // style={{ backgroundColor: "rgb(181, 215, 228)" }}
              >
                3
              </div>
              For loop with puncation or spaces check
            </div>
            <div className="prediction-algorithm-legend-solutionType">
              <div
                className="prediction-algorithm-legend-item"
                // style={{ backgroundColor: "rgb(181, 215, 228)" }}
              >
                4
              </div>
              Incomplete code
            </div>
            <div className="prediction-algorithm-legend-solutionType">
              <div
                className="prediction-algorithm-legend-item"
                // style={{ backgroundColor: "rgb(181, 215, 228)" }}
              >
                5
              </div>
              Split() method
            </div>
            <div className="prediction-algorithm-legend-solutionType">
              <div
                className="prediction-algorithm-legend-item"
                // style={{ backgroundColor: "rgb(181, 215, 228)" }}
              >
                6
              </div>
              Count() method for spaces and punctuations
            </div>
            <div className="prediction-algorithm-legend-solutionType">
              <div
                className="prediction-algorithm-legend-item"
                // style={{ backgroundColor: "rgb(181, 215, 228)" }}
              >
                7
              </div>
              Split() method with stripping spaces
            </div>
            <div className="prediction-algorithm-legend-solutionType  Q1`">
              <div
                className="prediction-algorithm-legend-item"
                // style={{ backgroundColor: "rgb(181, 215, 228)" }}
              >
                8
              </div>
              Split() method without using length()
            </div>
          </div>
        </div>
      ) : showOutlierTypeLegend ? (
        <div className="prediction-algorithm-legends-layout">
          Key
          <div className="prediction-algorithm-legends">
            <div className="prediction-algorithm-legend">
              <div
                className="prediction-algorithm-legend-item-selected"
                style={{ backgroundColor: "rgb(181, 215, 228)" }}
              />
              Selected Student
            </div>
            <div className="prediction-algorithm-legend">
              <div
                className="prediction-algorithm-legend-item-view"
                style={{ backgroundColor: "rgb(223, 189, 112)" }}
              >
                <WarningIcon sx={{ height: "2vh", width: "2vh" }} />
              </div>
              Code Outlier
            </div>
            <div className="prediction-algorithm-legend">
              <div
                className="prediction-algorithm-legend-item-view"
                style={{ backgroundColor: "rgb(165, 174, 150)" }}
              >
                <ModeStandbyIcon sx={{ height: "2vh", width: "2vh" }} />
              </div>
              Idle Student
            </div>
            <div className="prediction-algorithm-legend">
              <div
                className="prediction-algorithm-legend-item-view"
                style={{ backgroundColor: "rgb(181, 215, 228)" }}
              >
                <SchoolIcon sx={{ height: "2vh", width: "2vh" }} />
              </div>
              Finished Student
            </div>
            <div className="prediction-algorithm-transition-legend">
              Lower Predicted Score
              <div className="prediction-algorithm-transition-legend-retangle" />
              Higher Predicted Score
            </div>
          </div>
        </div>
      ) : showPredictedScoreLegend ? (
        <div className="prediction-algorithm-legends-layout">
          Key
          <div className="prediction-algorithm-legends">
            <div className="prediction-algorithm-legend">
              <div
                className="prediction-algorithm-legend-item-selected"
                style={{ backgroundColor: "rgb(181, 215, 228)" }}
              />
              Selected Student
            </div>
            <div className="prediction-algorithm-legend">
              <div
                className="prediction-algorithm-legend-item-view"
                style={{ backgroundColor: "rgb(223, 189, 112)" }}
              >
                <WarningIcon sx={{ height: "2vh", width: "2vh" }} />
              </div>
              Low Predicted Score
            </div>
            <div className="prediction-algorithm-legend">
              <div
                className="prediction-algorithm-legend-item-view"
                style={{ backgroundColor: "rgb(165, 174, 150)" }}
              >
                <ModeStandbyIcon sx={{ height: "2vh", width: "2vh" }} />
              </div>
              Idle Student
            </div>
            <div className="prediction-algorithm-legend">
              <div
                className="prediction-algorithm-legend-item-view"
                style={{ backgroundColor: "rgb(181, 215, 228)" }}
              >
                <SchoolIcon sx={{ height: "2vh", width: "2vh" }} />
              </div>
              Finished Student
            </div>
            <div className="prediction-algorithm-transition-legend">
              Lowest Score
              <div className="prediction-algorithm-transition-legend-retangle" />
              Highest Score
            </div>
          </div>
        </div>
      ) : (
        <div className="prediction-algorithm-legends-layout">
          Key
          <div className="prediction-algorithm-legends">
            <div className="prediction-algorithm-legend">
              <div
                className="prediction-algorithm-legend-item-selected"
                style={{ backgroundColor: "rgb(181, 215, 228)" }}
              />
              Selected Student
            </div>
            <div className="prediction-algorithm-legend">
              <div
                className="prediction-algorithm-legend-item-view"
                style={{ backgroundColor: "rgb(223, 189, 112)" }}
              >
                <WarningIcon sx={{ height: "2vh", width: "2vh" }} />
              </div>
              In Difficulty
            </div>
            <div className="prediction-algorithm-legend">
              <div
                className="prediction-algorithm-legend-item-view"
                style={{ backgroundColor: "rgb(165, 174, 150)" }}
              >
                <ModeStandbyIcon sx={{ height: "2vh", width: "2vh" }} />
              </div>
              Idle Student
            </div>
            <div className="prediction-algorithm-legend">
              <div
                className="prediction-algorithm-legend-item-view"
                style={{ backgroundColor: "rgb(181, 215, 228)" }}
              >
                <SchoolIcon sx={{ height: "2vh", width: "2vh" }} />
              </div>
              Finished Student
            </div>
            <div className="prediction-algorithm-transition-legend">
              Shorter Time
              <div className="prediction-algorithm-transition-legend-retangle" />
              Longer Time
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Legend;
