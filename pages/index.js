import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Dashboard from "../components/Dashboard";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Spotify-R | Dashboard</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Dashboard />
    </div>
  );
}
