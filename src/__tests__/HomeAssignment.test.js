import renderer from 'react-test-renderer';

import HomeAssignment from '../HomeAssignment';

describe('HomeAssignment', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<HomeAssignment />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
