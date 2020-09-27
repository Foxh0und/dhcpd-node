import BindingState from '../types/binding-state';
import Hardware from '../types/hardware';
import HardwareType from '../types/hardware-type';
import { utcify } from '../util';

// Special matcher for Hardware enum
const macAddress = {
  regex: /([0-9a-fA-F]{2}:){5}([0-9a-fA-F]){2}/,
  position: 0
};

export const defaultResolver = (value: string, regex: RegExp, idx: number) => {
  return value.match(regex)[idx];
};

export const dateResolver = (value: string, regex: RegExp, idx: number) => {
  return utcify(defaultResolver(value, regex, idx));
};

export const bindingStateResolver = (
  value: string,
  regex: RegExp,
  idx: number
) => {
  return BindingState[defaultResolver(value, regex, idx)];
};

export const hardwareResolver = (value: string, regex: RegExp, idx: number) => {
  return {
    hardwareType: HardwareType[defaultResolver(value, regex, idx)],
    macAddress: defaultResolver(value, macAddress.regex, macAddress.position)
  } as Hardware;
};
