// import { SideBar } from '@components/SideBar';
// import { NavCollections } from '@types';
import React, { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  // navCollections: NavCollections;
};

export const MainContainer: React.FC<Props> = (props: Props) => {
  return (
    <div className="main-container">
      {/* <div className="main-sidebar">
        <SideBar navCollections={navCollections} />
      </div> */}
      <main className="main-content">{props.children}</main>
    </div>
  );
};
