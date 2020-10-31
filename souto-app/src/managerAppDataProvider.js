import React, { Component } from "react";
import axios from "axios"
import config from "./config"

const ManagerContext = React.createContext();

export class ManagerAppDataProvider extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tickets: []
    };
  }

  componentDidMount = () => {
    this.sync()
  }

  sync = () => {
    axios.get(config.server + "/board/tickets/" + config.boardId)
    .then((response) => {
      this.setState({
        tickets: response.data
      })
    })
    .catch((error) => {
      alert(error)
    })
  }

  newTicket = (ticket, callback) => {
    axios.post(config.server + "/board/tickets/add/" + config.boardId, ticket)
    .then((response) => {
      let newTicket = response.data
      this.setState((prevState) => {
        let tickets = prevState.tickets
        tickets.push(newTicket)
        return {
          tickets: tickets
        }
      }, callback)
    })
    .catch((error) => {
      alert(error)
    })
  }

  updateTicket = (ticket, callback) => {
    axios.post(config.server + "/board/tickets/update", ticket)
    .then(() => {
      callback()
    })
    .catch((error) => {
      alert(error)
    })
  }

  deleteTicketById = (id) => {
    axios.post(config.server + "/tickets/delete/" + id)
    .then(() => {
      this.deleteTicketByIdOffline(id)
    })
    .catch((error) => {
      alert(error)
    })
  }

  deleteTicketByIdOffline = (id) => {
    let tickets = this.state.tickets.filter(item => item.id !== id)
    this.setState({
      tickets: tickets
    })
  }

  render() {
    return (
      <ManagerContext.Provider
        value={{ state: this.state, deleteTicket: this.deleteTicketById, updateTicket: this.updateTicket, newTicket: this.newTicket }}
      >
        {this.props.children}
      </ManagerContext.Provider>
    );
  }
}

export default ManagerContext;
