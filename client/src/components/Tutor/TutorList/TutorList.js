import React, { Component} from 'react';
import cssModules from 'react-css-modules';
import styles from './TutorList.module.scss';
import { TutorItem } from '../../index'

class TutorList extends Component {
  render() {
    const {teachers} = this.props;
    return (
      <div className="row">
        {
          teachers.map((tutor) => {
            return (
              <div className="col-md-3 col-sm-6" key={tutor.id}>
                <TutorItem tutor={tutor}/>
              </div>
            )
          })
        }
      </div>
    )
  }
}

TutorList.contextTypes = {
  t: React.PropTypes.func.isRequired
}

TutorList.propTypes = {
};

export default cssModules(TutorList, styles);
