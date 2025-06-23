/* eslint-disable @typescript-eslint/no-explicit-any */
interface Definition {
  name: string;
  type: string;
  size: number;
  isTime?: boolean;
}

function decodePackedStruct(data: string[], definitions: Definition[]): Record<string, any> {
  const obj: Record<string, any> = {};
  let slot = 0;
  let c = 0;

  try {
    for (let i = 0; i !== definitions.length; i++) {
      const def = definitions[i];
      if (c + def.size > 256) {
        slot++;
        c = 0;
      }

      const hex =
        '0x' + data[slot].slice(data[slot].indexOf('0x') === 0 ? 2 : 0).slice(-(c + def.size) / 4, (256 - c) / 4);
      c += def.size;

      let value: any = hex;

      if (def.type === 'uint') {
        const decoded = BigInt(hex);

        if (def.isTime) {
          value = decoded === BigInt(0) ? null : new Date(Number(decoded) * 1000);
        } else {
          value = decoded.toString();
        }
      } else if (def.type === 'bool') {
        value = BigInt(hex) === BigInt(1);
      }

      obj[def.name] = value;
    }
  } catch (e) {
    console.warn('decodePacked:', (e as Error).message);
  }

  return obj;
}

function proposalList(data: (string | string[])[]): { [key: string]: any }[] | { [key: string]: any } {
  const definitions: Definition[] = [
    { name: 'id', type: 'uint', size: 256 },
    { name: 'forVotes', type: 'uint', size: 128 },
    { name: 'againstVotes', type: 'uint', size: 128 },
    { name: 'proposer', type: 'address', size: 160 },
    { name: 'startBlock', type: 'uint', size: 64 },
    { name: 'duration', type: 'uint', size: 32 },
    { name: 'eta', type: 'uint', size: 32 },
    { name: 'cancelled', type: 'bool', size: 8 },
    { name: 'executed', type: 'bool', size: 8 },
  ];

  if (data[0] instanceof Array) {
    return (data as string[][]).map(e => proposalList(e));
  }
  return decodePackedStruct(data as string[], definitions);
}

export { proposalList };
