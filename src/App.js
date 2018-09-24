import React, { Component } from 'react'
import './App.css'
import Search from './components/Search.js'
import Results from './components/Results.js'
import { Navbar, Grid, Row, Col, Table } from 'react-bootstrap'
import { connect } from 'react-redux'
import { resultAction } from './actions/resultAction'
import { selectResultAction } from './actions/selectResultAction'
import { getAllEventsAction } from './actions/getAllEventsAction'
import ReactJson from 'react-json-view'
import _ from 'lodash'
import moment from 'moment'

const mapStateToProps = state => ({
  ...state
})

const mapDispatchToProps = dispatch => ({
  resultAction: (result) => dispatch(resultAction(result)),
  selectResultAction: (result) => dispatch(selectResultAction(result)),
  getAllEventsAction: (result) => dispatch(getAllEventsAction(result))
})

const Tag = (type, value) => {
  if (value) {
    return (
      <span className={`label label-default label-${type}-${value}`}>{value}</span>
    )
  }
}

const getTags = (event) => {
  let tags = []
  tags.push(Tag('app', _.get(event, 'event.syslog.appName')))
  tags.push(Tag('type', _.get(event, 'event.json.type')))
  tags.push(Tag('request', _.get(event, 'event.json.header.path')))
  const logTag = eventLogTagger(_.get(event, 'event.json.log'))
  if (logTag) {
    tags.push(Tag('log', logTag))
  }
  return tags
}

const eventLogTagger = (log) => {
  if (/request=/g.test(log)) {
    return 'chips'
  }
  return '?'
}

const EventRow = ({event}) => {
  return (
    <tr key={event.id}>
      <td className='small'>{moment(event.timestamp).format('hh:mm:ss MM-DD')}</td>
      <td class='align-top'>{getTags(event)}</td>

      <td><ReactJson enableClipboard={false} collapsed src={event} name={false} /></td>
    </tr>
  )
}

const EventView = ({selectedResult}) => {
  if (selectedResult) {
    return (
      <React.Fragment>
        <h4>{selectedResult.partial ? 'Partial result for' : 'Result for'} <span class='small'>{selectedResult.groupBy} {selectedResult.groupKey}</span> <span class='badge'>{selectedResult.events.length}</span></h4>
        <Table striped condensed hover>
          <thead>
            <tr>
              <th>Timestamp</th>
              <th>Tags</th>
              <th>Json</th>
            </tr>
          </thead>
          <tbody>
            { selectedResult.events.map(event => EventRow({event}))}
          </tbody>
        </Table>
      </React.Fragment>
    )
  }
  return null
}

class App extends Component {
  render () {
    return (
      <div className='container-full'>
        <Navbar>
          <Navbar.Header>
            <Navbar.Brand>
              <a href='#home'>Sawmill</a>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Navbar.Form pullLeft>
              <Search onResults={this.props.resultAction} />
            </Navbar.Form>
            <a href='/api/clear'>clear cache</a>
          </Navbar.Collapse>
        </Navbar>

        <Grid className='container-full'>

          <Row>
            <Col xs={3}>
              <Results
                search={this.props.results.search}
                selectResultAction={this.props.selectResultAction}
                onResults={this.props.getAllEventsAction} />
            </Col>
            <Col xs={9}>
              <EventView
                selectedResult={this.props.results.selectedResult} />
            </Col>
          </Row>
        </Grid>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
