 import { actionsType } from "./redux-store";

 function generateRandomValue() {
    return Math.floor(Math.random() * 200000);
  }
  
  function generateData() {
    const arr = [];
  
    for (let i = 2010; i <= 2022; i++) {
      arr.push({
        date: i,
        value: generateRandomValue()
      });
    }
    return arr;
  }

type dataType = {
    date: number
    value: number
}

type seriesType = {
    name: string
    data: dataType[]
    color: string
}

export type chartListType = {
    title: string
    type: string
    series: seriesType[]
}


let initialState = {
  chartList: [
    {
      title: 'Example chart',
      type: 'area',
      series: [{
        name: 'Line 1',
        data: generateData(),
        color: '#c592c0'
      }, {
        name: 'Line 2',
        data: generateData(),
        color: '#1fd3db'
      }]
    }
  ] as chartListType[],
  dateRange: [2010, 2022]
}

type initialStateType = typeof initialState

const appReducer = (state: initialStateType = initialState, action: appActionsType)
: initialStateType => {
  switch (action.type) {
    case 'CHANGE-DATE-RANGE': {
      return {
        ...state,
        dateRange: action.newValue
      }
    }
    case 'EDIT-CHART': {
      return {
        ...state,
        chartList: state.chartList.map((chart, index) => {
          if (index === action.index) {
            return {
              title: action.chartEdits.chartTitle,
              type: action.chartEdits.lineTypes,
              series: chart.series.map((series, seriesIndex) => {
                return {
                  ...series,
                  name: action.chartEdits.lineTitles[seriesIndex],
                  color: action.chartEdits.lineColors[seriesIndex],
                  data: generateData()
                }
              }) 
            }
          } else {
            return chart;
          }
        })
      }
    }
    case 'DELETE-CHART': {
      return {
        ...state,
        chartList: state.chartList.filter((chart:chartListType, index:number) => index !== action.index)
      }
    }
    case 'ADD-CHART': {
      const newChart = {
        title: action.chart.chartTitle,
        type: action.chart.lineTypes,
        series: action.chart.lineTitles.map((title:string, index:number) => ({
          name: title,
          color: action.chart.lineColors[index],
          data: generateData()
        }))
      };
      return {
        ...state,
        chartList: [...state.chartList, newChart]
      }
    }
    default:
      return state;
  }
}

type appActionsType = actionsType<typeof actions>

type chartActionType = {
  chartTitle: string;
  lineTitles: string[];
  lineColors: string[];
  lineTypes: string
}

export const actions = {
  changeDateRange: (newValue: number[]) => {
    return {
      type: 'CHANGE-DATE-RANGE',
      newValue
    } as const
  },
  editChart: (chartEdits: chartActionType, index: number) => {
    return {
      type: 'EDIT-CHART',
      chartEdits,
      index
    } as const
  },
  deleteChart: (index: number) => {
    return {
      type: 'DELETE-CHART',
      index
    } as const
  },
  addChart: (chart:chartActionType) => {
    return {
      type: 'ADD-CHART',
      chart
    } as const
  }
}

export default appReducer;