import React from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import Card from './Card'

const styles = {
  ul: {
    listStyle: 'none',
    padding: '0',
  },
  input: {
    color: 'black',
    padding: '10px',
    margin: '0 auto',
    display: 'block',
    width: '80%',
    margin: '2% auto',
  }
}
class Container extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      cards: [
        {id: 1, text: 'Learn React'},
        {id: 2, text: 'Eat food'},
      ],
      currentCard: 'Add an item...'
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.moveCard = this.moveCard.bind(this)
  }

  handleChange(e) {
    this.setState({ currentCard: e.target.value })
  }

  handleSubmit(e) {
    if (e.keyCode == 13) {
      const { cards, currentCard } = this.state;
      const currentMax = Math.max(...cards.map(card => card.id))
      const nextId = currentMax + 1;

      const newCard = {
        id: nextId,
        text: currentCard
      }
      this.setState({
        currentCard: null,
        cards: [...cards, newCard],
      })
    }
  }

  moveCard(dragIndex, hoverIndex) {
    const { cards } = this.state;
    const dragCard = cards[dragIndex];

    cards.splice(dragIndex, 1)
    cards.splice(hoverIndex, 0, dragCard)
    this.setState({ cards: cards});
  }

  render() {
    const { cards, currentCard } = this.state;
    const renderCards = cards.map((card, i) => {
       return (
         <Card
          key={card.id}
          index={i}
          moveCard={this.moveCard}
          {...card}
        />
       )
    });

    return (
      <div style={{width: '100%', display: 'block'}}>
        <input
          style={styles.input}
          type="text"
          onKeyDown={this.handleSubmit}
          onChange={this.handleChange}
          onFocus={() => this.setState({currentCard: null})}
          onBlur={() => this.setState({currentCard: 'Add an item...'})}
          value={currentCard}
        />
        <ul style={styles.ul}>
          {renderCards}
        </ul>
      </div>
    )
  }
}

export default DragDropContext(HTML5Backend)(Container);
