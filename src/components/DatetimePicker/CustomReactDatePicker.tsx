import IconCalendar from '@mui/icons-material/CalendarMonth';
import IconChevronLeft from '@mui/icons-material/ChevronLeft';
import { Box, ButtonBase, ClickAwayListener, IconButton, Stack, TextFieldProps, Typography } from '@mui/material';
import { add, format, isBefore, sub } from 'date-fns';
import { useEffect, useRef, useState } from 'react';
import DatePicker, { ReactDatePickerProps } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import CustomTextField from '../CustomForm/CustomTextField';
import './datetime.css';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface Props extends ReactDatePickerProps<any, boolean> {
  error?: boolean;
  helperText?: string;
  clearIcon?: boolean;
  inputProps?: TextFieldProps;
  isYearRange?: boolean;
}

const CustomReactDatePicker = (props: Props) => {
  const { error, inputProps, isYearRange, helperText, ...rest } = props;
  const [open, setOpen] = useState(false);
  const [openSelectYear, setOpenSelectYear] = useState(false);
  const [selectYearRange, setSelectYearRange] = useState(new Date());
  const ref = useRef<HTMLLIElement>(null);

  const handleClose = () => {
    setOpenSelectYear(false);
  };

  useEffect(() => {
    if (ref.current) {
      ref.current.scrollIntoView({ block: 'center' });
    }
  }, [ref, openSelectYear]);

  return (
    <DatePicker
      fixedHeight
      calendarStartDay={1}
      showPopperArrow={false}
      wrapperClassName="date-picker"
      open={open}
      customInput={
        <CustomTextField
          type="text"
          helperText={helperText}
          name="DatePicker"
          fullWidth
          error={error}
          InputProps={{
            startAdornment: <IconCalendar style={{ width: '24px', flexShrink: 0, color: '#0083C9' }} />,
            endAdornment: (
              <IconChevronLeft
                style={{
                  rotate: '270deg',
                  width: '20px',
                  height: '20px',
                  flexShrink: 0,
                }}
              />
            ),
          }}
          variant="outlined"
          sx={{
            width: '100%',
            ...inputProps?.sx,
          }}
          {...inputProps}
        />
      }
      formatWeekDay={formattedDate => (
        <Box
          sx={{
            px: '2px',
            mt: '4px',
          }}
        >
          <Typography
            variant="body2"
            sx={{
              color: '#0083C9',
              bgcolor: 'success.lighter',
              py: '8px',
              px: '13.5px',
              borderRadius: '6px',
            }}
          >
            {formattedDate.toString().substring(0, 2)}
          </Typography>
        </Box>
      )}
      renderCustomHeader={({
        date,
        changeYear,
        decreaseYear,
        increaseYear,
        decreaseMonth,
        increaseMonth,
        prevMonthButtonDisabled,
        nextMonthButtonDisabled,
      }) => (
        <Stack flexDirection="row" justifyContent="space-between" alignItems="center" px={1} py={0.5}>
          <IconButton
            size="small"
            onClick={() => {
              if (rest.showMonthYearPicker) {
                decreaseYear();
                return;
              }
              if (rest.showYearPicker) {
                changeYear(
                  sub(isYearRange ? selectYearRange : date, {
                    years: rest.yearItemNumber || 12,
                  }).getFullYear(),
                );

                if (isYearRange) {
                  setSelectYearRange(
                    sub(selectYearRange, {
                      years: rest.yearItemNumber || 12,
                    }),
                  );
                }
                return;
              }

              decreaseMonth();
            }}
            disabled={prevMonthButtonDisabled}
            sx={{ width: '32px', height: '32px', mr: 1 }}
          >
            <IconChevronLeft />
          </IconButton>

          <ClickAwayListener onClickAway={handleClose}>
            <Box display="flex" flexDirection="column" alignItems="center">
              <Typography variant="h6">
                {rest.showMonthYearPicker ? format(date, 'yyyy') : null}

                {rest.showYearPicker
                  ? `${format(
                      sub(isYearRange ? selectYearRange : date, {
                        years: 6,
                      }),
                      'yyyy',
                    )} - ${format(
                      sub(isYearRange ? selectYearRange : date, {
                        years: 5,
                      }),
                      'yyyy',
                    )}`
                  : null}
                {!rest.showMonthYearPicker && !rest.showYearPicker ? format(date, 'MMMM yyyy') : null}
              </Typography>
            </Box>
          </ClickAwayListener>

          <IconButton
            size="small"
            onClick={() => {
              if (rest.showMonthYearPicker) {
                increaseYear();
                return;
              }
              if (rest.showYearPicker) {
                changeYear(
                  add(isYearRange ? selectYearRange : date, { years: rest.yearItemNumber || 12 }).getFullYear(),
                );

                if (isYearRange) {
                  setSelectYearRange(add(selectYearRange, { years: rest.yearItemNumber || 12 }));
                }
                return;
              }

              increaseMonth();
            }}
            disabled={nextMonthButtonDisabled}
            sx={{ width: '32px', height: '32px', ml: 1, rotate: '180deg' }}
          >
            <IconChevronLeft />
          </IconButton>
        </Stack>
      )}
      renderDayContents={(dayOfMonth: number) => (
        <ButtonBase
          component="p"
          sx={{
            typography: 'body2',
            width: '34px',
            height: '34px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: '50%',
            ':hover': {
              bgcolor: 'grey.200',
            },
          }}
        >
          {dayOfMonth}
        </ButtonBase>
      )}
      {...rest}
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onChange={(date: any, e) => {
        if (rest.selectsRange) {
          if (rest.startDate && rest.endDate) {
            if (isBefore(date[0], rest.startDate)) {
              return;
            }
            rest.onChange([rest.startDate, date[0]], e);
          } else {
            rest.onChange(date, e);
          }

          const isValid = date?.every((item: Date) => !!item);
          if (isValid) setOpen(false);
        } else {
          rest.onChange(date, e);
          setOpen(false);
        }
      }}
      onInputClick={() => setOpen(true)}
      onClickOutside={e => {
        if (openSelectYear) return;
        if (rest.onClickOutside) {
          rest.onClickOutside(e);
        }

        setOpen(false);
      }}
    />
  );
};

export default CustomReactDatePicker;
