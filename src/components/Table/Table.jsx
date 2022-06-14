import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import TableActions from './TableActions/TableActions';
import TableHeader from './TableHeader/TableHeader';
import TableBody from './TableBody/TableBody';
import { NO_HEADERS } from './utils/textsEn';

import './Table.scss';

const Table = ({
  headers,
  data,
  isSelectable,
  isDownloadable,
  preselectedRows,
  handleDownload,
  downloadRules,
}) => {
  const [selectedRows, setSelectedRows] = useState(preselectedRows);
  const [areDownloadRulesMeet, setAreDownloadRulesMeet] = useState(true);

  useEffect(() => {
    let areRulesNotMeet = false;

    // check if every selected row matches the download rule provided
    if (isDownloadable && downloadRules) {
      selectedRows?.forEach((row) => {
        const rowData = data?.find((data) => data.name === row);

        if (!downloadRules?.rule(rowData)) {
          areRulesNotMeet = true;
        }
      });
    }

    setAreDownloadRulesMeet(!areRulesNotMeet);
  }, [isDownloadable, areDownloadRulesMeet, data, downloadRules, selectedRows]);

  const areAllRowsSelected = () => selectedRows?.length === data?.length;

  const handleRowSelect = (name) => {
    if (selectedRows.indexOf(name) === -1) {
      setSelectedRows([...selectedRows, name]);
      return;
    }

    const newSelectedRows = selectedRows?.filter((row) => row !== name);
    setSelectedRows(newSelectedRows);
  };

  const handleSelectAll = () => {
    if (!areAllRowsSelected()) {
      const allRowNames = data?.map((data) => data.name);

      setSelectedRows(allRowNames);

      return;
    }

    setSelectedRows([]);
  };

  const onDownload = () => {
    if (areDownloadRulesMeet || !downloadRules.disableButton) {
      handleDownload(selectedRows);
    }
  };

  return (
    <div className="table">
      {isSelectable && (
        <TableActions
          isSelectable={isSelectable}
          isDownloadable={isDownloadable}
          selectedRowsCount={selectedRows.length}
          onSelectAll={handleSelectAll}
          onDownload={onDownload}
          areAllRowsSelected={areAllRowsSelected()}
          downloadRules={downloadRules}
          areDownloadRulesMeet={areDownloadRulesMeet}
        />
      )}
      <TableHeader headers={headers} isSelectable={isSelectable} />
      <TableBody
        data={data}
        isSelectable={isSelectable}
        onRowSelect={handleRowSelect}
        selectedRows={selectedRows}
      />
    </div>
  );
};

Table.defaultProps = {
  isSelectable: true,
  isDownloadable: false,
  preselectedRows: [],
  headers: [NO_HEADERS],
};

Table.propTypes = {
  headers: PropTypes.arrayOf(PropTypes.string),
  data: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
  isSelectable: PropTypes.bool,
  isDownloadable: PropTypes.bool,
  preselectedRows: PropTypes.arrayOf(PropTypes.string),
  handleDownload: PropTypes.func,
  downloadRules: PropTypes.shape({
    disableButton: PropTypes.bool,
    rule: PropTypes.func,
    errorMessage: PropTypes.string,
  }),
};

export default Table;
