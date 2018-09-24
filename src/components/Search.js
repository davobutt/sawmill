import React, { Component } from 'react'
import { FormControl, FormGroup, Button } from 'react-bootstrap'

class Search extends Component {
  constructor (props) {
    super(props)
    this.state = {term: ''}
    this.performSearch = this.performSearch.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  render () {
    return (
      <React.Fragment>
        <form onSubmit={e => this.performSearch(e)}>
          <FormGroup >
            <FormControl type='text' placeholder='Search' value={this.state.term} onChange={this.handleChange} />
          </FormGroup>{' '}
          <Button type='submit'>Search</Button>
        </form>
      </React.Fragment>
    )
  }

  handleChange (event) {
    this.setState({term: event.target.value})
  }

  performSearch (event) {
    event.preventDefault()
    fetch(`/api/search?q=${this.state.term}`)
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
}

export default Search
