import Head from "next/head";
import Link from "next/link";
import { getDatabase } from "../lib/notion";
import { Text } from "./[id].js";
import styles from "./index.module.css";
import { Card, Image, Grid } from "@mantine/core";

export const databaseId = process.env.NOTION_DATABASE_ID;

export default function Home({ posts }) {
  return (
    <div>
      <Head>
        <title>Notion Next.js blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.container}>
        <header className={styles.header}>
          <div className={styles.logos}>
            <img src="/logo.svg" alt="Notion Next.js blog" width={500} />
          </div>
          <p className={styles.ddsadsa}>
            建築を中心として、3Dモデリング、IoT、デジタルファブリケーション、Webなどの様々なテクノロジーに関する記事を提供しています。
          </p>
        </header>

        <h2 className={styles.heading}>最近の投稿</h2>

        <Grid gutter={5} gutterXs="md" gutterMd="xl" gutterXl={50}>
          {posts.map((post) => {
            const date = new Date(post.last_edited_time).toLocaleString(
              "en-US",
              {
                month: "short",
                day: "2-digit",
                year: "numeric",
              }
            );
            return (
              <Grid.Col span={4} columns={3}>
                <Card
                  shadow="sm"
                  padding="md"
                  component="a"
                  href={`/${post.id}`}
                >
                  <Card.Section>
                    <Image
                      src="https://images.unsplash.com/photo-1579227114347-15d08fc37cae?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2550&q=80"
                      height={160}
                      alt="No way!"
                    />
                  </Card.Section>
                  <div className={styles.postTitle}>
                    <Text text={post.properties.Name.title} />
                  </div>
                  <div>
                    <p className={styles.postDescription}>{date}</p>
                  </div>
                </Card>
              </Grid.Col>
            );
          })}
        </Grid>
      </main>
    </div>
  );
}

export const getStaticProps = async () => {
  const database = await getDatabase(databaseId);

  return {
    props: {
      posts: database,
    },
    revalidate: 1,
  };
};
