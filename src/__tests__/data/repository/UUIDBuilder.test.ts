import { UUIDBuilder } from '../../../data/repository/UUIDBuilder';
import { DeviceManager } from '../../../utils/DeviceManager';
import { instance, mock, when } from 'ts-mockito';

const deviceManager = mock(DeviceManager);
const subject = new UUIDBuilder(instance(deviceManager));

it('it makes a unique ID', () => {
  when(deviceManager.isEmulator()).thenReturn(false);
  const result = subject.buildUUID();
  expect(result).toBeTruthy();
});
