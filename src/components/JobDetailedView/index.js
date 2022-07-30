import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import {BsBriefcaseFill, BsBoxArrowUpRight} from 'react-icons/bs'

import './index.css'

const JobDetailedView = props => {
  const {jobItemList} = props
  const {
    companyLogoUrl,
    companyWebsiteUrl,
    employmentType,
    jobDescription,
    lifeAtCompany,
    location,
    rating,
    packagePerAnnum,
    title,
    skills,
  } = jobItemList

  console.log(companyWebsiteUrl)

  return (
    <li className="list-container">
      <div className="company-image-job-role-rating-container">
        <img
          src={companyLogoUrl}
          alt="job details company logo"
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
      <div className="location-employment-package-container">
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
        <p className="package">{packagePerAnnum}</p>
      </div>
      <div className="description-and-visit-container">
        <h1 className="description-heading-detailed">Description</h1>
        <a href={companyWebsiteUrl} className="url-link">
          <p className="visit">Visit</p>
          <BsBoxArrowUpRight className="popup-icon" />
        </a>
      </div>
      <p className="job-description-detailed">{jobDescription}</p>
      <h1 className="skills">Skills</h1>
      <ul className="skill-list-container">
        {skills.map(eachSkill => (
          <li className="skill-list" key={eachSkill.name}>
            <img
              src={eachSkill.imageUrl}
              alt={eachSkill.name}
              className="skill-image"
            />
            <p className="skill-name">{eachSkill.name}</p>
          </li>
        ))}
      </ul>
      <h1 className="lift-at-company-heading">Life at Company</h1>
      <div className="life-at-company-container">
        <p className="life-at-company-description">
          {lifeAtCompany.description}
        </p>
        <img
          src={lifeAtCompany.imageUrl}
          alt="life at company"
          className="life-at-company-image"
        />
      </div>
    </li>
  )
}

export default JobDetailedView
