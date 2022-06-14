import { useEffect, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';

import { ReactComponent as DonwloadIcon } from '../icons/downloadIcon.svg';
import {
  SELECTED,
  NO_ROWS_SELECTED,
  DOWNLOAD_LABEL,
  SELECT_ALL,
} from '../utils/textsEn';

import './TableActions.scss';

const TableActions = ({
  isSelectable,
  isDownloadable,
  selectedRowsCount,
  onSelectAll,
  onDownload,
  areAllRowsSelected,
  downloadRules,
  areDownloadRulesMeet,
}) => {
  const selectAllRef = useRef();

  // true if some of the rows are selected
  // not all or not 0 selected
  const isIndeterminateValue = useCallback(
    () => isSelectable && !areAllRowsSelected === (selectedRowsCount !== 0),
    [isSelectable, areAllRowsSelected, selectedRowsCount]
  );

  useEffect(() => {
    if (!selectAllRef?.current) return;

    if (isIndeterminateValue()) {
      selectAllRef.current.indeterminate = true;
      return;
    } else if (isSelectable) {
      selectAllRef.current.indeterminate = false;
    }
  }, [isIndeterminateValue, isSelectable]);

  return (
    <div className="table-actions">
      {isSelectable && (
        <div className="table-actions__select">
          <label htmlFor="select-all" className="visually-hidden">
            {SELECT_ALL}
          </label>
          <input
            type="checkbox"
            id="select-all"
            name="select-all"
            checked={areAllRowsSelected}
            onChange={onSelectAll}
            ref={selectAllRef}
            className={`${
              isIndeterminateValue()
                ? 'table-actions__check-all-indeterminate'
                : 'table-actions__check-all'
            }`}
            data-testid="select-all-checkbox"
          />
          {selectedRowsCount > 0 ? (
            <div className="table-actions__selection-count">{`${SELECTED} ${selectedRowsCount}`}</div>
          ) : (
            <div className="table-actions__selection-count">
              {NO_ROWS_SELECTED}
            </div>
          )}
        </div>
      )}
      {isDownloadable && selectedRowsCount > 0 && (
        <div className="table-actions__download">
          <button
            className="table-actions__download-button"
            onClick={onDownload}
            disabled={!areDownloadRulesMeet && downloadRules.disableButton}
            data-testid="download-button"
          >
            <DonwloadIcon
              className="table-actions__download-icon"
              title="download-icon"
            />
            <span className="table-actions__download-label">
              {DOWNLOAD_LABEL}
            </span>
          </button>
          {!areDownloadRulesMeet && (
            <div className="table-actions__download-error-message" role="alert">
              {downloadRules.errorMessage}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

TableActions.propTypes = {
  isSelectable: PropTypes.bool,
  isDownloadable: PropTypes.bool,
  selectedRowsCount: PropTypes.number,
  onSelectAllt: PropTypes.func,
  onDownloadt: PropTypes.func,
  areAllRowsSelected: PropTypes.bool,
  downloadRules: PropTypes.shape({
    disableButton: PropTypes.bool,
    rule: PropTypes.func,
    errorMessage: PropTypes.string,
  }),
  areDownloadRulesMeet: PropTypes.bool,
};

export default TableActions;
