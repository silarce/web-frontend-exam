import {
  IconBookOutline,
  IconMoneyOutline,
  IconPersonOutline,
} from '../icons';

import scss from './index.module.scss';

  type CardProps = {
    companyName:string;
    jobTitle:string;
    education:string;
    salary:string;
    preview:string;
  };

export default function Card(
  {
    companyName,
    jobTitle,
    education,
    salary,
    preview,
  }:
  CardProps,
) {
  return (
    <div className={scss.card}>
      <h4 className={scss.title}>{companyName}</h4>
      <ul className={scss.list}>
        <li>
          <IconPersonOutline className="" />
          {jobTitle}
        </li>
        <li>
          <IconBookOutline className="" />
          {education}
        </li>
        <li>
          <IconMoneyOutline className="" />
          {salary}
        </li>
      </ul>
      <div className={scss.desc}>
        {preview}
      </div>
      <div className={scss.viewInfo}>查看細節</div>
    </div>
  );
}
