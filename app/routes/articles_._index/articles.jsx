import { Button } from '~/components/button';
import { Divider } from '~/components/divider';
import { Footer } from '~/components/footer';
import { Heading } from '~/components/heading';
import { Image } from '~/components/image';
import { Section } from '~/components/section';
import { Text } from '~/components/text';
import { useReducedMotion } from 'framer-motion';
import { Link as RouterLink, useLoaderData } from '@remix-run/react';
import { useState } from 'react';
import { cssProps } from '~/utils/style';
import styles from './articles.module.css';

function FeaturedPost({ slug, frontmatter }) {
  const [hovered, setHovered] = useState(false);
  const reduceMotion = useReducedMotion();
  const { title, abstract, banner } = frontmatter;

  return (
    <article className={styles.post} data-featured="true">
      <Text className={styles.postLabel} size="s">
        Penguin&apos;s
      </Text>

      {banner && (
        <div className={styles.postImage}>
          <Image
            noPauseButton
            play={!reduceMotion ? hovered : undefined}
            src={banner}
            placeholder={`${banner.split('.')[0]}-placeholder.jpg`}
            alt=""
            role="presentation"
          />
        </div>
      )}

      <RouterLink
        unstable_viewTransition
        prefetch="intent"
        to={`/articles/${slug}`}
        className={styles.postLink}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div className={styles.postDetails}>
          <div aria-hidden className={styles.postDate}>
            <Divider notchWidth="64px" notchHeight="8px" />
            Saiba mais sobre nós
          </div>

          <Heading as="h1" level={2}>
            {title}
          </Heading>

          <Text size="l" as="p">
            {abstract}
          </Text>

          <div className={styles.postFooter}>
            <Button secondary iconHoverShift icon="chevron-right" as="div">
              Nossos Serviços
            </Button>

            <Text className={styles.timecode} size="s">
              Web Sites
            </Text>
          </div>
        </div>
      </RouterLink>

      <Text aria-hidden className={styles.postTag} size="s">
        Marketing
      </Text>
    </article>
  );
}

export function Articles() {
  const { featured } = useLoaderData();

  return (
    <article className={styles.articles}>
      <Section className={styles.content}>
        <FeaturedPost {...featured} />
      </Section>
      <Footer />
    </article>
  );
}
