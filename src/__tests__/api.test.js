import { getDevices } from '../utils/apis';
import { devices } from '../utils/mockData';

describe('apis', () => {
  it('getDevices returns devices', () => {
    expect(getDevices()).toBe(devices);
  });
});
