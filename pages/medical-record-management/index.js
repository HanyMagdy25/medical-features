import Head from "next/head";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import SingleFeature from "@/src/components/SingleFeature/SingleFeature";
import MedicalRecordManagement from "@/src/components/MedicalRecordManagement/MedicalRecordManagement";
// import { useRouter } from "next/router";

const inter = Inter({ subsets: ["latin"] });

export default function SingleFeaturePage() {
  return (
    <>
      <Head>
        <title>Single Feature</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${styles.main} ${inter.className}`}>
        <div className="container">
          <SingleFeature />
          <MedicalRecordManagement />
        </div>
      </main>
    </>
  );
}
