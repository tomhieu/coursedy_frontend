import React, {Component} from 'react'
const data = [
  {question: 'How can I book a Local Insider?', answer: 'Simply, select your destination. Then use the filters to find which Local Insider fits what you’re looking for. Send out booking requests to those you like. After a short while you should get responses as to whether your requests have been accepted or not. You won\'t wait longer than 48 hours to receive a confirmation and proceed through to the fun part, payment... (If none of your chosen Local Insiders say yes then we will pick one for you, we promise we\'ll pick a good one based on what you want.)'},
  {question: 'Do I need to pay upfront or after taking the trip?', answer: 'We ask that payments be made upfront. This is because we operate in developing countries so for your Local Insider your experience is much more than just a little bit of extra cash. We want to ensure that as soon as your tour is completed and a review is left our locals partner gets is paid what they have earnt.'},
  {question: 'Can I contact my Local Insider before making the payment?', answer: 'Yes, of course. When sending your booking request you can write a message to the Local Insider, include what you are looking to experience and what your tastes and preferences are. For example, if you’re a huge Indiana Jones fan and fancy exploring a post-apocalyptic landscape in the day, before winding down at your Local Insider\'s favourite temple-themed seafood restaurant at night, tell them that. Alternatively, if you are slightly lower-maintenant and not too sure what to do you can put something along the lines of "I fancy going off the beaten path and spending the day taking photos at local markets".'},
  {question: 'What costs are included in the booking fee?', answer: 'The cost of the booking is based on the hourly price set by your Local Insider. They created this price based on what they feel is a fair cost for their time helping you. We provide pricing guidelines to help set these rates but in the interest of fairness we don’t want to dictate these rates and tell our partners their worth. Traditionally most of the money spent on foreign traveling has been going into the pockets of large domestic travel companies. We have turned this model around so your money goes straight to the people who create the value for you. There may be some extra expenses, such as a bus ride or your own food. If you want to know about these then you can ask your Local Insider in advance.'},
  {question: 'What payment methods are accepted?', answer: 'At the moment, in order to process your information securely we ask that payments are made via PayPal. Please note that offline or cash payments are a violation of our Terms of Service which can result in removal from Inspitrip. We prohibit these payments because it makes it harder for us to protect your information and puts you at a greater risk of fraud and other security issues.'},
  {question: 'Can I change my booking information?', answer: 'Of course. Simply cancel your first booking (after having read our super exciting Cancellation terms) and book a new Local Insider.'},
]


class FQAItemList extends Component {
  render() {
    return (
      <div id="accordion" className="fqa__item-list">
        {data.map((item, index) => {
          return <FQAItem item={item} id={index} key={index} />
        })}
      </div>
    )
  }
}

FQAItemList.contextTypes = {
  t: React.PropTypes.func.isRequired
}

export default FQAItemList


class FQAItem extends Component {
  render() {
    const { item, id } = this.props

    return (
      <div className="fqa-item">
        <div className="fqa-item__question" data-toggle="collapse" data-target={`#collapse${id}`} aria-expanded="false" aria-controls={`collapse${id}`}>
          <h4>{item.question}</h4>
          <img src="/icons/icon-blockquote-orange.svg" className="icon-blockquote" style={{"width": "18px"}} />
          <img className="icon-fa icon-fa-arrow-down" src="/icons/icon-arrow-down.svg" />
          <img className="icon-fa icon-fa-arrow-up" src="/icons/icon-arrow-up.svg" />
        </div>
        <div id={`collapse${id}`} className="fqa-item__answer collapse" data-parent="#accordion">
          <p>{item.answer}</p>
        </div>
      </div>
    )
  }
}

FQAItem.contextTypes = {
  t: React.PropTypes.func.isRequired
}
