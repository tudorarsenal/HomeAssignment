import PropTypes from 'prop-types';

import './TableHeader.scss';

const TableHeader = ({ headers, isSelectable }) => (
  <div
    className={`table-header ${isSelectable ? 'table-header-selectable' : ''}`}
  >
    {headers?.map((header) => (
      <div
        className={`table-header__item table-header__${header.toLowerCase()}`}
        key={header}
      >
        {header}
      </div>
    ))}
  </div>
);

TableHeader.propTypes = {
  headers: PropTypes.arrayOf(PropTypes.string).isRequired,
  isSelectable: PropTypes.bool,
};

export default TableHeader;
