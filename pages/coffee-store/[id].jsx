import { useRouter } from "next/router";
import Link from "next/link";
import Head from "next/head";
import Image from "next/image";
import nearMe from "../../public/icons/nearMe.svg";
import places from "../../public/icons/places.svg";
import star from "../../public/icons/star.svg";

import coffeeStoresData from "../../data/coffee-stores.json";

import styles from "../../styles/coffeestore.module.css";

import { fetchCoffeeStores } from "../../lib/coffee-store";

export async function getStaticProps(staticProps) {
  const params = staticProps.params;
  const coffeeStores = await fetchCoffeeStores();
  const findCoffeeStoresById = coffeeStores.find((coffeeStore) => {
    return coffeeStore.id.toString() === params.id; //dynamic id
  });
  return {
    props: {
      coffeeStore: findCoffeeStoresById ? findCoffeeStoresById : {},
    },
  };
}

export async function getStaticPaths() {
  const coffeeStores = await fetchCoffeeStores();
  const paths = coffeeStores.map((coffeeStore) => {
    return {
      params: {
        id: coffeeStore.id.toString(),
      },
    };
  });
  return {
    paths,
    fallback: true,
  };
}

const CoffeeStore = (props) => {
  const router = useRouter();
  if (router.isFallback) {
    return <div>Loading...</div>;
  }
  const { name, address, neighbourhood, imgUrl } = props.coffeeStore;

  const handleUpvoteButton = () => {};

  return (
    <div className={styles.layout}>
      <Head>
        <title>{name}</title>
      </Head>
      <div className={styles.container}>
        <div className={styles.col1}>
          <div className={styles.backToHomeLink}>
            <Link href="/">← Back to home</Link>
          </div>
          <div className={styles.nameWrapper}>
            <h1 className={styles.name}>{name}</h1>
          </div>
          <Image
            src={
              imgUrl ||
              "https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
            }
            width={600}
            height={360}
            className={styles.storeImg}
            alt={name}
          />
        </div>

        <div className={`glass ${styles.col2}`}>
          {address && (
            <div className={styles.iconWrapper}>
              <Image src={places} width="24" height="24" />
              <p className={styles.text}>{address}</p>
            </div>
          )}
          {neighbourhood && (
            <div className={styles.iconWrapper}>
              <Image src={places} width="24" height="24" />
              <p className={styles.text}>{neighbourhood}</p>
            </div>
          )}
          <div className={styles.iconWrapper}>
            <Image src={star} width="24" height="24" />
            <p className={styles.text}>1</p>
          </div>

          <button className={styles.upvoteButton} onClick={handleUpvoteButton}>
            Up vote!
          </button>
        </div>
      </div>
    </div>
  );
};

export default CoffeeStore;
