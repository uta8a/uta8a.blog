import React from 'react';
import { ContentWrapper } from '@components/ContentWrapper';

type Props = {
  content?: string;
  title?: string;
  children?: React.ReactNode;
};

export const ContentBody: React.FC<Props> = (props: Props) => {
  return (
    <ContentWrapper>
      <div style={{ margin: '40px 0' }}>
        <header>
          <h1
            style={{
              fontSize: '2.25rem',
              lineHeight: '2.5rem',
              textAlign: 'center',
            }}
          >
            {props.title}
          </h1>
        </header>
        {props.content ? (
          <div
            className="znc"
            dangerouslySetInnerHTML={{
              __html: props.content || '✍ 本文を入力してください',
            }}
          />
        ) : (
          <div className="znc">{props.children}</div>
        )}
      </div>
    </ContentWrapper>
  );
};
