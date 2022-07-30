import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import {BsBriefcaseFill} from 'react-icons/bs'

import './index.css'

const SimilarJob = props => {
  const {jobDetails} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    rating,
    title,
  } = jobDetails

  return (
    <li className="similar-list">
      <div className="company-image-job-role-rating-container">
        <img
          src={companyLogoUrl}
          alt="similar job company logo"
          className="company-logo"
        />
        <div className="job-role-and-rating-container">
          <h1 className="job-title">{title}</h1>
          <div className="star-and-rating-container">
            <AiFillStar className="star-icon" />
            <p className="rating">{rating}</p>
          </div>
        </div>
      </div>
      <h1 className="description-heading">Description</h1>
      <p className="job-description">{jobDescription}</p>
      <div className="location-employment-package-container-similar">
        <div className="location-employment-container">
          <div className="location-container">
            <MdLocationOn className="location-icon" />
            <p className="location-name">{location}</p>
          </div>
          <div className="employment-type-container">
            <BsBriefcaseFill className="briefcase-icon" />
            <p className="employment-name">{employmentType}</p>
          </div>
        </div>
      </div>
    </li>
  )
}

export default SimilarJob
