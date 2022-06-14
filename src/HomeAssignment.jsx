import { useState, useEffect } from 'react';

import Table from './components/Table/Table';
import { getDevices } from './utils/apis';
import { ERROR_MESSAGE_DOWNLOAD, NO_DEVICES_DOWNLOAD } from './utils/textsEn';

import './HomeAssignment.scss';

const tableHeaders = ['Name', 'Device', 'Path', 'Status'];

const downloadRules = {
  disableButton: false,
  rule: (device) => device.status === 'available',
  errorMessage: ERROR_MESSAGE_DOWNLOAD,
};

const HomeAssignment = () => {
  const [devices, setDevices] = useState([]);

  useEffect(() => {
    getDeviceData();
  }, []);

  const getDeviceData = () => {
    try {
      const devicesData = getDevices();

      setDevices(devicesData);
    } catch (error) {
      console.log('error', error);
    }
  };

  // display device and path of the selected devices matching the rule
  const handleDownload = (selectedDevices) => {
    let finalMessage = '';

    selectedDevices?.forEach((row) => {
      const currentDevice = devices?.find((device) => device?.name === row);

      if (downloadRules?.rule(currentDevice)) {
        finalMessage += `${
          currentDevice?.device + ': ' + currentDevice?.path
        } \n`;
      }
    });

    if (!finalMessage) {
      finalMessage = NO_DEVICES_DOWNLOAD;
    }

    alert(finalMessage);
  };

  return (
    <div className="home-assignment">
      <Table
        headers={tableHeaders}
        data={devices}
        isDownloadable={true}
        handleDownload={handleDownload}
        downloadRules={downloadRules}
      />
    </div>
  );
};

export default HomeAssignment;
