import { useDispatch, useSelector } from "react-redux";
import { actions } from "../../redux/app-reducer";
import { appStateType } from "../../redux/redux-store";
import Header from "../Header/Header";
import Chart from "./Chart";
import DateSlider from "./DateSlider";
import m from './viewPage.module.css'

const ViewPage = () => {

    const chartList = useSelector((state: appStateType) => state.app.chartList)
    const dateRange = useSelector((state: appStateType) => state.app.dateRange)

    const dispatch = useDispatch()

    const onFilter = (newValue: number[]) => {
        dispatch(actions.changeDateRange(newValue))
    }

    return (
        <div className={m.wrapper}>
            <Header />
            {
                chartList.length > 0
                    ? <DateSlider onFilter={onFilter} />
                    : null
            }
            {
                chartList
                    ?
                    chartList.map((chart, index) => {
                        return <Chart key={index} chart={chart} dateRange={dateRange} index={index} />
                    })
                    : null
            }
        </div>
    )
}

export default ViewPage