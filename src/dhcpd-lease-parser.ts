import BindingState from './types/binding-state';
import DHCPDLease from './types/dhcpd-lease';
import Hardware from './types/hardware';
import HardwareType from './types/hardware-type';
import * as regularExpressions from './types/regular-expressions';
import { utcify } from './util';

type RowType = {
  field: string;
  value: any;
};

export default function parseLease(lease: string): DHCPDLease {
  const dhcpdLease = {} as DHCPDLease;
  lease.split('\n').forEach((l) => {
    const processed = processLine(l.trim());
    if (processed.field !== 'unknown') {
      dhcpdLease[processed.field] = processed.value;
    }
  });
  return dhcpdLease;
}

function processLine(line: string): RowType {
  let field = 'unknown';
  let value: any;

  if (matches(line, regularExpressions.idRegex)) {
    field = 'id';
    value = extractValue(
      line,
      regularExpressions.idRegex,
      regularExpressions.idPos
    );
  } else if (matches(line, regularExpressions.startsRegex)) {
    field = 'starts';
    value = utcify(
      extractValue(
        line,
        regularExpressions.startsRegex,
        regularExpressions.startsPos
      )
    );
  } else if (matches(line, regularExpressions.endsRegex)) {
    field = 'ends';
    value = utcify(
      extractValue(
        line,
        regularExpressions.endsRegex,
        regularExpressions.endsPos
      )
    );
  } else if (matches(line, regularExpressions.clttRegex)) {
    field = 'cltt';
    value = utcify(
      extractValue(
        line,
        regularExpressions.clttRegex,
        regularExpressions.clttPos
      )
    );
  } else if (matches(line, regularExpressions.atsfpRegex)) {
    field = 'atsfp';
    value = utcify(
      extractValue(
        line,
        regularExpressions.atsfpRegex,
        regularExpressions.atsfpPos
      )
    );
  } else if (matches(line, regularExpressions.tstpRegex)) {
    field = 'tstp';
    value = utcify(
      extractValue(
        line,
        regularExpressions.tstpRegex,
        regularExpressions.tstpPos
      )
    );
  } else if (matches(line, regularExpressions.tsfpRegex)) {
    field = 'tsfp';
    value = utcify(
      extractValue(
        line,
        regularExpressions.tsfpRegex,
        regularExpressions.tsfpPos
      )
    );
  } else if (matches(line, regularExpressions.hardwareRegex)) {
    field = 'hardware';
    value = {
      hardwareType:
        HardwareType[
          extractValue(
            line,
            regularExpressions.hardwareRegex,
            regularExpressions.hardwarePos
          )
        ],
      macAddress: extractValue(
        line,
        regularExpressions.macAddressRegex,
        regularExpressions.macAddressPos
      ),
    } as Hardware;
  } else if (matches(line, regularExpressions.bindingStateRegex)) {
    field = 'bindingState';
    value =
      BindingState[
        extractValue(
          line,
          regularExpressions.bindingStateRegex,
          regularExpressions.bindingStatePos
        )
      ];
  } else if (matches(line, regularExpressions.clientHostnameRegex)) {
    field = 'clientHostname';
    value = extractValue(
      line,
      regularExpressions.clientHostnameRegex,
      regularExpressions.clientHostnamePos
    );
  } else if (matches(line, regularExpressions.uidRegex)) {
    field = 'uid';
    value = extractValue(
      line,
      regularExpressions.uidRegex,
      regularExpressions.uidPos
    );
  }

  return { field, value } as RowType;
}

function matches(line: string, regex: RegExp): boolean {
  return line.match(regex) !== null;
}

function extractValue(line: string, regex: RegExp, idx: number): string {
  return line.match(regex)[idx];
}
