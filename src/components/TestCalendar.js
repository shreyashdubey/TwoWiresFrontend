import { Select, Box, Grid, Center } from "@chakra-ui/react";

const TestCalendar = () => {
  const months = Array.from({ length: 12 }, (_, index) => index + 1);
  const years = Array.from({ length: 80 }, (_, index) => index + 1960);

  const handleMonthChange = (selectedMonth) => {
    // Handle the selected month
    console.log(selectedMonth);
  };

  return (
    <Box bgColor={"red.500"} w="50%">
      <Grid
        bgColor={"blue.600"}
        templateColumns="repeat(2, 1fr)"
        gap={4}
        p={4}
        alignItems="center"
        justifyContent="center"
      >
        <Select
          placeholder="Start Month"
          onChange={(e) => handleMonthChange(e.target.value)}
        >
          {months.map((month) => (
            <option key={month} value={month}>
              {month}
            </option>
          ))}
        </Select>
        <Select
          placeholder="Start Year"
          onChange={(e) => handleMonthChange(e.target.value)}
        >
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </Select>

        <Select
          placeholder="End Month"
          onChange={(e) => handleMonthChange(e.target.value)}
        >
          {months.map((month) => (
            <option key={month} value={month}>
              {month}
            </option>
          ))}
        </Select>
        <Select
          placeholder="End Year"
          onChange={(e) => handleMonthChange(e.target.value)}
        >
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </Select>
      </Grid>
    </Box>
  );
};

export default TestCalendar;
