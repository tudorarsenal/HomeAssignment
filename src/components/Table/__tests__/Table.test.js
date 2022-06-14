import renderer from 'react-test-renderer';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Table from '../Table';
import { devices, tableHeaders } from '../../../utils/mockData';

describe('Table', () => {
  const user = userEvent.setup();

  it('renders correctly with data', () => {
    const tree = renderer.create(<Table data={devices} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders correctly with data and headers', () => {
    const tree = renderer
      .create(<Table data={devices} headers={tableHeaders} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should call handleDownload when download button is clicked', async () => {
    const downloadRules = {
      disableButton: false,
      rule: (device) => device.status === 'available',
      errorMessage: 'Requirements not meet',
    };

    const handleDownload = jest.fn();

    render(
      <Table
        data={devices}
        headers={tableHeaders}
        isSelectable={true}
        isDownloadable={true}
        downloadRules={downloadRules}
        handleDownload={handleDownload}
      />
    );

    await user.click(screen.getByTestId('select-row-checkbox-0'));
    await user.click(screen.getByTestId('download-button'));

    expect(handleDownload).toHaveBeenCalled();
  });

  it('should select all rows when select all checkbox is clicked', async () => {
    render(<Table data={devices} headers={tableHeaders} isSelectable={true} />);

    const selectAllCheckbox = screen.getByTestId('select-all-checkbox');

    expect(selectAllCheckbox).not.toBeChecked();

    await user.click(selectAllCheckbox);

    expect(selectAllCheckbox).toBeChecked();

    for (let i = 0; i < devices.length; i++) {
      expect(screen.getByTestId(`select-row-checkbox-${i}`)).toBeChecked();
    }
  });

  it('should unselect all rows when select all checkbox is clicked a second time', async () => {
    render(<Table data={devices} headers={tableHeaders} isSelectable={true} />);

    const selectAllCheckbox = screen.getByTestId('select-all-checkbox');

    expect(selectAllCheckbox).not.toBeChecked();

    await user.click(selectAllCheckbox);

    expect(selectAllCheckbox).toBeChecked();

    await user.click(selectAllCheckbox);

    expect(selectAllCheckbox).not.toBeChecked();

    for (let i = 0; i < devices.length; i++) {
      expect(screen.getByTestId(`select-row-checkbox-${i}`)).not.toBeChecked();
    }
  });
});
