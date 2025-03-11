const BrickLegend = () => {
  return (
    <div className="matrix-ui-legends-layout">
      <div className="matrix-ui-legend">
        <div
          className="matrix-ui-legend-item"
          style={{ backgroundColor: "rgb(235, 203, 204)" }}
        />
        In Progress
      </div>
      <div className="matrix-ui-legend">
        <div
          className="matrix-ui-legend-item"
          style={{ backgroundColor: "rgb(249, 238, 194)" }}
        />
        No Submission
      </div>
      <div className="matrix-ui-legend">
        <div
          className="matrix-ui-legend-item"
          style={{ backgroundColor: "rgb(204, 230, 193)" }}
        />
        Finished
      </div>
    </div>
  );
};

export default BrickLegend;
