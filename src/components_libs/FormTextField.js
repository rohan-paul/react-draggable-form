import React from "react"
import { connect } from "react-redux"
import PropTypes from "prop-types"
import { ListManager } from "react-beautiful-dnd-grid"
import TextField from "@material-ui/core/TextField"
import axios from "axios"
import {
  handleSnackBarStatus,
  submitChangedOrder,
} from "../actions/getUserActions"
import Button from "@material-ui/core/Button"
import Switch from "@material-ui/core/Switch"
import IconButton from "@material-ui/core/IconButton"
import CancelIcon from "@material-ui/icons/Cancel"
import GlobalSnackbar from "./GlobalSnackbar"

const renderSwitch = props => {
  const handleChange = name => event => {}

  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <IconButton
        onClick={() => props.deleteItem(props.id)}
        style={{ float: "right", marginBotton: "20px" }}
      >
        <CancelIcon />
      </IconButton>
      <Switch
        checked={props.mandatory !== "Y"}
        onChange={handleChange("checkedA")}
        value="checkedA"
        inputProps={{ "aria-label": "secondary checkbox" }}
      />
    </div>
  )
}

const sortList = list => {
  return list.slice().sort((first, second) => first.order - second.order)
}

const ListElement = ({
  item: { id, fieldName, mandatory },
  sortedList,
  deleteItem,
  ...props
}) => {
  const { autoFocus, label, types, helperText } = props

  // This function is no more required, as I was coding it to provide user ability to edit each field's text data
  // const onChange = (e, fieldName) => {
  //   if (fieldName === "First Name") {
  //     handleFirstNameChange(e, fieldName)
  //   }
  // }

  return (
    <>
      {console.log("CLICKEd ITEM ", id)}
      <div
        style={{
          width: "530px",
          height: "120px",
          marginRight: "10px",
          marginLeft: "20px",
          marginTop: "10px",
          // backgroundColor: "#DCDCDC",
          backgroundColor: "white",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "2em",
          fontWeight: "bold",
          color: "white",
          borderRadius: "10px",
        }}
      >
        <div>{id}</div>
        <TextField
          required
          autoFocus={autoFocus}
          multiline={label === "Description of Field" ? true : undefined}
          style={{
            marginRight: "10px",
            marginLeft: "10px",
            height: "60px",
            marginBottom: 0,
          }}
          value={fieldName}
          // onChange={e => {
          //   console.log(e.target.value)
          //   onChange(e.target.value, fieldName)
          // }}
          helperText={helperText}
          label={label}
          type={types}
          fullWidth
          InputProps={{
            endAdornment: renderSwitch(
              (mandatory = { mandatory, deleteItem, id }),
            ),
          }}
        />
      </div>
    </>
  )
}

// Function to add an ID to each item of the array of objects, received from API call, as the raw data received from the API does not have an id field
const addId = arr => {
  return arr.map(function(obj, index) {
    return Object.assign({}, obj, { id: index })
  })
}

class FormTextField extends React.Component {
  state = {
    sortedList: [],
  }

  componentDidMount() {
    const url = "http://54.193.89.54:8230/readFields"
    axios.get(url).then(res => {
      this.setState({
        sortedList: addId(res.data),
      })
    })
  }

  deleteItem = id => {
    this.setState({
      sortedList: this.state.sortedList.filter(i => i.id !== id),
    })
  }

  // Function to just update the list state
  sortList = () => {
    this.setState({
      ...this.state,
      sortedList: sortList(this.state.sortedList),
    })
  }

  // The main functions to handle the re-ordering after onDragEnd
  reorderList = (sourceIndex, destinationIndex) => {
    if (destinationIndex === sourceIndex) {
      return
    }
    const list = this.state.sortedList

    // If the item is dragged to the first position, the re-position the current first-positioned element
    if (destinationIndex === 0) {
      list[sourceIndex].order = list[0].order - 1
      this.sortList()
      return
    }
    // If the item is dragged to the last position, the re-position the current last-positioned element
    if (destinationIndex === list.length - 1) {
      list[sourceIndex].order = list[list.length - 1].order + 1
      this.sortList()
      return
    }
    if (destinationIndex < sourceIndex) {
      list[sourceIndex].order =
        (list[destinationIndex].order + list[destinationIndex - 1].order) / 2
      this.sortList()
      return
    }
    list[sourceIndex].order =
      (list[destinationIndex].order + list[destinationIndex + 1].order) / 2
    this.sortList()
  }

  closeSnackbar = () => this.props.handleSnackBarStatus(false)

  render = () => (
    <div className="FormTextField">
      <ListManager
        items={this.state.sortedList}
        direction="horizontal"
        T
        maxItems={2}
        render={item => (
          <ListElement
            item={item}
            deleteItem={this.deleteItem}
            sortedList={this.state.sortedList}
          />
        )}
        onDragEnd={this.reorderList}
      />
      {/* ) : null} */}
      <div
        style={{
          position: "absolute",
          right: "30px",
          bottom: "30px",
          float: "right",
        }}
      >
        <Button
          // onClick={onClose}
          variant="outlined"
          size="large"
          color="primary"
          style={{ marginRight: "10px" }}
        >
          Cancel
        </Button>
        <Button
          onClick={() => {
            const reqBody = this.state.sortedList
            this.props.submitChangedOrder(reqBody)
          }}
          variant="contained"
          size="large"
          color="primary"
          // disabled={isSaveDisabled}
        >
          Save
        </Button>
      </div>
      <GlobalSnackbar
        open={this.props.globalStore.snackbar === true}
        variant="error"
        message={"Successfully Submitted the Changed Orders"}
        onClose={this.closeSnackbar}
      />
    </div>
  )
}

FormTextField.propTypes = {
  user: PropTypes.object,
  handleSnackBarStatus: PropTypes.func,
}

const mapStateToProps = state => {
  return { globalStore: state.globalStore }
}

const mapDispatchToProps = {
  submitChangedOrder,
  handleSnackBarStatus,
}

export default connect(mapStateToProps, mapDispatchToProps)(FormTextField)
