import React, { Component } from 'react';
import { TT } from 'utils/locale';

class FQAItemList extends Component {
  render() {
    return (
      <div id="accordion" className="fqa__item-list">
        {TT.t('fqa').map((item, index) => {
          return <FQAItem item={item} id={index} key={index} />;
        })}
      </div>
    );
  }
}

FQAItemList.contextTypes = {
  t: React.PropTypes.func.isRequired
};

export default FQAItemList;


class FQAItem extends Component {
  render() {
    const { item, id } = this.props;

    return (
      <div className="fqa-item">
        <div className="fqa-item__question" data-toggle="collapse" data-target={`#collapse${id}`} aria-expanded="false" aria-controls={`collapse${id}`}>
          <h4>{item.question}</h4>
          <img src="/icons/icon-blockquote-orange.svg" className="icon-blockquote" style={{ width: '18px' }} />
          <img className="icon-fa icon-fa-arrow-down" src="/icons/icon-arrow-down.svg" />
          <img className="icon-fa icon-fa-arrow-up" src="/icons/icon-arrow-up.svg" />
        </div>
        <div id={`collapse${id}`} className="fqa-item__answer collapse" data-parent="#accordion">
          <p>{item.answer}</p>
        </div>
      </div>
    );
  }
}

FQAItem.contextTypes = {
  t: React.PropTypes.func.isRequired
};
