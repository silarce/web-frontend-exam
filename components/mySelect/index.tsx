import clsx from 'clsx';

import Select, { SelectProps } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import scss from './index.module.scss';

export default function MySelect(
  {
    className = undefined,
    label, value, options, onChange,
  }:
  {
    // 給預設值了還跳警告，暫時先略過
    // eslint-disable-next-line react/require-default-props
    className?:string;
    label: SelectProps['label'];
    value: string | undefined;
    options: { value: string, label: React.ReactNode }[];
    onChange: SelectProps<string>['onChange'];
  },
) {
  return (
    <FormControl className={clsx(scss.wrapper, className)}>
      <InputLabel
        shrink
        className={scss.label}
        // TODO select label調整字體，最後處理
        // 原本在CSS中調整了字體，但是fieldset卻沒有跟著調整
        // sx={{
        //   fontWeight: '400',
        //   fontSize: '10px',
        //   lineHeight: '125%',
        //   letterSpacing: '0%',
        // }}
      >
        {label}
      </InputLabel>
      <Select<string>
        label={label}
        value={value}
        onChange={onChange}
        // sx={{
        //   '& legend span': { fontSize: '0.75em' },
        // }}
      >
        {options.map((option) => (
          <MenuItem
            key={option.value}
            value={option.value}
          >
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
