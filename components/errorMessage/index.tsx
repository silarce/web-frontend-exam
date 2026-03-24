import scss from './index.module.scss';

export default function ErrorMessage({ children }: { children: React.ReactNode }) {
  return (
    <div className={scss.errorMessage}>
      {children}
    </div>
  );
}
