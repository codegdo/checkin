'use client'
import { Metadata } from 'next';
import templateLayout, { LayoutContext } from './layout.template';
import { useContext } from 'react';

// Get the metadata provided by Next.js
const metadata: Metadata = {
  title: 'HOME',
  description: 'Generated by create next app',
};

const Page = () => {
  const context = useContext(LayoutContext);

  console.log(context);

  return (
    <div>Welcome to the Page!</div>
  );
};


export default templateLayout(Page, { metadata });
