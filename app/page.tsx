// import Image from 'next/image';

import Pagination from '@mui/material/Pagination';

import Card from '@/components/card';
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
        <Card />
        <Card />
        <Card />
        <Card />
        <Pagination className={scss.pagination} />
      </div>
    </div>
  );
}
