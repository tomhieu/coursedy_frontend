import React, { Component } from 'react';
import cssModules from 'react-css-modules';
import styles from './Icons.module.scss';

class TwitterIcon extends Component {
  render() {
    const { width = 38, height = 38 } = this.props;
    return (
      <svg width={`${width}px`} height={`${height}px`} viewBox="0 0 38 38" version="1.1">
        <defs>
          <polygon id="path-twitter-icon" points="1.00979614e-20 0.33244466 1.00979614e-20 37.631068 37.6649294 37.631068 37.6649294 0.33244466" />
          <path d="M9.77456863,4.35930097 C9.77456863,4.67768932 9.81107843,4.98759223 9.8814902,5.28532039 C6.47043137,5.11598058 3.44607843,3.49784466 1.42127451,1.03780583 C1.06847059,1.63805825 0.865431373,2.33718447 0.865431373,3.08168932 C0.865431373,4.49137864 1.59078431,5.73615534 2.69166667,6.46479612 C2.01884314,6.44376699 1.38588235,6.26114563 0.83227451,5.95603883 L0.83227451,6.00732039 C0.83227451,7.97667961 2.24758824,9.61953398 4.12486275,9.99252427 C3.781,10.0858641 3.41776471,10.135301 3.04335294,10.135301 C2.77884314,10.135301 2.52178431,10.1102136 2.27180392,10.0629903 C2.7937451,11.6774369 4.30890196,12.8524854 6.10533333,12.8856893 C4.70045098,13.9758835 2.93121569,14.6255728 1.0077451,14.6255728 C0.676921569,14.6255728 0.349823529,14.6063883 0.0294313725,14.5683883 C1.8444902,15.7220388 4.00229412,16.3946019 6.32029412,16.3946019 C13.87,16.3946019 17.9982157,10.2013398 17.9982157,4.82968932 C17.9982157,4.65370874 17.9944902,4.47809709 17.9862941,4.30396117 C18.7891373,3.73137864 19.4846863,3.01528155 20.0345686,2.20031068 C19.2984118,2.52349515 18.5074902,2.74227184 17.6770784,2.8396699 C18.5246275,2.33718447 19.175098,1.54102913 19.4820784,0.591398058 C18.6892941,1.05735922 17.8100784,1.39530097 16.8757255,1.5775534 C16.1272745,0.787669903 15.0602941,0.294407767 13.8793137,0.294407767 C11.6127255,0.294407767 9.77456863,2.11471845 9.77456863,4.35930097 Z" id="path-3-twitter-icon" />
        </defs>
        <g id="02---Pages" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
          <g id="Course---Detail-View" transform="translate(-1146.000000, -987.000000)">
            <g id="Share-options" transform="translate(1037.000000, 950.000000)">
              <g id="Twitter" transform="translate(109.000000, 37.000000)">
                <g id="Group-6" transform="translate(0.000000, 0.036524)">
                  <g id="Group-3">
                    <mask id="mask-twitter" fill="white">
                      <use xlinkHref="#path-twitter-icon" />
                    </mask>
                    <g id="Clip-2" />
                    <path d="M37.6649294,18.9819592 C37.6649294,29.281435 29.2330275,37.6311049 18.8325765,37.6311049 C8.43175294,37.6311049 -0.000149019608,29.281435 -0.000149019608,18.9819592 C-0.000149019608,8.68211456 8.43175294,0.33244466 18.8325765,0.33244466 C29.2330275,0.33244466 37.6649294,8.68211456 37.6649294,18.9819592" id="Fill-1" fill="#00B8E9" mask="url(#mask-twitter)" />
                  </g>
                  <path d="M29.3484431,14.7441107 C28.6122863,15.0672951 27.8209922,15.2857029 26.9909529,15.3834699 C27.838502,14.8806155 28.4889725,14.0848291 28.7959529,13.1351981 C28.0031686,13.6011592 27.1239529,13.939101 26.1896,14.1213534 C25.441149,13.3314699 24.3737961,12.8382078 23.1931882,12.8382078 C20.9266,12.8382078 19.0884431,14.6585184 19.0884431,16.902732 C19.0884431,17.2211204 19.1249529,17.5313922 19.1953647,17.8291204 C15.7843059,17.6594117 12.7599529,16.0416447 10.735149,13.5816058 C10.3819725,14.1818583 10.1793059,14.8806155 10.1793059,15.6254893 C10.1793059,17.0351786 10.9042863,18.2795864 12.0051686,19.0085961 C11.3327176,18.987567 10.6993843,18.8045767 10.146149,18.4994699 L10.146149,18.5511204 C10.146149,20.5204796 11.5614627,22.162965 13.4387373,22.5363243 C13.094502,22.6296641 12.7312667,22.679101 12.3576,22.679101 C12.0927176,22.679101 11.8356588,22.6536447 11.5853059,22.6067903 C12.1076196,24.220868 13.6227765,25.3962854 15.4192078,25.4291204 C14.0143255,26.5193146 12.2450902,27.1690039 10.3216196,27.1690039 C9.99079608,27.1690039 9.66332549,27.1498194 9.34293333,27.1121883 C11.1583647,28.2658388 13.3161686,28.9384019 15.6337961,28.9384019 C23.183502,28.9384019 27.3120902,22.7451398 27.3120902,17.3734893 C27.3120902,17.1971398 27.3079922,17.0218971 27.3001686,16.8477612 C28.1026392,16.2748097 28.7981882,15.5590816 29.3484431,14.7441107" id="Fill-4" fill="#FEFEFE" />
                </g>
                <g id="Group-11" transform="translate(9.313725, 12.580214)">
                  <mask id="mask-twitter-4" fill="white">
                    <use xlinkHref="#path-3-twitter-icon" />
                  </mask>
                  <g id="Clip-8" />
                  <polygon id="Fill-7" fill="#FEFEFE" mask="url(#mask-twitter-4)" points="-6.22417647 22.5871262 26.2922745 22.5871262 26.2922745 -5.89774757 -6.22417647 -5.89774757" />
                  <polygon id="Fill-9" fill="#FEFEFE" mask="url(#mask-twitter-4)" points="0.0290588235 16.3946019 20.0390392 16.3946019 20.0390392 0.294407767 0.0290588235 0.294407767" />
                  <polygon id="Fill-10" fill="#FEFEFE" mask="url(#mask-twitter-4)" points="-6.22417647 22.5871262 26.2881765 22.5871262 26.2881765 -5.89774757 -6.22417647 -5.89774757" />
                </g>
              </g>
            </g>
          </g>
        </g>
      </svg>
    );
  }
}

TwitterIcon.propTypes = {
  width: React.PropTypes.number,
  height: React.PropTypes.number
};

export default cssModules(TwitterIcon, styles);
