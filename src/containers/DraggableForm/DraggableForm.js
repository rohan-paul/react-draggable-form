/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/button-has-type */
/* eslint-disable-next-line react-hooks/exhaustive-deps */
import React from "react"
import PropTypes from "prop-types"
import { useStyles } from "./DraggableFormStyles"
import FormTextField from "../../components_libs/FormTextField"
import Button from "@material-ui/core/Button"

const DraggableForm = () => {
  const classes = useStyles()

  return (
    <div className={classes.container}>
      <div className={classes.tableAndFabContainer}>
        <div className={classes.formContainer}>
          <div className={classes.leftTable}>
            <div>
              <FormTextField></FormTextField>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

DraggableForm.propTypes = {
  onClose: PropTypes.func.isRequired,
}

export default DraggableForm
