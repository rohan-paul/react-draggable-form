import React from "react"
import { connect } from "react-redux"
import PropTypes from "prop-types"
import { ListManager } from "react-beautiful-dnd-grid"
import TextField from "@material-ui/core/TextField"
import {
  handleFirstNameChange,
  loadInitialData,
} from "../actions/getUserActions"

const list = [
  {
    id: 0,
    createdOn: "2020-02-24T13:20:47.500+0000",
    fieldName: "First Name",
    fieldType: "TXT",
    mandatory: "Y",
    order: 1,
    expectedValues: [],
  },
  {
    id: 1,
    createdOn: "2020-02-24T13:20:47.500+0000",
    fieldName: "Last Name",
    fieldType: "TXT",
    mandatory: "N",
    order: 2,
    expectedValues: [],
  },
  {
    id: 2,
    createdOn: "2020-02-24T13:20:47.500+0000",
    fieldName: "Email Address",
    fieldType: "TXT",
    mandatory: "Y",
    order: 3,
    expectedValues: [],
  },
  {
    id: 3,
    createdOn: "2020-02-24T13:20:47.500+0000",
    fieldName: "Title",
    fieldType: "TXT",
    mandatory: "N",
    order: 4,
    expectedValues: [],
  },
  {
    id: 4,
    createdOn: "2020-02-24T13:20:47.500+0000",
    fieldName: "Company Name",
    fieldType: "SS",
    mandatory: "Y",
    order: 5,
    expectedValues: ["Enhancio", "Infosys", "Microsoft"],
  },
  {
    id: 5,
    createdOn: "2020-02-24T13:20:47.500+0000",
    fieldName: "Job Level",
    fieldType: "SS",
    mandatory: "Y",
    order: 6,
    expectedValues: ["Manager", "Engineer"],
  },
  {
    id: 6,
    createdOn: "2020-02-24T13:20:47.500+0000",
    fieldName: "Job Function",
    fieldType: "SS",
    mandatory: "Y",
    order: 7,
    expectedValues: ["Designer", "Developer"],
  },
  {
    id: 7,
    createdOn: "2020-02-24T13:20:47.500+0000",
    fieldName: "Company Size",
    fieldType: "MS",
    mandatory: "Y",
    order: 8,
    expectedValues: ["10 -20", "20-30", "30-100"],
  },
]

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
      {console.log("ListElement ITEM IS ", fieldName)}
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
        value={valueContent || ""}
        onChange={e => {
          console.log(e.target.value)
          onChange(e.target.value, fieldName)
        }}
        helperText={helperText}
        label={label}
        type={types}
        fullWidth
      />
    </div>
  )
}

class FormTextField extends React.Component {
  state = {
    sortedList: sortList(list),
  }

  componentDidCatch() {
    this.props.loadInitialData()
    this.setState({
      sortedList: this.props.globalStore.initialLoadedData,
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
      {console.log("FULL USER STATE, ", this.props.globalStore)}
      <ListManager
        items={this.state.sortedList}
        direction="horizontal"
        maxItems={2}
        render={item => (
          <ListElement
            item={item}
            handleFirstNameChange={this.props.handleFirstNameChange}
            sortedList={this.state.sortedList}
            valueContent={
              item.fieldName === "First Name"
                ? this.props.globalStore.first_name
                : ""
            }
          />
        )}
        onDragEnd={this.reorderList}
      />
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
  loadInitialData,
}

export default connect(mapStateToProps, mapDispatchToProps)(FormTextField)
