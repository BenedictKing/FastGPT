import React, { useMemo } from 'react';
import { Box, Link } from '@chakra-ui/react';
import ReactMarkdown from 'react-markdown';
import RemarkGfm from 'remark-gfm';
import RemarkMath from 'remark-math';
import RehypeKatex from 'rehype-katex';
import { event } from '@/utils/plugin/eventbus';

import 'katex/dist/katex.min.css';
import styles from '../index.module.scss';
import Image from '../img/Image';

function MyLink(e: any) {
  const href = e.href;
  const text = String(e.children);

  return !!href ? (
    <Link href={href} target={'_blank'}>
      {text}
    </Link>
  ) : (
    <Box as={'ul'}>
      <Box as={'li'}>
        <Box
          as={'span'}
          color={'blue.600'}
          textDecoration={'underline'}
          cursor={'pointer'}
          onClick={() => {
            event.emit('guideClick', { text });
          }}
        >
          {text}
        </Box>
      </Box>
    </Box>
  );
}

const Guide = ({ text }: { text: string }) => {
  const formatText = useMemo(() => text.replace(/\[(.*?)\]($|\n)/g, '[$1]()\n'), [text]);

  return (
    <ReactMarkdown
      className={`markdown ${styles.markdown}`}
      remarkPlugins={[RemarkGfm, RemarkMath]}
      rehypePlugins={[RehypeKatex]}
      components={{
        a: MyLink,
        img: Image
      }}
    >
      {formatText}
    </ReactMarkdown>
  );
};

export default React.memo(Guide);
