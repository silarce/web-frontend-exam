// import Image from 'next/image';

import HeroImage from '../components/heroImage';

import scss from './page.module.scss';

export default function Home() {
  return (
    <div>

      <HeroImage />

      <div className={scss.jobList}>
        <div className={scss.title}>
          <div />
          <h1>適合前端工程師的好工作</h1>
        </div>

        <div>fooo</div>
        <div>fooo</div>
        <div>fooo</div>
        <div>fooo</div>
        <div>fooo</div>
        <div>fooo</div>
        <div>fooo</div>
        <div>fooo</div>
        <div>fooo</div>

      </div>

    </div>
  );
}
