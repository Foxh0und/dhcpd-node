import DHCPDLease from './types/dhcpd-lease';

/*

 lease 10.0.1.1 {
      starts 5 2015/05/15 01:57:17;
      ends 5 2015/05/15 02:07:17;
      tstp 5 2015/05/15 02:07:17;
      cltt 5 2015/05/15 01:57:17;
      binding state free;
      hardware ethernet 00:11:22:33:44:55;
      client-hostname "host1";
      uid "foo";
    }

*/
export default function parseLease(lease: string): DHCPDLease {
  const dhcpdLease = {} as DHCPDLease;

  lease.split('\n').map((l) => {
    if (l.match(/^lease (.*) {$/)) {
      dhcpdLease.id = l.match(/^lease (.*) {$/)[1];
    }
  });

  return dhcpdLease;
}
