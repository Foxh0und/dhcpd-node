import parseLease from './dhcpd-lease-parser';
import DHCPDLease from './types/dhcpd-lease';

const expectedLease = {
  id: '10.0.1.1',
  // starts: new Date('2015/05/15 01:57:17'),
} as DHCPDLease;

test('should parse lease properly', () => {
  const lease = `lease 10.0.1.1 {
      starts 5 2015/05/15 01:57:17;
      ends 5 2015/05/15 02:07:17;
      tstp 5 2015/05/15 02:07:17;
      cltt 5 2015/05/15 01:57:17;
      binding state free;
      hardware ethernet 00:11:22:33:44:55;
      client-hostname "host1";
      uid "foo";
    }`;

  const result = parseLease(lease);
  expect(result).toEqual(expectedLease);
});
