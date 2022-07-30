import {Component} from 'react'

import Header from '../Header'
import JobCard from '../JobCard'

import './index.css'

class Jobs extends Component {
  render() {
    return (
      <>
        <Header />
        <div className="jobs-bg-container">
          <JobCard />
        </div>
      </>
    )
  }
}

export default Jobs
