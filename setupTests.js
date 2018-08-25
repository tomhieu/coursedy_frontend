// setup file
/* eslint-disable */
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import { shallow, mount, render } from 'enzyme';

configure({ adapter: new Adapter() });

global.shallow = shallow;
global.mount = mount;
global.render = render;
