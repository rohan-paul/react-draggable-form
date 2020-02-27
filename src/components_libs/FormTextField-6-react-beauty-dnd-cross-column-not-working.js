import React from "react"
import { connect } from "react-redux"
import PropTypes from "prop-types"
import { withStyles } from "@material-ui/core"
import TextField from "@material-ui/core/TextField"
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"
import Button from "@material-ui/core/Button"

const renderTextField = props => {
  const { classes } = props
  const {
    autoFocus,
    valueContent,
    label,
    types,
    onChange,
    helperText,
    id,
  } = props
  return (
    <>
      <div>{id}</div>
      <TextField
        required
        autoFocus={autoFocus}
        multiline={label === "Description of Field" ? true : undefined}
        // classes={{
        //   root: classes.space,
        // }}
        value={valueContent || ""}
        onChange={e => onChange(e.target.value)}
        helperText={helperText}
        label={label}
        type={types}
        fullWidth
        // InputProps={{
        //   classes: {
        //     underline: classes.underline,
        //   },
        // }}
      />
    </>
  )
}

const styles = theme => ({
  root: {
    width: "100%",
    background: "linear-gradient(45deg, #B5D3E7 30%, #FF8E53 90%)",
    marginTop: theme.spacing(10),
    backgroundColor: "#E0E0E0",
  },
  space: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(3),
    backgroundColor: "#fff",
    borderRadius: "5px",
    minWidth: "450px",
  },
  underline: {
    "&:after": {
      borderBottomColor: "rgb(70, 197, 29)",
      borderWidth: "1px",
    },
  },
})

const getItems = count =>
  Array.from({ length: count }, (v, k) => k).map(k => ({
    id: `item-${k}`,
    content: renderTextField({ id: `item-${k}` }),
  }))

const grid = 8

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,

  // change background colour if dragging
  background: isDragging ? "lightgreen" : "#B5D3E7",

  // styles we need to apply on draggables
  ...draggableStyle,
})

const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? "lightblue" : "grey",
  padding: 2,
  width: 500,
})

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list)
  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)
  return result
}

class FormTextField extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      items: getItems(4),
    }
  }

  onDragEnd = result => {
    console.log("ON Drop result", result)
    // dropped outside the list
    if (!result.destination) {
      return
    }

    const items = reorder(
      this.state.items,
      result.source.index,
      result.destination.index,
    )

    this.setState({
      items,
    })
  }
  render() {
    const list1 = this.state.items.slice(0, 2)
    const list2 = this.state.items.slice(2, 4)
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <Button style={{ marginBottom: "50px" }}>Drop here to delete</Button>
        {console.log("ITEM STATE ", this.state.items)}
        <Droppable droppableId="droppable">
          {(droppableProvided, droppableSnapshot) => (
            <div style={{ display: "flex", flexDirection: "row" }}>
              <div
                ref={droppableProvided.innerRef}
                style={getListStyle(droppableSnapshot.isDraggingOver)}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                  }}
                >
                  <div style={{ marginRight: "20px" }}>
                    {list1.map((item, index) => (
                      <Draggable
                        key={item.id}
                        draggableId={item.id}
                        index={index}
                      >
                        {(draggableProvided, draggableSnapshot) => (
                          <div
                            ref={draggableProvided.innerRef}
                            {...draggableProvided.draggableProps}
                            {...draggableProvided.dragHandleProps}
                            style={getItemStyle(
                              draggableSnapshot.isDragging,
                              draggableProvided.draggableProps.style,
                            )}
                          >
                            {item.content}
                          </div>
                        )}
                      </Draggable>
                    ))}
                  </div>
                  <div>
                    {list2.map((item, index) => (
                      <Draggable
                        key={item.id}
                        draggableId={item.id}
                        index={index}
                      >
                        {(draggableProvided, draggableSnapshot) => (
                          <div
                            ref={draggableProvided.innerRef}
                            {...draggableProvided.draggableProps}
                            {...draggableProvided.dragHandleProps}
                            style={getItemStyle(
                              draggableSnapshot.isDragging,
                              draggableProvided.draggableProps.style,
                            )}
                          >
                            {item.content}
                          </div>
                        )}
                      </Draggable>
                    ))}
                  </div>
                </div>

                {droppableProvided.placeholder}
              </div>

              {/* <div
                ref={droppableProvided.innerRef}
                style={getListStyle(droppableSnapshot.isDraggingOver)}
              >
                {this.state.items.slice(2).map((item, index) => (
                  <Draggable key={item.id} draggableId={item.id} index={index}>
                    {(draggableProvided, draggableSnapshot) => (
                      <div
                        ref={draggableProvided.innerRef}
                        {...draggableProvided.draggableProps}
                        {...draggableProvided.dragHandleProps}
                        style={getItemStyle(
                          draggableSnapshot.isDragging,
                          draggableProvided.draggableProps.style,
                        )}
                      >
                        {item.content}
                      </div>
                    )}
                  </Draggable>
                ))}
                {droppableProvided.placeholder}
              </div> */}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    )
  }
}

FormTextField.propTypes = {
  autoFocus: PropTypes.bool,
  onChange: PropTypes.func,
  helperText: PropTypes.string,
  label: PropTypes.string,
  valueContent: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
}

export default withStyles(styles)(FormTextField)
