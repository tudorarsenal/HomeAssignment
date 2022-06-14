import renderer from 'react-test-renderer';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';

import Table from '../Table';
import { devices } from '../../../utils/mockData';

describe('TableBody', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(<Table data={devices} isSelectable={true} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('shold check a row', async () => {
    render(<Table data={devices} isSelectable={true} />);
    const user = userEvent.setup();

    expect(screen.getByTestId('select-row-checkbox-1')).not.toBeChecked();

    await user.click(screen.getByTestId('select-row-checkbox-1'));

    expect(screen.getByTestId('select-row-checkbox-1')).toBeChecked();
  });

  it('shold uncheck a row', async () => {
    render(<Table data={devices} isSelectable={true} />);
    const user = userEvent.setup();

    await user.click(screen.getByTestId('select-row-checkbox-1'));

    expect(screen.getByTestId('select-row-checkbox-1')).toBeChecked();

    await user.click(screen.getByTestId('select-row-checkbox-1'));

    expect(screen.getByTestId('select-row-checkbox-1')).not.toBeChecked();
  });
});
