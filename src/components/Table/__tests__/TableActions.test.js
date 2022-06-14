import renderer from 'react-test-renderer';

import TableActions from '../TableActions/TableActions';

describe('TableActions', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(<TableActions isSelectable={true} selectedRowsCount={0} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders correctly with indeterminate state for select all', () => {
    const tree = renderer
      .create(<TableActions isSelectable={true} selectedRowsCount={2} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders correctly with select all checked', () => {
    const tree = renderer
      .create(
        <TableActions
          isSelectable={true}
          selectedRowsCount={5}
          areAllRowsSelected={true}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders correctly with download error', () => {
    const downloadRules = {
      disableButton: false,
      errorMessage: 'Requirements not meet',
    };

    const tree = renderer
      .create(
        <TableActions
          isSelectable={true}
          selectedRowsCount={2}
          isDownloadable={true}
          areDownloadRulesMeet={false}
          downloadRules={downloadRules}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
