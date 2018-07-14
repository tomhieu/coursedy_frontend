import {Component} from "react";
import * as React from "react";
import {Field} from "redux-form";
import cssModules from 'react-css-modules';
import styles from './RatingSelection.module.scss';

class RatingSelection extends Component {
  render() {
    return (
      <div className="rating-wrapper">
        <div className="rating-item">
          <fieldset className={styles.rating}>
            <Field type="radio" component="input" id="star5" name="rating" value="5" /><label className="full" htmlFor="star5" title="Awesome - 5 stars"></label>
            <Field type="radio" component="input" id="star4half" name="rating" value="4 and a half" /><label className={styles.half} htmlFor="star4half" title="Pretty good - 4.5 stars"></label>
            <Field type="radio" component="input" id="star4" name="rating" value="4" /><label className="full" htmlFor="star4" title="Pretty good - 4 stars"></label>
            <Field type="radio" component="input" id="star3half" name="rating" value="3 and a half" /><label className={styles.half} htmlFor="star3half" title="Good - 3.5 stars"></label>
            <Field type="radio" component="input" id="star3" name="rating" value="3" /><label className="full" htmlFor="star3" title="Meh - 3 stars"></label>
            <Field type="radio" component="input" id="star2half" name="rating" value="2 and a half" /><label className={styles.half} htmlFor="star2half" title="Not Good - 2.5 stars"></label>
            <Field type="radio" component="input" id="star2" name="rating" value="2" /><label className="full" htmlFor="star2" title="Kinda bad - 2 stars"></label>
            <Field type="radio" component="input" id="star1half" name="rating" value="1 and a half" /><label className={styles.half} htmlFor="star1half" title="Bad - 1.5 stars"></label>
            <Field type="radio" component="input" id="star1" name="rating" value="1" /><label className="full" htmlFor="star1" title="Sucks big time - 1 star"></label>
            <Field type="radio" component="input" id="starhalf" name="rating" value="half" /><label className={styles.half} htmlFor="starhalf" title="Very bad - 0.5 stars"></label>
          </fieldset>
        </div>
      </div>
    )
  }
}

export default cssModules(RatingSelection, styles)