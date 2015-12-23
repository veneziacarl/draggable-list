import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import { ItemTypes } from './ItemTypes';
import { DragSource, DropTarget } from 'react-dnd'
import { colors } from './colors'
import flow from 'lodash/function/flow'

const propTypes = {
  id: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
  isDragging: PropTypes.bool.isRequired,
  connectDragSource: PropTypes.func.isRequired,
  moveCard: PropTypes.func.isRequired,
}

const cardSource = {
  beginDrag(props) {
    return { id: props.id, index: props.index }
  }
}

const cardTarget = {
  hover(props, monitor, component) {
    const dragIndex = monitor.getItem().index;
    const hoverIndex = props.index;

    if (dragIndex === hoverIndex) {
      return
    }

    const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();
    const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

    const clientOffset = monitor.getClientOffset();
    const hoverClientY = clientOffset.y - hoverBoundingRect.top;

    if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
      return;
    }

    if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
      return;
    }

    // props.moveCard
    props.moveCard(dragIndex, hoverIndex);
    monitor.getItem().index = hoverIndex;
  }
}

const collectSource = (connect, monitor) => {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }
}

const collectTarget = (connect) => {
  return {
    connectDropTarget: connect.dropTarget()
  }
}

class Card extends Component {
  render() {
    const {
      id,
      text,
      isDragging,
      connectDragSource,
      connectDropTarget
    } = this.props;
    const styles = {
      cursor: 'move',
      opacity: isDragging ? 0.5 : 1,
      padding: '10',
      background: 'white',
      margin: '2%',
    }

    return connectDragSource(connectDropTarget(
      <li style={styles} key={id}>
        <span style={{color: colors.lightGray}}>{text}</span>
      </li>
    ))
  }
}

Card.propTypes = propTypes;
export default flow(
  DragSource(ItemTypes.CARD, cardSource, collectSource),
  DropTarget(ItemTypes.CARD, cardTarget, collectTarget)
)(Card);
