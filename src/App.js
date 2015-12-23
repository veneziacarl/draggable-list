import React, { Component } from 'react';
import Container from './Container'
import { colors } from './colors'

export class App extends Component {
  render() {
    const styles = {
      width: '600',
      margin: '0 auto',
      background: colors.lightGray,
      padding: '20',
      border: '1px solid ' + colors.darkGray,
      boxSizing: 'border-box',
      marginTop: '20px'
    }

    return (
      <div style={styles}>
        <h1 style={{color: 'white', textAlign: 'center'}}> Draggable List Items!</h1>
        <Container />
      </div>
    );
  }
}
