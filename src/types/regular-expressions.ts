export const idRegex: RegExp = /^lease (.*) {$/;
export const idPos: number = 1;

export const startsRegex: RegExp = /^starts \d+ (.*);$/;
export const startsPos: number = 1;

export const endsRegex: RegExp = /^ends \d+ (.*);$/;
export const endsPos: number = 1;

export const clttRegex: RegExp = /^cltt \d+ (.*);$/;
export const clttPos: number = 1;

export const atsfpRegex: RegExp = /^atsfp \d+ (.*);$/;
export const atsfpPos: number = 1;

export const tstpRegex: RegExp = /^tstp \d+ (.*);$/;
export const tstpPos: number = 1;

export const tsfpRegex: RegExp = /^tsfp \d+ (.*);$/;
export const tsfpPos: number = 1;

export const bindingStateRegex = /^binding state (free|active|abandoned)/;
export const bindingStatePos = 1;

export const hardwareRegex = /^hardware (ethernet) /;
export const hardwarePos = 1;

export const macAddressRegex = /([0-9a-fA-F]{2}:){5}([0-9a-fA-F]){2}/;
export const macAddressPos = 0;

export const clientHostnameRegex = /^client-hostname "(.*?)"/;
export const clientHostnamePos = 1;

export const uidRegex = /^uid "(.*?)"/;
export const uidPos = 1;
