/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/button-has-type */
/* eslint-disable-next-line react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import PropTypes from "prop-types"
import { Typography } from "@material-ui/core"
import GlobalSnackbar from "../../components_libs/GlobalSnackbar"
import { handleSnackBarStatus } from "../../actions/getUserActions"
import Button from "@material-ui/core/Button"
import { useStyles } from "./DraggableFormStyles"
import FormTextField from "../../components_libs/FormTextField"

const DraggableForm = () => {
  const globalStore = useSelector(state => state.globalStore)
  const dispatch = useDispatch()
  const classes = useStyles()
  const [value, setValue] = useState("")

  useEffect(() => {}, [dispatch])

  const closeSnackbar = () => dispatch(handleSnackBarStatus(false))

  return (
    <div className={classes.container}>
      <div className={classes.tableAndFabContainer}>
        <div className={classes.formContainer}>
          <div className={classes.leftTable}>
            <div>
              <FormTextField></FormTextField>
            </div>
            {/* <div>
              <FormTextField></FormTextField>
            </div>
            <div>
              <FormTextField></FormTextField>
            </div>
            <div>
              <FormTextField></FormTextField>
            </div>
            <div>
              <FormTextField></FormTextField>
            </div> */}
          </div>

          {/* <div>
            <div>
              <FormTextField></FormTextField>
            </div>
            <div>
              <FormTextField></FormTextField>
            </div>
            <div>
              <FormTextField></FormTextField>
            </div>
            <div>
              <FormTextField></FormTextField>
            </div>
            <div>
              <FormTextField></FormTextField>
            </div>
          </div> */}
        </div>

        <GlobalSnackbar
          open={
            globalStore.snackbar === true ||
            typeof globalStore.snackbar === "object" ||
            typeof globalStore.snackbar === "string" ||
            globalStore.snackbar instanceof String
          }
          variant="error"
          message={"Error occurred while loading Initial Data"}
          onClose={closeSnackbar}
        />
      </div>
    </div>
  )
}

DraggableForm.propTypes = {
  onClose: PropTypes.func.isRequired,
}

export default DraggableForm
