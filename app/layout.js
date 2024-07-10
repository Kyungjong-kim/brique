import { Inter } from 'next/font/google';
import Link from 'next/link';
import styles from './style.module.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
	title: 'BRIQUE code_test',
	description: '',
};

export default function RootLayout({ children }) {
	return (
    <html lang="en">
      <body>
        <div className={styles.nav}>
          <Link href={'/test1'}>문제1</Link>
          <Link href={'/test2'}>문제2</Link>
          <Link href={'/test3'}>문제3</Link>
          <Link href={'/test4'}>문제4</Link>
          <Link href={'/test5'}>문제5</Link>
          <Link href={'/test6'}>선택문제 8</Link>
        </div>
        {children}
      </body>
    </html>
  );
}
