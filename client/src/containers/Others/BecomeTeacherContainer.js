import React, { Component } from 'react';
import { TT } from 'utils/locale';
import './BeComeTeacher.scss';
import { Link } from 'react-router-dom';
import PrimaryButton from '../../components/Core/PrimaryButton/PrimaryButton';

class BecomeTeacherContainer extends Component {
  render() {
    return (
      <div className="become-teacher">
        <BecomeTeacherBanner />
        <BecomeTeacherIntroduction />
        <BecomeTeacherReasons />
        <BecomeTeacherButton />
      </div>
    );
  }
}

BecomeTeacherContainer.contextTypes = {
  t: React.PropTypes.func.isRequired
};

const BecomeTeacherBanner = () => {
  return (
    <div className="become-teacher-banner">
      <div className="container">
        <div className="become-teacher-banner__text">
          <h1>{TT.t('become-a-teacher')}</h1>
          <h4>{TT.t('become-a-teacher-short-description')}</h4>
        </div>
      </div>
    </div>
  );
};

const BecomeTeacherIntroduction = () => {
  const beComeTeacherIntro = TT.t('become-a-teacher-introduction');
  return (
    <div className="become-teacher-introduction">
      <div className="become-teacher-introduction__picture">
        <img src={beComeTeacherIntro.picture} />
      </div>
      <div className="become-teacher-introduction__text">
        <h4>{beComeTeacherIntro.title}</h4>
        <p>{beComeTeacherIntro.description}</p>
      </div>
    </div>
  );
};

const BecomeTeacherReasons = () => {
  const beComeTeacherReasons = TT.t('become-a-teacher-reasons');
  return (
    <div className="become-teacher-reason">
      <h2>{beComeTeacherReasons.title}</h2>
      <div className="become-teacher-reason__items">
        {beComeTeacherReasons.reasons.map((reason, index) => (
          <div className="become-teacher-reason__item" key={`reason-become-${index}`}>
            <div className="become-teacher-reason__item__picture">
              <img src={reason.picture} />
            </div>
            <div className="become-teacher-reason__item__text">
              <h4>{reason.title}</h4>
              <p>{reason.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const BecomeTeacherButton = () => {
  return (
    <div className="d-flex align-items-center justify-content-center">
      <Link to="/register" className="mt-4 mb-50">
        <PrimaryButton type="button" isPrimary round line={false} title={TT.t('homepage_search_become_teacher')} />
      </Link>
    </div>
  );
};

export default BecomeTeacherContainer;
