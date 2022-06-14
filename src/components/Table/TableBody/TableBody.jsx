import PropTypes from 'prop-types';

import { ReactComponent as CircleIcon } from '../icons/circleIcon.svg';
import { NO_DATA } from '../utils/textsEn';

import './TableBody.scss';

const TableBody = ({ data, isSelectable, onRowSelect, selectedRows }) => {
  const isRowSelected = (name) => selectedRows?.indexOf(name) !== -1;

  const hanleSelectRow = (event) => onRowSelect(event.target.name);

  return data?.length > 0 ? (
    <div className="table-body">
      {data?.map((dataRow, index) => (
        <div
          className={`${
            isRowSelected(dataRow.name) ? 'table-body__data-row-selected' : ''
          } table-body__data-row`}
          key={`data-row-${index}`}
        >
          {isSelectable && (
            <>
              <label htmlFor={dataRow.name} className="visually-hidden">
                {dataRow.name}
              </label>
              <input
                type="checkbox"
                id={dataRow.name}
                name={dataRow.name}
                checked={isRowSelected(dataRow.name)}
                data-testid={`select-row-checkbox-${index}`}
                onChange={hanleSelectRow}
                className="table-body__select-row"
              />
            </>
          )}
          {Object.entries(dataRow).map(([key, value]) => (
            <div
              className={`table-body__data table-body__data-${key.toLowerCase()}`}
              key={value}
            >
              {key === 'status' && value === 'available' && (
                <CircleIcon
                  className="table-body__status-icon"
                  title="status-icon-circle"
                />
              )}
              {value}
            </div>
          ))}
        </div>
      ))}
    </div>
  ) : (
    <div className="table-body__no-data">{NO_DATA}</div>
  );
};

TableBody.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
  selectedRows: PropTypes.arrayOf(PropTypes.string),
  isSelectable: PropTypes.bool,
  onRowSelect: PropTypes.func,
};

export default TableBody;
