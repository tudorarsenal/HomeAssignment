import renderer from 'react-test-renderer';

import TableHeader from '../TableHeader/TableHeader';
import { tableHeaders } from '../../../utils/mockData';

describe('TableHeader', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(<TableHeader headers={tableHeaders} isSelectable={true} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders correctly without select all', () => {
    const tree = renderer
      .create(<TableHeader headers={tableHeaders} isSelectable={false} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
