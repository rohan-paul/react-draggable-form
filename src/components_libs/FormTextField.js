import React from "react"
import { ListManager } from "react-beautiful-dnd-grid"
import TextField from "@material-ui/core/TextField"

const list = [
  {
    id: "0",
    order: 0,
  },
  {
    id: "1",
    order: 1,
  },
  {
    id: "2",
    order: 2,
  },
  {
    id: "3",
    order: 3,
  },
  {
    id: "4",
    order: 4,
  },
  {
    id: "5",
    order: 5,
  },
  {
    id: "6",
    order: 6,
  },
  {
    id: "7",
    order: 7,
  },
]

const sortList = list => {
  return list.slice().sort((first, second) => first.order - second.order)
}

const ListElement = ({ item: { id } }, ...props) => {
  const { autoFocus, valueContent, label, types, onChange, helperText } = props
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
        onChange={e => onChange(e.target.value)}
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

  sortList = () => {
    this.setState({
      ...this.state,
      sortedList: sortList(this.state.sortedList),
    })
  }

  reorderList = (sourceIndex, destinationIndex) => {
    if (destinationIndex === sourceIndex) {
      return
    }
    const list = this.state.sortedList
    if (destinationIndex === 0) {
      list[sourceIndex].order = list[0].order - 1
      this.sortList()
      return
    }
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
      <ListManager
        items={this.state.sortedList}
        direction="horizontal"
        maxItems={2}
        render={item => <ListElement item={item} />}
        onDragEnd={this.reorderList}
      />
    </div>
  )
}

export default FormTextField
