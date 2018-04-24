import * as React from "react";
import {Component} from "react";
import TutorEducationItem from "./TutorEducationItem";

class TutorEducationList extends Component {
  render() {
    let educations = [{
      id: 1,
      title: 'computer science',
      graduated_from: 'Dai hoc Bach Khoa HCM',
      start_date: '10/2010',
      end_date: '11/2015',
      description: 'tot nghiep dai hoc loai gioi, hoc lop ky su tai nang .....'
    },
    {
      id: 2,
      title: 'computer science',
      graduated_from: 'Dai hoc Bach Khoa HCM',
      start_date: '10/2010',
      end_date: '11/2015',
      description: 'tot nghiep dai hoc loai gioi, hoc lop ky su tai nang .....'
    }
    ]

    return (
      <div className="row user-detail">
        <div className="col-md-12 col-sm-12">
          <div className="block-title">
            <span className="text-uppercase bold">{this.context.t("account.tutot.edu.level.title")}</span>
            <div className='clearfix'></div>
          </div>
          <div>
            {
              educations.map(e => (
                <div key={e.id} className='mb-20'>
                  <TutorEducationItem education={e}/>
                </div>
              ))
            }
          </div>
        </div>
      </div>
    )
  }
}

TutorEducationList.contextTypes = {
  t: React.PropTypes.func.isRequired
}

TutorEducationList.propTypes = {
  educations: React.PropTypes.array.isRequired
}

export default TutorEducationList