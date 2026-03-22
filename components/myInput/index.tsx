import clsx from 'clsx';

import TextField, { TextFieldProps } from '@mui/material/TextField';
import scss from './index.module.scss';

export default function MyInput({ className, ...props }: TextFieldProps) {
  return (
    <TextField
      className={clsx(scss.input, className)}
      slotProps={{ inputLabel: { shrink: true } }}
      // TODO input label調整字體，最後處理
      // 原本在CSS中調整了字體，但是fieldset卻沒有跟著調整
      // slotProps={{
      //   inputLabel: {
      //     shrink: true,
      //     sx: { fontSize: '12px' }, // 在這裡設字體大小
      //   },
      // }}
      // eslint-disable-next-line react/jsx-props-no-spreading,
      {...props}

    />
  );
}
