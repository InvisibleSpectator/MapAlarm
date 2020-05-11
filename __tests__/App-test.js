/**
 * @format
 */

import 'react-native';
import React from 'react';
import {shallow} from 'enzyme';
import {shallowToJson} from 'enzyme-to-json';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import DrawerAlarmCArd from '../Pages/Components/DrawerAlarmCard';
import Alarm from '../Model/Alarm';

it('should render component', () => {
  const wrapper = renderer.create(
    <DrawerAlarmCArd alarm={{...new Alarm(), time: new Date(0)}} />,
  );
  expect(wrapper).toMatchSnapshot();
});

it('model test', () => {
  const alarm = new Alarm();
  expect(alarm.options).toStrictEqual([
    {
      name: 'Monday',
      value: true,
    },
    {
      name: 'Tuesday',
      value: true,
    },
    {
      name: 'Wednesday',
      value: true,
    },
    {
      name: 'Thursday',
      value: true,
    },
    {
      name: 'Friday',
      value: true,
    },
    {
      name: 'Saturday',
      value: true,
    },
    {
      name: 'Sunday',
      value: true,
    },
  ]);
});
