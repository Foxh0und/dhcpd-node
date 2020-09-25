/* RFC 1700 - Page 162
Number Hardware Type (hrd)                           References
------ -----------------------------------           ----------
     1 Ethernet (10Mb)
     2 Experimental Ethernet (3Mb)
     3 Amateur Radio AX.25
     4 Proteon ProNET Token Ring
     5 Chaos
     6 IEEE 802 Networks
     7 ARCNET
     8 Hyperchannel
     9 Lanstar
*/

enum HardwareType {
  ethernet = 1,
}

export default HardwareType;
