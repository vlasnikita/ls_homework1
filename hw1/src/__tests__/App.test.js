import React from 'react';
import App from '../components/App';
import NewsPost from '../components/NewsPost';
import {shallow} from 'enzyme';

describe('App component', () => {
  const wrapper = shallow(<App />);

  describe('test render', () => {
    it('contain div with class App', () => {
      expect(wrapper.find('div.App')).toHaveLength(1);
    });
    it('contain input', () => {
      expect(wrapper.find('input')).toHaveLength(1);
    });
  });

  describe('check presence of instance methods', () => {
    const wrapper = shallow(<App />);
    it('contain instance method handleChange', () => {
      expect(wrapper.instance().handleChange).toBeDefined();
    });

    it('contain instance method handleNewPost', () => {
      expect(wrapper.instance().handleNewPost).toBeDefined();
    });
  });

  describe('check state content', () => {
    const wrapper = shallow(<App />);
    it('contain news array', () => {
      expect(wrapper.state().news).toEqual([]);
    });
    it('contain newsInput with empty string', () => {
      expect(wrapper.state().newsInput).toEqual('');
    });
  });

  describe('check callbacks', () => {
    it('save from input to state.newsInput', () => {
      const wrapper = shallow(<App />);
      wrapper.find('input').simulate('change', {target: {value: 10}});
      wrapper.update();
      expect(wrapper.state().newsInput).toEqual(10);
    });
    it('create new post from value state.newsInput via click on button', () => {
      const wrapper = shallow(<App />);
      wrapper.find('input').simulate('change', {target: {value: 10}});
      wrapper.update();
      wrapper.find('button').simulate('click');
      expect(wrapper.state().newsInput).toEqual('');
      expect(wrapper.state().news[0].text).toEqual(10);
    });
  });

  describe('check Comments rendering', () => {
    it('render NewsPost component on create new post', () => {
      const wrapper = shallow(<App />);
      wrapper.find('input').simulate('change', {target: {value: 10}});
      wrapper.update();
      wrapper.find('button').simulate('click');
      wrapper.update();
      const newsFromState = wrapper.state().news[0];
      expect(
        wrapper.contains(
          <NewsPost key={newsFromState.text} text={newsFromState.text} />
        )
      ).toBeTruthy();
    });
  });
});
