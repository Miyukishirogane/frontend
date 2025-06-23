import { Tooltip } from '@mui/material';
import BigNumber from 'bignumber.js';
import { BN } from 'src/utils';
import { formatNumber } from 'src/utils/format';

type IProps = {
  value: BigNumber | undefined;
  decimal?: number;
  contentBeforeValue?: string;
  fallbackDisplay?: string;
};

const TextSmallNumber = (props: IProps) => {
  const { value, decimal = 4, contentBeforeValue = '', fallbackDisplay = '0' } = props;

  BigNumber.set({ EXPONENTIAL_AT: 25 });

  if (!value || value.toString() === 'NaN' || value.isEqualTo(0)) {
    return fallbackDisplay;
  }

  if (value.isGreaterThan(0.001) || value.isLessThan(-0.001)) {
    const stringValue = value.isGreaterThan(1000) ? formatNumber(value.toFixed(decimal)) : value.toFixed(decimal);
    const roundedNumber = Math.round(Number(stringValue));
    //Only display decimal when it > 0 (e.g: 12.000 should display 12)
    const displayNumber = BN(stringValue).isEqualTo(roundedNumber) ? roundedNumber : stringValue;

    return (
      <div className="small_number" style={{ display: 'inline' }}>
        {contentBeforeValue}
        {value.isEqualTo(0) ? value.toString() : displayNumber}
      </div>
    );
  }

  return (
    <Tooltip title={value.toString()} placement="bottom-start" arrow={false}>
      <div className="small_number" style={{ cursor: 'pointer' }}>{`< ${contentBeforeValue}0.001`}</div>
    </Tooltip>
  );
};

export default TextSmallNumber;
