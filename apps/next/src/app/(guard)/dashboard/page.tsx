'use client'
import { Metadata } from 'next';
import layoutTemplate from '../../layout.template';

// Get the metadata provided by Next.js
const metadata: Metadata = {
  title: 'Dashoard',
  description: 'dashboard page',
};

const Page = () => {
  return (
    <div>Dashboard!</div>
  );
};


export default layoutTemplate(Page, { metadata });
