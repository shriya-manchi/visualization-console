import { useState } from "react";
import {
  InputLabel,
  Select,
  MenuItem,
  FormControl,
  SelectChangeEvent,
} from "@mui/material";
import { useQuery } from "@apollo/client";
import { handleQueryFilter } from "@utility/utility";
import { POLL_INTERVAL } from "@graphql/Queries/Queries";

const MenuItems = ({
  query,
  queryFilter,
  ColumnName,
  id,
  value,
  title,
  handleChange,
}: MenuItemProps) => {
  let variable = { ColumnName };
  if (queryFilter) {
    variable = handleQueryFilter(queryFilter, variable);
  }
  const { loading, error, data, startPolling } = useQuery(query, {
    variables: variable,
    fetchPolicy: "no-cache",
  });

  if (loading || error)
    return (
      <Select
        labelId={id + "-select-label"}
        id={id + "-simple-select"}
        value={"All"}
        label={title}
      >
        <MenuItem key={"All"} value={"All"}>
          All
        </MenuItem>
      </Select>
    );

  startPolling(POLL_INTERVAL);

  return (
    <Select
      labelId={id + "-select-label"}
      id="course-simple-select"
      value={value}
      label={title}
      onChange={handleChange}
    >
      <MenuItem key={"All"} value={"All"}>
        All
      </MenuItem>
      {data.UniqueValueList.StringValues.map((item: string) => (
        <MenuItem key={item} value={item}>
          {item}
        </MenuItem>
      ))}
    </Select>
  );
};

const GraphQLMenu = ({
  minWidth = 150,
  id = "default",
  title = "Default",
  query,
  queryFilter,
  fieldTitle,
  state,
  setState,
}: graphQlMenuInput) => {
  const [value, setValue] = useState("All");

  const handleChange = (event: SelectChangeEvent) => {
    setValue(event.target.value);
    if (state && setState) {
      setState({
        ...state,
        [fieldTitle]: event.target.value,
      });
    }
  };

  return (
    <FormControl sx={{ m: 1, minWidth: minWidth }}>
      <InputLabel id={id + "-label"}>{title}</InputLabel>
      <MenuItems
        query={query}
        queryFilter={queryFilter}
        ColumnName={fieldTitle}
        id={id}
        value={value}
        title={title}
        handleChange={handleChange}
      />
    </FormControl>
  );
};

export default GraphQLMenu;
