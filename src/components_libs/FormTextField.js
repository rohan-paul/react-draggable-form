import React from "react"
import { connect } from "react-redux"
import PropTypes from "prop-types"
import { ListManager } from "react-beautiful-dnd-grid"
import TextField from "@material-ui/core/TextField"
import axios from "axios"
import {
  handleFirstNameChange,
  submitChangedOrder,
} from "../actions/getUserActions"
import Button from "@material-ui/core/Button"

const sortList = list => {
  return list.slice().sort((first, second) => first.order - second.order)
}

const ListElement = ({
  item: { id, fieldName },
  handleFirstNameChange,
  sortedList,
  ...props
}) => {
  const { autoFocus, valueContent, label, types, helperText } = props

  const onChange = (e, fieldName) => {
    if (fieldName === "First Name") {
      handleFirstNameChange(e, fieldName)
    }
  }
  return (
    <>
      <div
        style={{
          width: "530px",
          height: "120px",
          marginRight: "10px",
          marginLeft: "20px",
          marginTop: "10px",
          backgroundColor: "lightblue",
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
        />
      </div>
    </>
  )
}

// Functiion to add an ID to each item of the array of objects, received from API call, as the raw data received from the API does not have an id field
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

  render = () => (
    <div className="FormTextField">
      {/* {console.log("FULL LOCAL STATE, ", JSON.stringify(this.state.sortedList))} */}
      {console.log(
        "CHANGED chnangedOrderData AFTER POSTING, ",
        JSON.stringify(this.props.globalStore.chnangedOrderData),
      )}
      {/* {this.state.sortedList.length !== 0 ? ( */}
      <ListManager
        items={this.state.sortedList}
        direction="horizontal"
        T
        maxItems={2}
        render={item => (
          <ListElement
            item={item}
            // handleFirstNameChange={this.props.handleFirstNameChange}
            sortedList={this.state.sortedList}
            valueContent={
              item.fieldName === "First Name"
                ? this.props.globalStore.first_name
                : item.fieldName === "Last Name"
                ? "Last Name"
                : ""
            }
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
    </div>
  )
}

FormTextField.propTypes = {
  user: PropTypes.object,
  handleFirstNameChange: PropTypes.func,
}

const mapStateToProps = state => {
  return { globalStore: state.globalStore }
}

const mapDispatchToProps = {
  handleFirstNameChange,
  submitChangedOrder,
}

export default connect(mapStateToProps, mapDispatchToProps)(FormTextField)
