import {Component} from 'react'

import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {BsSearch} from 'react-icons/bs'

import ProfileDetails from '../ProfileDetails'
import JobsList from '../JobsList'

import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  inProgress: 'IN_PROGRESS',
  failure: 'FAILURE',
  jobsNotFound: 'JOBSNOTFOUND',
}

class JobCard extends Component {
  state = {
    jobDetailsList: [],
    apiStatus: apiStatusConstants.initial,
    searchValue: '',
    employmentSort: [],
    salaryRange: [],
  }

  componentDidMount() {
    this.getJobDetailsList()
  }

  getJobDetailsList = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})

    const {salaryRange, employmentSort, searchValue} = this.state
    console.log(searchValue)

    const jwtToken = Cookies.get('jwt_token')

    const apiUrl = `https://apis.ccbp.in/jobs?employment_type=${employmentSort.join()}&minimum_package=${salaryRange.join()}&search=${searchValue}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    const fetchedData = await response.json()
    console.log(fetchedData)
    if (response.ok === true) {
      const updatedData = fetchedData.jobs.map(eachData => ({
        companyLogoUrl: eachData.company_logo_url,
        employmentType: eachData.employment_type,
        id: eachData.id,
        jobDescription: eachData.job_description,
        location: eachData.location,
        packagePerAnnum: eachData.package_per_annum,
        rating: eachData.rating,
        title: eachData.title,
      }))
      this.setState({
        apiStatus: apiStatusConstants.success,
        jobDetailsList: updatedData,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
    if (fetchedData.jobs.length === 0) {
      this.setState({apiStatus: apiStatusConstants.jobsNotFound})
    }
  }

  renderLoaderView = () => (
    <div className="loader-container" testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  onChangeInput = event => {
    this.setState({searchValue: event.target.value})
  }

  onEnterKey = event => {
    if (event.key === 'Enter') {
      this.getJobDetailsList()
      this.setState({searchValue: ''})
    }
  }

  onClickMagnifier = () => {
    this.getJobDetailsList()
    this.setState({searchValue: ''})
  }

  renderSuccessView = () => {
    const {jobDetailsList, searchValue} = this.state

    return (
      <>
        <div className="search-container">
          <input
            type="search"
            className="search"
            placeholder="Search"
            value={searchValue}
            onChange={this.onChangeInput}
            onKeyDown={this.onEnterKey}
          />
          <button
            type="button"
            className="magnifier-container"
            testid="searchButton"
            onClick={this.onClickMagnifier}
          >
            <BsSearch className="magnifier-icon" />
          </button>
        </div>
        <ul className="jobs-list-container">
          {jobDetailsList.map(eachJob => (
            <JobsList key={eachJob.id} jobDetails={eachJob} />
          ))}
        </ul>
      </>
    )
  }

  onClickRetry = () => {
    this.getJobDetailsList()
  }

  renderFailureView = () => (
    <div className="jobs-failure-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="jobs-failure-view-image"
      />
      <h1 className="jobs-failure-heading">Oops! Something Went Wrong</h1>
      <p className="jobs-failure-description">
        We cannot seem to find the page you are looking for.
      </p>
      <button
        type="button"
        className="retry-button"
        onClick={this.onClickRetry}
      >
        Retry
      </button>
    </div>
  )

  renderJobsNotFoundView = () => (
    <div className="jobs-not-found-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
        alt="no jobs"
        className="no-jobs-image"
      />
      <h1 className="no-jobs-found-heading">No Jobs Found</h1>
      <p className="no-jobs-found-description">
        We could not find any jobs. Try other filters
      </p>
    </div>
  )

  renderAllViews = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.inProgress:
        return this.renderLoaderView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.jobsNotFound:
        return this.renderJobsNotFoundView()
      default:
        return null
    }
  }

  onClickEmploymentSort = event => {
    const newSort = event.target.value
    this.setState(
      prevState => ({
        employmentSort: [...prevState.employmentSort, newSort],
      }),
      this.getJobDetailsList,
    )
  }

  renderSortEmployment = () => (
    <div className="employee-type-container">
      <h1 className="filter-heading">Type of Employment</h1>
      <ul className="employment-list-container">
        {employmentTypesList.map(eachData => (
          <li className="employment-list" key={eachData.employmentTypeId}>
            <input
              type="checkbox"
              id={eachData.employmentTypeId}
              value={eachData.employmentTypeId}
              className="checkbox-element"
              onClick={this.onClickEmploymentSort}
            />
            <label htmlFor={eachData.employmentTypeId} className="label-sort">
              {eachData.label}
            </label>
          </li>
        ))}
      </ul>
    </div>
  )

  onClickSalaryRange = event => {
    const newSalary = event.target.value
    this.setState(
      prevState => ({
        salaryRange: [...prevState.salaryRange, newSalary],
      }),
      this.getJobDetailsList,
    )
  }

  renderSalaryRange = () => (
    <div className="salary-container">
      <h1 className="filter-heading">Salary Range</h1>
      <ul className="salary-list-container">
        {salaryRangesList.map(eachData => (
          <li key={eachData.salaryRangeId} className="salary-list">
            <input
              type="radio"
              id={eachData.salaryRangeId}
              name={eachData.salaryRangeId}
              value={eachData.salaryRangeId}
              className="radio-input"
              onClick={this.onClickSalaryRange}
            />
            <label htmlFor={eachData.salaryRangeId} className="label-sort">
              {eachData.label}
            </label>
          </li>
        ))}
      </ul>
    </div>
  )

  renderSearchBar = () => {
    const {searchValue} = this.state

    return (
      <div className="mobile-search-container">
        <input
          type="search"
          className="mobile-search"
          placeholder="Search"
          value={searchValue}
          onChange={this.onChangeInput}
          onKeyDown={this.onEnterKey}
        />
        <button
          type="button"
          className="mobile-magnifier-container"
          testid="searchButton"
          onClick={this.onClickMagnifier}
        >
          <BsSearch className="mobile-magnifier-icon" />
        </button>
      </div>
    )
  }

  render() {
    return (
      <>
        <div className="profile-and-filter-container">
          {this.renderSearchBar()}
          <ProfileDetails />
          <hr className="horizontal-line" />
          {this.renderSortEmployment()}
          <hr className="horizontal-line" />
          {this.renderSalaryRange()}
        </div>
        <div className="job-container">{this.renderAllViews()}</div>
      </>
    )
  }
}

export default JobCard
