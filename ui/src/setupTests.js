// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import  Enzyme, {
    configure,
    shallow,
    mount,
    render,
} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

global.React = React;
global.Enzyme = Enzyme;
global.shallow = shallow;
global.render = render;
global.mount = mount;
global.fetch = require('jest-fetch-mock');