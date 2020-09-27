import { defaultResolver } from './resolvers';
import DHCPDLease from './types/dhcpd-lease';
import { matchers } from './types/regular-expressions';

type Row = {
  field: string;
  value: any;
  isTerminated?: boolean;
  isExcluded?: boolean;
};

const emptyRow: Row = {
  field: 'unknown',
  value: null
};

const terminationChar = matchers.find((f) => f.field === 'terminationChar');

function match(line: string): Row {
  const match = matchers
    .filter((r) => matches(line, r.regex))
    .map((m) => {
      return {
        isTerminated: m.regex === terminationChar.regex,
        isExcluded: m.isExcluded,
        field: m.field,
        value: (m.resolve || defaultResolver)(line, m.regex, m.position)
      } as Row;
    });

  return match && match.length > 0 ? match[0] : emptyRow;
}

export default function parseLease(lease: string): DHCPDLease[] {
  const leases: DHCPDLease[] = [];
  let dhcpdLease = {} as DHCPDLease;

  lease.split('\n').forEach((l) => {
    const processed = match(l.trim());

    if (processed.isTerminated) {
      leases.push(dhcpdLease);
      dhcpdLease = {} as DHCPDLease;
    }

    if (!processed.isExcluded && processed !== emptyRow) {
      dhcpdLease[processed.field] = processed.value;
    }
  });

  return leases;
}

function matches(line: string, regex: RegExp): boolean {
  return line.match(regex) !== null;
}
