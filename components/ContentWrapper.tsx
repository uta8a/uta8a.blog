import React from 'react';

type Props = { children: React.ReactNode };
export const ContentWrapper: React.FC<Props> = (props: Props) => {
  return <div className="content-wrapper">{props.children}</div>;
};
