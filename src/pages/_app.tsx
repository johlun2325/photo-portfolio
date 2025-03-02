import { Montserrat } from 'next/font/google';
import type { AppProps } from 'next/app';
import Layout from '../components/layout/Layout';
import '@/styles/globals.css';

const montserrat = Montserrat({ 
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  fallback: ['Georgia', 'serif'],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={montserrat.className}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </div>
  );
}
