import React from "react";
import { InputLabel, Box, Select, MenuItem, FormControl } from "@mui/material";

const StudentsFilter = (props) => {
  const [status, setStatus] = React.useState("");

  const handleChange = (event) => {
    setStatus(event.target.value);
    props.studentsFilter(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl variant="outlined" sx={{ m: 1, minWidth: 150 }} className="form-control">
        <InputLabel id="student-filter-label">Status Filter</InputLabel>
        <Select
          labelId="student-filter-label"
          id="student-filter"
          value={status}
          label="Student Filter"
          onChange={handleChange}
        >
          <MenuItem value={0}>All</MenuItem>
          <MenuItem value={1}>Completed</MenuItem>
          <MenuItem value={2}>In Progress</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default StudentsFilter;
