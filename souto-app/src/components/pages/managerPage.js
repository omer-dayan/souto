import React, { Component } from 'react'
import ManagerContext from '../../managerAppDataProvider'
import Ticket from '../ticket'
import ManagerTools from '../managerTools'
import FlipMove from 'react-flip-move'
import Menu from '../menu'
import { Typography } from '@material-ui/core'
import EmptyBoard from '../../resources/board-empty.png'

const styles = {
  ticketsHolder: {
    position: 'absolute',
    height: '85vh',
    overflow: 'auto',
    bottom: '0px',
    display: 'inline-block',
    width: '-webkit-fill-available',
  },
  emptyBoardHolder: {
    textAlign: 'center',
  },
  emptyBoardImage: {
    height: '60vh',
    opacity: '15%',
  },
  emptyBoardText: {
    color: '#464646',
  },
}

export default class ManagerPage extends Component {
  renderTickets = (ctx) => {
    return (
      <FlipMove
        typeName={null}
        maintainContainerHeight={true}
        duration={100}
        staggerDurationBy={50}
      >
        {ctx.state.tickets.map((ticket) => {
          return (
            <Ticket
              key={ticket.id}
              info={ticket}
              isManager={true}
              delete={ctx.deleteTicket}
              update={ctx.updateTicket}
            />
          )
        })}
      </FlipMove>
    )
  }

  render() {
    return (
      <div>
        <ManagerContext.Consumer>
          {(ctx) => {
            return (
              <div>
                <Menu isManager={true} title={ctx.state.board.name} />
                <ManagerTools addTicket={ctx.newTicket} />
                <div style={styles.ticketsHolder}>
                  {ctx.state.tickets.length === 0 ? (
                    <div style={styles.emptyBoardHolder}>
                      <img
                        src={EmptyBoard}
                        style={styles.emptyBoardImage}
                        alt="empty board"
                      />
                      <Typography variant="h5" style={styles.emptyBoardText}>
                        Add tickets to your board!
                      </Typography>
                    </div>
                  ) : (
                    this.renderTickets(ctx)
                  )}
                </div>
              </div>
            )
          }}
        </ManagerContext.Consumer>
      </div>
    )
  }
}
