import React, { Component} from 'react';
import cssModules from 'react-css-modules';
import styles from './TutorList.module.scss';
import { TutorItem } from '../../index'

class TutorList extends Component {
  render() {
    return (
      <div id="tutor_list">
        <div className="box-border">
          {
            [1,2,3,4,5].map(() => {
              return (
                <TutorItem />
              )
            })
          }
        </div>
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
