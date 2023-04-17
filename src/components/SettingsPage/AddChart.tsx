import { Button } from "@mui/material"
import { Field, Form, Formik } from "formik"
import { Dispatch, SetStateAction } from "react"
import { useDispatch } from "react-redux"
import { actions } from "../../redux/app-reducer"
import m from './settingsPage.module.css'

type propsType = {
    setOpen: Dispatch<SetStateAction<boolean>>
  }

const AddChart: React.FC<propsType> = ({setOpen}) => {

    const dispatch = useDispatch()

    return (
        <Formik
      initialValues={{
        chartTitle: "",
        lineTitles: ["", ""],
        lineColors: ["#000000", "#000000"],
        lineTypes: "line",
      }}
      onSubmit={(values) => {
        dispatch(actions.addChart(values));
        setOpen(false);
      }}
    >
      {({ values }) => (
        <Form className={m.form}>
          <div className={m.formItem}> 
            <label className={m.formLabel} htmlFor="chartTitle">Chart title:</label>
            <Field name="chartTitle" />
          </div> 
          <div className={m.formItem}>
            <label htmlFor="lineTitles.0">Line 1 title:</label>
            <Field name="lineTitles.0" />
          </div>
          <div className={m.formItem}>
            <label htmlFor="lineColors.0">Line 1 color:</label>
            <Field type="color" name="lineColors.0" />
          </div>
          <div className={m.formItem}>
            <label htmlFor="lineTitles.1">Line 2 title:</label>
            <Field name="lineTitles.1" />
          </div>
          <div className={m.formItem}>
            <label htmlFor="lineColors.1">Line 2 color:</label>
            <Field type="color" name="lineColors.1" />
          </div>
          <div className={m.formItem}>
          <label htmlFor={`lineTypes`}>Line type:</label>
          <Field as="select" name="lineTypes">
            <option value="line">Line</option>
            <option value="spline">Spline</option>
            <option value="area">Area</option>
          </Field>
          </div>
          <Button type="submit">Add</Button>
        </Form>
      )}
    </Formik>

    )
}

export default AddChart