import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import update from 'immutability-helper';
import './App.css';

import Navbar from './components/Navbar';
import Play from './containers/Play';
import Rules from './containers/Rules';
import Decks from './containers/Decks';
import DeckCollection from './helpers/DeckCollection';
import ConfirmBox from './components/ConfirmBox';
import { decks } from './helpers/DeckList';

import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faEdit,
  faMugHot,
  faLongArrowAltLeft,
  faInfoCircle,
  faEllipsisV,
  faListUl,
  faTrash
} from '@fortawesome/free-solid-svg-icons';

library.add(faEdit);
library.add(faMugHot);
library.add(faLongArrowAltLeft);
library.add(faInfoCircle);
library.add(faEllipsisV);
library.add(faListUl);
library.add(faTrash);

/**
 * @author Victor Heringer
 * 
 * Hold all functions and a 'global state' since this is a tiny application
 */
class App extends Component {

  /**
   * App state
   * 
   * @param {Object}
   */
  state = { 
    decks: [], 
    current: {}, 
    showModal: false, 
    messageModal: '',
    confirmModal: undefined, 
    titleModal: '' 
  };

  /**
   * @author Victor Heringer
   * 
   * Lifecycle method to set some initial states
   */
  componentWillMount() {
    const decks = DeckCollection.all();
    this.setState({ decks: decks, current: decks[0] });
  }

  /**
   * @author Victor Heringer
   * 
   * Add a deck to state and local storage
   * 
   * @param {Object} deck 
   */
  pushDeck(deck) {

  }

  /**
   * @author Victor Heringer
   * 
   * Updates a deck at state and local storage
   * 
   * @param {Object} deck 
   */
  putDeck(deck) {

  }

  /**
   * @author Victor Heringer
   * 
   * Removes a deck from state and local storage
   * 
   * @param {Object} deck 
   */
  deleteDeck(deck) {
  
  }

  handleConfirmBoxResetDeck = () => {
    const toUpdate = {
      showModal: { $set: !this.state.showModal },
      titleModal: { $set: "Resetar decks" },
      messageModal: { $set: "Esta ação não poderá ser desfeita." },
      confirmModal: { $set: this.resetDecks }
    };
    this.setState(update(this.state, toUpdate));
  }

  /**
   * @author Victor Heringer
   * 
   * Restore default values at state and local storage
   * 
   * @param {Object} deck 
   */
  resetDecks = () => {
    console.log( 'reset' );
    DeckCollection.put(decks);
    this.setState(update(this.state, { 
      decks: { $set: decks },
      showModal: { $set: !this.state.showModal }
    }));
  }

  cancelModal = () => {
    console.log( 'cancel' );
    this.setState(update(this.state, { showModal: { $set: false } }));
  }

  /**
   * @author Victor Heringer
   * 
   * Renders the play container
   */
  renderPlay = () => <Play 
    {...this.state} 
  />;

  /**
   * @author Victor Heringer
   * 
   * Renders the decks container
   */
  renderDecks = () => <Decks
    handleConfirmBoxResetDeck={this.handleConfirmBoxResetDeck}
    {...this.state}
  />;

  render() {
    return (
      <React.Fragment>
        <Router>
          <div>
            <Navbar />
            <div className='app'>
              <Route path="/" exact render={this.renderPlay} />
              <Route path="/rules" exact component={Rules} />
              <Route path="/decks" exact render={this.renderDecks} />
              <ConfirmBox
                title={this.state.titleModal}
                message={this.state.messageModal} 
                show={this.state.showModal} 
                onCancel={this.cancelModal}
                onConfirm={this.state.confirmModal}
              />
            </div>
          </div>
        </Router>
      </React.Fragment>
    );
  }
}

export default App;
