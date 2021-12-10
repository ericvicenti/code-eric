import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <p className="hero__subtitle">Hello, Home Page!</p>
      </div>
    </header>
  );
}

export default function Home() {
  return (
    <Layout
      title={''}
      description="code(Eric) is here to experiment with the web!">
      <HomepageHeader />
      <main>
      </main>
    </Layout>
  );
}
