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
    onInfoClick: ()=>void;
  };

export default function Card(
  {
    companyName,
    jobTitle,
    education,
    salary,
    preview,
    onInfoClick,
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
      <button
        type="button"
        className={scss.viewInfo}
        onClick={onInfoClick}
      >
        查看細節
      </button>
    </div>
  );
}
