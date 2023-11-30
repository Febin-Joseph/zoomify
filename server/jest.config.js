import { defaults } from 'jest-config';

export default {
  ...defaults,
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
    '^.+\\.tsx?$': 'babel-jest',
  },
};