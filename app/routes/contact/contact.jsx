import { Button } from '~/components/button';
import { DecoderText } from '~/components/decoder-text';
import { Divider } from '~/components/divider';
import { Footer } from '~/components/footer';
import { Heading } from '~/components/heading';
import { Icon } from '~/components/icon';
import { Input } from '~/components/input';
import { Section } from '~/components/section';
import { Text } from '~/components/text';
import { tokens } from '~/components/theme-provider/theme';
import { Transition } from '~/components/transition';
import { useFormInput } from '~/hooks';
import { useRef, useState } from 'react';
import { cssProps, msToNum, numToMs } from '~/utils/style';
import { baseMeta } from '~/utils/meta';
import styles from './contact.module.css';

export const meta = () => {
  return baseMeta({
    title: 'Contato',
    description:
      'Entre em contato comigo pelo WhatsApp para conversar sobre projetos ou ideias.',
  });
};

const MAX_EMAIL_LENGTH = 512;
const MAX_MESSAGE_LENGTH = 4096;

export const Contact = () => {
  const errorRef = useRef();
  const email = useFormInput('');
  const message = useFormInput('');
  const [sent, setSent] = useState(false);

  const initDelay = tokens.base.durationS;

  function handleSubmit(e) {
    e.preventDefault();

    const text = `
Olá! Vim pelo seu portfólio 😊

Email: ${email.value}

Mensagem:
${message.value}
    `;

    const whatsappUrl =
      'https://wa.me/5511917807193?text=' + encodeURIComponent(text);

    setSent(true);
    window.open(whatsappUrl, '_blank');
  }

  return (
    <Section className={styles.contact}>
      <Transition unmount in={!sent} timeout={1600}>
        {({ status, nodeRef }) => (
          <form
            ref={nodeRef}
            className={styles.form}
            onSubmit={handleSubmit}
          >
            <Heading
              className={styles.title}
              data-status={status}
              level={3}
              as="h1"
              style={getDelay(tokens.base.durationXS, initDelay, 0.3)}
            >
              <DecoderText
                text="Entre em contato"
                start={status !== 'exited'}
                delay={300}
              />
            </Heading>

            <Divider
              className={styles.divider}
              data-status={status}
              style={getDelay(tokens.base.durationXS, initDelay, 0.4)}
            />

            <Input
              required
              className={styles.input}
              data-status={status}
              style={getDelay(tokens.base.durationXS, initDelay)}
              autoComplete="email"
              label="Email"
              type="email"
              name="email"
              maxLength={MAX_EMAIL_LENGTH}
              {...email}
            />

            <Input
              required
              multiline
              className={styles.input}
              data-status={status}
              style={getDelay(tokens.base.durationS, initDelay)}
              autoComplete="off"
              label="Mensagem"
              name="message"
              maxLength={MAX_MESSAGE_LENGTH}
              {...message}
            />

            <Button
              className={styles.button}
              data-status={status}
              style={getDelay(tokens.base.durationM, initDelay)}
              icon="send"
              type="submit"
            >
              Enviar no WhatsApp
            </Button>
          </form>
        )}
      </Transition>

      <Transition unmount in={sent}>
        {({ status, nodeRef }) => (
          <div className={styles.complete} aria-live="polite" ref={nodeRef}>
            <Heading
              level={3}
              as="h3"
              className={styles.completeTitle}
              data-status={status}
            >
              Mensagem aberta no WhatsApp
            </Heading>
            <Text
              size="l"
              as="p"
              className={styles.completeText}
              data-status={status}
              style={getDelay(tokens.base.durationXS)}
            >
              Se o WhatsApp não abriu automaticamente, tente novamente.
            </Text>
            <Button
              secondary
              iconHoverShift
              className={styles.completeButton}
              data-status={status}
              style={getDelay(tokens.base.durationM)}
              href="/"
              icon="chevron-right"
            >
              Voltar para o início
            </Button>
          </div>
        )}
      </Transition>

      <Footer className={styles.footer} />
    </Section>
  );
};

function getDelay(delayMs, offset = numToMs(0), multiplier = 1) {
  const numDelay = msToNum(delayMs) * multiplier;
  return cssProps({
    delay: numToMs((msToNum(offset) + numDelay).toFixed(0)),
  });
}
