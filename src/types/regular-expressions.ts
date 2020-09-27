import {
  dateResolver,
  bindingStateResolver,
  hardwareResolver
} from '../resolvers';

export type RegExpField = {
  field: string;
  regex: RegExp;
  position: number;
  isExcluded?: boolean;
  // eslint-disable-next-line no-unused-vars
  resolve?: (value: string, regex: RegExp, idx: number) => any;
};

const id: RegExpField = {
  field: 'id',
  regex: /^lease (.*) {$/,
  position: 1
};

const starts: RegExpField = {
  field: 'starts',
  regex: /^starts \d+ (.*);$/,
  position: 1,
  resolve: dateResolver
};

const ends: RegExpField = {
  field: 'ends',
  regex: /^ends \d+ (.*);$/,
  position: 1,
  resolve: dateResolver
};

const cltt: RegExpField = {
  field: 'cltt',
  regex: /^cltt \d+ (.*);$/,
  position: 1,
  resolve: dateResolver
};

const atsfp: RegExpField = {
  field: 'atsfp',
  regex: /^atsfp \d+ (.*);$/,
  position: 1,
  resolve: dateResolver
};

const tstp: RegExpField = {
  field: 'tstp',
  regex: /^tstp \d+ (.*);$/,
  position: 1,
  resolve: dateResolver
};

const tsfp: RegExpField = {
  field: 'tsfp',
  regex: /^tsfp \d+ (.*);$/,
  position: 1,
  resolve: dateResolver
};

const bindingState: RegExpField = {
  field: 'bindingState',
  regex: /^binding state (free|active|abandoned)/,
  position: 1,
  resolve: bindingStateResolver
};

const hardware: RegExpField = {
  field: 'hardware',
  regex: /^hardware (ethernet) /,
  position: 1,
  resolve: hardwareResolver
};

const clientHostname: RegExpField = {
  field: 'clientHostname',
  regex: /^client-hostname "(.*?)"/,
  position: 1
};

/*
    The client identifier is recorded as a colon-separated hexadecimal list or as a quoted string. 
    If it is recorded as a quoted string and it contains one or more non-printable characters, 
    those characters are represented as octal escapes - a backslash character followed by three octal digits. 
    From `man dhcpd.leases(5)
*/
const uid: RegExpField = {
  field: 'uid',
  regex: /^uid (.*);/,
  position: 1
};

const uidWithQuotes: RegExpField = {
  field: 'uid',
  regex: /^uid "(.*?)"/,
  position: 1
};

const terminationChar: RegExpField = {
  field: 'terminationChar',
  isExcluded: true,
  regex: /}/,
  position: null
};

// Order is important here, terminate early, and for `alt` matchers like uid

export const matchers = [
  terminationChar,
  id,
  starts,
  ends,
  cltt,
  atsfp,
  tstp,
  tsfp,
  bindingState,
  hardware,
  clientHostname,
  uidWithQuotes,
  uid
];
