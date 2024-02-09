'use client'
import { Metadata } from 'next';
import layoutTemplate from '../../layout.template';

// Get the metadata provided by Next.js
const metadata: Metadata = {
  title: 'Login',
  description: 'auth page',
};

const Page = () => {
  return (
    <div>Login!</div>
  );
};


export default layoutTemplate(Page, { metadata });
