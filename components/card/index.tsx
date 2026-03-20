import {
  IconBookOutline,
  IconMoneyOutline,
  IconPersonOutline,
} from '../icons';

import scss from './index.module.scss';

export default function Card() {
  return (
    <div className={scss.card}>
      <h4 className={scss.title}>弈樂科技</h4>
      <ul className={scss.list}>
        <li>
          <IconPersonOutline className="" />
          前端工程師 Frontend  Engineer
        </li>
        <li>
          <IconBookOutline className="" />
          學歷
        </li>
        <li>
          <IconMoneyOutline className="" />
          薪水範圍
        </li>
      </ul>
      <div className={scss.desc}>
        負責設計、開發和維護技術方案，解決複雜的問題。擁有卓越的問題解決能力和創新思維，熟練應用科技工具，確保項目高效實施。具備協作精神，致力於推動科技進步。
      </div>
      <div className={scss.viewInfo}>查看細節</div>
    </div>
  );
}
