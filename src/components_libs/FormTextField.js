import React from "react"
import PropTypes from "prop-types"
import { makeStyles } from "@material-ui/core/styles"
import TextField from "@material-ui/core/TextField"
import { MuiThemeProvider } from "@material-ui/core/styles"
import themeCustom from "../commonStyles/AddNewItemThemes"

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    background: "linear-gradient(45deg, #E91E63 30%, #FF8E53 90%)",
    marginTop: theme.spacing(10),
    backgroundColor: "#E0E0E0",
  },
  space: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(3),
    backgroundColor: "#fff",
    borderRadius: "5px",
  },
  underline: {
    "&:after": {
      borderBottomColor: "rgb(70, 197, 29)",
      borderWidth: "1px",
    },
  },
}))

const FormTextField = props => {
  const { autoFocus, valueContent, label, types, onChange, helperText } = props

  const classes = useStyles()

  return (
    <MuiThemeProvider theme={themeCustom}>
      <React.Fragment>
        <TextField
          required
          autoFocus={autoFocus}
          multiline={label === "Description of Field" ? true : undefined}
          classes={{
            root: classes.space,
          }}
          value={valueContent || ""}
          onChange={e => onChange(e.target.value)}
          helperText={helperText}
          label={label}
          type={types}
          fullWidth
          InputProps={{
            classes: {
              underline: classes.underline,
            },
          }}
        />
      </React.Fragment>
    </MuiThemeProvider>
  )
}

FormTextField.propTypes = {
  autoFocus: PropTypes.bool,
  onChange: PropTypes.func,
  helperText: PropTypes.string,
  label: PropTypes.string,
  valueContent: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
}

export default FormTextField
