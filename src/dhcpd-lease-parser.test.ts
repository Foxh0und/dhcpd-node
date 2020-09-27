import parseLease from './dhcpd-lease-parser';
import BindingState from './types/binding-state';
import DHCPDLease from './types/dhcpd-lease';
import Hardware from './types/hardware';
import HardwareType from './types/hardware-type';
import { utcify } from './util';

test('should parse lease properly', () => {
  const expectedLease = [
    {
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
        macAddress: '00:11:22:33:44:55'
      } as Hardware,
      clientHostname: 'fridge',
      uid: 'thefridge'
    } as DHCPDLease
  ];

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

test('should not parse empty string', () => expect(parseLease('')).toEqual([]));

test('should parse lease file (with multiple leases)', () => {
  const expectedLease = {
    id: '192.168.20.6',
    starts: utcify('2009/06/27 00:40:00'),
    ends: utcify('2009/06/27 12:40:00'),
    hardware: {
      hardwareType: HardwareType.ethernet,
      macAddress: '00:00:00:00:00:01'
    } as Hardware,
    clientHostname: 'examle-workstation2',
    uid: '00:00:00:00:00:01'
  } as DHCPDLease;

  const leases = `lease 192.168.20.4 {
    starts 6 2009/06/27 00:40:00;
    ends 6 2009/06/27 12:40:00;
    hardware ethernet 00:00:00:00:00:00;
    uid 00:00:00:00:00:00;
    client-hostname "examle-workstation1";
}

lease 192.168.20.5 {
    starts 6 2009/06/27 00:40:00;
    ends 6 2009/06/27 12:40:00;
    hardware ethernet 00:00:00:00:00:00;
}

lease 192.168.20.6 {
    starts 6 2009/06/27 00:40:00;
    ends 6 2009/06/27 12:40:00;
    hardware ethernet 00:00:00:00:00:01;
    uid 00:00:00:00:00:01;
    client-hostname "examle-workstation2";
}

lease 192.168.20.7 {
    starts 6 2009/06/27 00:40:00;
    ends 6 2009/06/27 12:40:00;
    hardware ethernet 01:00:00:00:00:00;
}`;

  const parsedLeases = parseLease(leases);
  expect(parsedLeases).not.toBeNull();
  expect(parsedLeases).toHaveLength(4);
  expect(parsedLeases[2]).toEqual(expectedLease);
});
