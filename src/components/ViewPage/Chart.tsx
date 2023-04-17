import { Button, Dialog, DialogActions, DialogContent, DialogTitle} from "@mui/material";
import Highcharts from "highcharts";
import HighchartsReact from 'highcharts-react-official'
import React, { useEffect, useState } from "react";
import { useLocation} from "react-router-dom";
import { chartListType } from "../../redux/app-reducer";
import ChartEditor from "../SettingsPage/ChartEditor";
import DeletionConfirmation from "../SettingsPage/DeletionСonfirmation";


type propsType = {
  chart: chartListType
  dateRange: number[]
  index: number
}
  
const Chart: React.FC<propsType> = ({chart, dateRange, index}) => {
  
  useEffect(() => {
    const updatedOptions = {
      ...options,
      xAxis: {
        categories: chart.series
          .map(line => line.data
            .map(item => item.date)
            .filter(item => item >= dateRange[0] && item <= dateRange[1])
          )
          .flat()
      },
      series: chart.series.map(line => {
        return {
          name: line.name,
          data: line.data
            .filter((item) => item.date >= dateRange[0] && item.date <= dateRange[1])
            .map(item => item.value).flat(),
          color: line.color
        }
      })
    };
    setOptions(updatedOptions);
  }, [dateRange])

  useEffect(() => {
    setOptions(initialOptions)
  }, [chart])

  const initialOptions = {
    chart: {
      type: chart.type
    },
    title: {
      text: chart.title
    },
    xAxis: {
      categories: chart.series
        .map(line => line.data
          .map(item => item.date)
          .filter(item => item >= dateRange[0] && item <= dateRange[1])
        )
        .flat()
    },
    yAxis: {
      title: {
        text: 'Value'
      }
    },
    series: chart.series.map(line => {
      return {
        name: line.name,
        data: line.data
          .filter((item) => item.date >= dateRange[0] && item.date <= dateRange[1])
          .map(item => item.value).flat(),
        color: line.color
      }
    })
  };
  const [options, setOptions] = useState(initialOptions);

  const location = useLocation();
  const isEditingEnabled = location.pathname === '/settings';

  const [open, setOpen] = useState(false);
  
  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={options} />
      {
        isEditingEnabled && (
          <div>
            <div>
              <Button onClick={() => setOpen(true)}>Edit chart</Button>
              <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle>Edit Chart</DialogTitle>
                <DialogContent>
                  <ChartEditor chart={chart} index={index} setOpen={setOpen} />
                </DialogContent>
                <DialogActions>
                  <Button onClick={() => setOpen(false)}>Cancel</Button>
                </DialogActions>
              </Dialog>
            </div>
            <DeletionConfirmation index={index} />
          </div>
        )
      }
    </div>
  );
};

  
export default Chart;