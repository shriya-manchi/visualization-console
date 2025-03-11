import OverCodeDashBody from "@scenes/OverCodeDash/OverCodeDashBody";
import { Grid } from "@mui/material";

const OverCodeDashHeader = ({ overCodeData }) => {
  return (
    <Grid container>
      <Grid item sm={6}>
        <OverCodeDashBody
          overCodeData={overCodeData.sortedCorrectCodeLines}
          index={1}
        />
      </Grid>
      <Grid item sm={6}>
        <OverCodeDashBody
          overCodeData={overCodeData.sortedIncorrectCodeLines}
          index={0}
        />
      </Grid>
    </Grid>
  );
};

export default OverCodeDashHeader;
