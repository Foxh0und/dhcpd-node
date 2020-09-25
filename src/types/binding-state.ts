// https://kb.isc.org/docs/isc-dhcp-44-manual-pages-dhcpdleases#:~:text=The%20binding%20state%20statement%20declares,be%20active%2C%20free%20or%20abandoned.
enum BindingState {
  active,
  free,
  abandoned,
}

export default BindingState;
