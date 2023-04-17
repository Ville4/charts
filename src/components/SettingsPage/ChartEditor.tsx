import { Button } from "@mui/material"
import { Field, Form, Formik } from "formik"
import { Dispatch, SetStateAction } from "react"
import { useDispatch } from "react-redux"
import { actions, chartListType } from "../../redux/app-reducer"
import m from './settingsPage.module.css'

type propsType = {
    chart: chartListType
    index: number
    setOpen: Dispatch<SetStateAction<boolean>>
  }

const ChartEditor: React.FC<propsType> = ({chart, index, setOpen}) => {

    const dispatch = useDispatch()

    return (
        <Formik
        initialValues={{
          chartTitle: chart.title,
          lineTitles: chart.series.map(line => line.name),
          lineColors: chart.series.map(line => line.color) ,
          lineTypes: chart.type,
        }}
        onSubmit={values => {
          dispatch(actions.editChart(values, index))
          setOpen(false)
        }}
      >
        {({ values }) => (
          <Form className={m.form}>
            <div className={m.formItem}>
              <label htmlFor="graphTitle">Chart title:</label>
              <Field  name="chartTitle" />
            </div>
            {values.lineTitles.map((title, index) => (
              <div className={m.formItem} key={index}>
                <label htmlFor={`lineTitles.${index}`}>Line title:</label>
                <Field name={`lineTitles.${index}`} />
  
                <label htmlFor={`lineColors.${index}`}>Line color:</label>
                <Field type='color' name={`lineColors.${index}`} />   
              </div>
            ))}
            <div className={m.formItem}>
              <label htmlFor={`lineTypes`}>Line type:</label>
              <Field as="select" name="lineTypes">
                <option value="line">Line</option>
                <option value='spline'>Spline</option>
                <option value="area">Area</option>
              </Field>
            </div>
            <Button type="submit">Submit</Button>
          </Form>
        )}
      </Formik>
    )
}

export default ChartEditor