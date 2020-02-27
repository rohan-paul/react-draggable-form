import React from "react"
import { connect } from "react-redux"
import PropTypes from "prop-types"
import { ListManager } from "react-beautiful-dnd-grid"
import TextField from "@material-ui/core/TextField"
import { handleFirstNameChange } from "../actions/getUserActions"

const list = [
  {
    id: "0",
    order: 0,
    field: "First Name",
  },
  {
    id: "1",
    order: 1,
    field: "Last Name",
  },
  {
    id: "2",
    order: 2,
    field: "Email Address",
  },
  {
    id: "3",
    order: 3,
    field: "Company Name",
  },
  {
    id: "4",
    order: 4,
    field: "First Name",
  },
  {
    id: "5",
    order: 5,
    field: "First Name",
  },
  {
    id: "6",
    order: 6,
    field: "First Name",
  },
  {
    id: "7",
    order: 7,
    field: "First Name",
  },
]

const sortList = list => {
  return list.slice().sort((first, second) => first.order - second.order)
}

const ListElement = ({
  item: { id, field },
  handleFirstNameChange,
  ...props
}) => {
  const { autoFocus, valueContent, label, types, helperText } = props

  const onChange = (e, field) => {
    if (field === "First Name") {
      handleFirstNameChange(e, field)
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
      {console.log("ListElement ITEM IS ", field)}
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
          onChange(e.target.value, field)
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
            valueContent={
              item.field === "First Name"
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
}

export default connect(mapStateToProps, mapDispatchToProps)(FormTextField)
