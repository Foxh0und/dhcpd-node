import parseLease from './dhcpd-lease-parser';
import BindingState from './types/binding-state';
import DHCPDLease from './types/dhcpd-lease';
import Hardware from './types/hardware';
import HardwareType from './types/hardware-type';
import { utcify } from './util';

test('should parse lease properly', () => {
  const expectedLease = {
    id: '192.168.0.1',
    starts: utcify('2020/09/20 04:20:42'),
    ends: utcify('2020/09/20 05:20:42'),
    tstp: utcify('2020/09/20 01:08:42'),
    cltt: utcify('2020/09/20 02:15:42'),
    atsfp: utcify('2020/09/20 03:15:42'),
    tsfp: utcify('2020/09/20 04:15:42'),
    bindingState: BindingState.free,
    hardware: {
      hardwareType: HardwareType.ethernet,
      macAddress: '00:11:22:33:44:55',
    } as Hardware,
    clientHostname: 'fridge',
    uid: 'thefridge',
  } as DHCPDLease;

  const lease = `lease 192.168.0.1 {
      starts 5 2020/09/20 04:20:42;
      ends 5 2020/09/20 05:20:42;
      tstp 5 2020/09/20 01:08:42;
      cltt 5 2020/09/20 02:15:42;
      atsfp 5 2020/09/20 03:15:42;
      tsfp 5 2020/09/20 04:15:42;
      binding state free;
      hardware ethernet 00:11:22:33:44:55;
      client-hostname "fridge";
      uid "thefridge";
    }`;

  expect(parseLease(lease)).toEqual(expectedLease);
});

test('should not parse empty string', () => {
  const lease = '';
  const result = parseLease(lease);
  expect(result).toEqual({});
});
