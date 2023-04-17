import { Button, Grid, Typography } from "@mui/material";
import { Slider } from "@mui/material";
import { useState } from "react";


const DateSlider = ({ onFilter }: any) => {
  const [priceRange, setPriceRange] = useState([2010, 2022]);

  const handleFilter = () => {

    onFilter(priceRange);
  };

  const handleChange = (event: any, newValue: any) => {
    setPriceRange(newValue);
  };

  return (
    <Grid container spacing={2} alignItems="center">
      <Grid item xs={12}>
        <Typography id="price-range-slider" gutterBottom>
          Select date range
        </Typography>
        <Slider
          value={priceRange}
          onChange={handleChange}
          valueLabelDisplay="auto"
          min={2010}
          max={2022}
          step={1}
          marks={[
            { value: 2010, label: "2010" },
            { value: 2014, label: "2014" },
            { value: 2018, label: "2018" },
            { value: 2022, label: "2022" },
          ]}
        />
      </Grid>
      <Grid item>
        <Button onClick={handleFilter}>
          Apply filter
        </Button>
      </Grid>
    </Grid>
  )
}

export default DateSlider