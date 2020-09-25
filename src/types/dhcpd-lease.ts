import Hardware from './hardware';
import BindingState from './binding-state';

export default class DHCPDLease {
  id: string;
  starts: Date;
  ends: Date;
  tstp: Date;
  tsfp: Date;
  atsfp: Date;
  cltt: Date;
  bindingState: BindingState;
  hardware: Hardware;
  clientHostname: string;
  uid: string;
}
