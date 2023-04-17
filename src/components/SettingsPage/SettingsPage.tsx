import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material"
import { useState } from "react"
import { useSelector } from "react-redux"
import { chartListType } from "../../redux/app-reducer"
import { appStateType } from "../../redux/redux-store"
import Header from "../Header/Header"
import Chart from "../ViewPage/Chart"
import AddChart from "./AddChart"

import m from './settingsPage.module.css'

const SettingsPage = () => {

    const chartList = useSelector((state:appStateType) => state.app.chartList)
    const dateRange = useSelector((state:appStateType) => state.app.dateRange)

    const [open, setOpen] = useState(false);

    return (
        <div className={m.wrapper}>
            <Header />
            <Button onClick={() => setOpen(true)}>Add new chart</Button>
            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle>Add new chart</DialogTitle>
                <DialogContent>
                    <AddChart setOpen={setOpen}/>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)}>Cancel</Button>
                </DialogActions>
            </Dialog>
            {
                chartList
                    ?
                    chartList.map((chart:chartListType, index:number) => {
                        return <Chart key={index} chart={chart} dateRange={dateRange} index={index}/>
                    })
                    : null
            }
        </div>
    )
}

export default SettingsPage