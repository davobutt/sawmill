import React, { Component } from 'react'
import { Table } from 'react-bootstrap'
import moment from 'moment'

const ResultRow = (result, selectResultAction, getAllEvents) => (
  <tr key={result.groupKey}>
    <td>{moment(result.date).format('hh:mm:ss MM-DD')}</td>
    <td title={result.groupBy + ':' + result.groupKey}>{result.groupKey.slice(0, 5)}...</td>
    <td onClick={selectResultAction}><a href={null} className='badge badge-primary'>{result.events.length}{result.partial ? ' / ?' : ''}</a></td>
    <td onClick={getAllEvents}><i className='fas fa-search-plus' />+</td>
    <td onClick={selectResultAction}><a href={null}><i className='far fa-arrow-alt-circle-right' />?</a></td>
  </tr>
)

class Results extends Component {
  constructor (props) {
    super(props)
    this.getAllEvents = this.getAllEvents.bind(this)
  }

  getAllEvents (result) {
    console.log('get all for ' + result.groupKey)
    fetch(`/api/search?q=json.${result.groupBy}:"${result.groupKey}"`)
      .then(res => res.json())
      .then(
        (result) => {
          this.props.onResults(result)
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          })
        }
      )
  }

  render () {
    const search = this.props.search || {results: []}
    console.log(search)
    const selectResultAction = (result) => () => this.props.selectResultAction(result)

    return (
      <React.Fragment>
        <h4>{ search.term } <span className='label label-danger'>{ search.fromCache ? 'From Cache' : ''}</span></h4>
        <Table striped condensed hover>
          <thead>
            <tr>
              <th>Date</th>
              <th>Ref</th>
              <th>Events</th>
              <th />
              <th />
            </tr>
          </thead>
          <tbody>
            { search.results.map(result => ResultRow(result, selectResultAction(result), () => this.getAllEvents(result)))}
          </tbody>
        </Table>
      </React.Fragment>
    )
  }
}

export default Results
