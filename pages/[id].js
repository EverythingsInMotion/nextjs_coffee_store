import { useRouter } from "next/router";
import Head from "next/head";

const DynamicPage = () => {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>Dynamic Page - {router.query.id}</title>
      </Head>
      <div>{router.query.id}</div>;
    </>
  );
};

export default DynamicPage;
