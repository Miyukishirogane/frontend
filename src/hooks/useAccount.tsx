// import { Address } from 'viem';
import { useAccount as useAccountWagmi } from 'wagmi';

//custom hook get address for change address in testing
const useAccount = () => {
  const account = useAccountWagmi();
  // const address = '0xeCb7B01Ba61C649b509905Cb2B093deE8377A682' as Address;
  //0xa71BBB9b0F61E957C94925926eF7D2e1d17bc402 address for Canalix
  //0x6325ae204778fa9DB0f873E09ae0c38A80f41381 address for Liquidity
  //0x135e94c43984B9d4D27B5D663F69a9d31d96f381 address for Liquidity Lending

  return { ...account };
};

export default useAccount;
