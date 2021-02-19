import React from 'react';
import './App.css';
import ResultsGrid from './components/ResultsGrid';
import Pagination from './components/Pagination';
import config from './config.js';
class App extends React.Component {
  constructor() {
    super();
    this.state = {
      persons: [],
      isLoading: false,
      employer: '',
      contributor: '',
      pagination: {},
      btnDisabled: true,
    };

    this.submitForm = this.submitForm.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  submitForm(e) {
    e.preventDefault();
    const that = this;
    this.setState({ isLoading: true });
    let baseURL = new URL(
      `https://api.open.fec.gov/v1/schedules/schedule_a/?api_key=${config.key}&contributor_type=individual&per_page=20`
    );
    const params = {
      contributor_employer: this.state.employer,
      contributor_name: this.state.contributor,
    };
    for (const [key, value] of Object.entries(params)) {
      if (value) {
        baseURL.searchParams.append(key, params[key]);
      }
    }
    let url = baseURL;
    //let url = '/json/static.json';
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          persons: data.results,
          isLoading: false,
          pagination: data.pagination,
        });
      });
  }

  handleChange(event) {
    const field = event.target.name;
    const value = event.target.value;

    if (field === 'employer') {
      this.setState({ employer: value });
    } else {
      this.setState({ contributor: value });
    }
    if (this.state.employer || this.state.contributor) {
      this.setState({ btnDisabled: false });
    }
  }

  render() {
    const {
      persons,
      pagination,
      btnDisabled,
      employer,
      contributor,
    } = this.state;
    let showPagination, showResultsGrid;
    if (persons.length > 0) {
      showPagination = <Pagination pagination={pagination}></Pagination>;
      showResultsGrid = <ResultsGrid persons={persons} />;
    }

    return (
      <div className='App'>
        <div>
          Check to see if individuals align with your political views. Search by
          name or by their employer.{' '}
          <p>*An individual does not represent a company's views</p>
        </div>

        <form onSubmit={this.submitForm} className='form-group row'>
          <label htmlFor='employer' className='col-sm-2 col-form-label'>
            Employer
          </label>
          <input
            type='text'
            id='employer'
            name='employer'
            className='form-control col-sm-10'
            value={this.state.employer}
            onChange={this.handleChange}
          />
          <label htmlFor='contributor_name' className='col-sm-2 col-form-label'>
            Contributor Name
          </label>
          <input
            type='text'
            id='contributor_name'
            name='contributor_name'
            className='form-control col-sm-10'
            value={this.state.contributor}
            onChange={this.handleChange}
          />
          <input type='submit' value='Submit' disabled={btnDisabled}></input>
        </form>
        {showResultsGrid}
        {showPagination}
      </div>
    );
  }
}

export default App;
