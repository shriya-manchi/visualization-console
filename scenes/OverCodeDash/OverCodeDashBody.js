import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Paper,
  Typography,
  TablePagination,
} from "@mui/material";

const OverCodeDashBody = ({ overCodeData, index }) => {
  const [orderBy, setOrderBy] = useState("file");
  const [order, setOrder] = useState("asc");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const dataEntries =
    overCodeData && overCodeData.size > 0
      ? Array.from(overCodeData.entries())
      : [];

  return (
    <TableContainer component={Paper} sx={{ height: "100%" }}>
      <Typography variant="h6">
        {index === 1 ? "Correct" : "Incorrect"}
      </Typography>
      <Table sx={{ width: "100%" }} aria-label="sortable and selectable table">
        <TableHead>
          <TableRow>
            <TableCell sx={{ width: "10%" }}>
              <TableSortLabel
                active={orderBy === "file"}
                direction={orderBy === "file" ? order : "asc"}
              >
                Count
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={orderBy === "title"}
                direction={orderBy === "title" ? order : "asc"}
              >
                Code
              </TableSortLabel>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {dataEntries
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map(([codeLine, value]) => (
              <TableRow key={codeLine}>
                <TableCell sx={{ whiteSpace: "nowrap" }}>{value}</TableCell>
                <TableCell
                  sx={{
                    whiteSpace: "nowrap",
                    color: index === 1 ? "lightGreen" : "red",
                    fontSize: "0.8rem",
                  }}
                >
                  {codeLine}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
        <TablePagination
          sx={{ width: "200%" }}
          rowsPerPageOptions={[10, 20, 30]}
          component="div"
          count={dataEntries.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Table>
    </TableContainer>
  );
};

export default OverCodeDashBody;
