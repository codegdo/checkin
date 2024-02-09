
import { Inter } from 'next/font/google';
import Link from 'next/link';
import htmlReactParser, { DOMNode } from 'html-react-parser';
import { Metadata } from 'next';
import { ReactNode } from 'react';

const inter = Inter({ subsets: ['latin'] });

export interface LayoutParams {
  metadata?: Metadata
}

interface LayoutProps {
  children: ReactNode;
  params?: LayoutParams;
}

const RootLayout = ({ children, params = {} }: LayoutProps) => {
  const { metadata } = params;
  const title = typeof metadata?.title === 'string' ? metadata?.title : 'Default Title';

  // Define the HTML string with a placeholder for children
  const htmlString = `<div>
    <nav>
      <a href="/">Home</a>
      <a href="/dashboard">Dashboard</a>
      <a href="/login">Login</a>
    </nav>
    <div id="jsx_content"></div>
  </div>`;

  // Parse the HTML string and replace the placeholder with children
  const content = htmlReactParser(htmlString, {
    replace: (domNode) => {

      if (domNode && 'attribs' in domNode && domNode.attribs.id === 'jsx_content') {
        return <>{children}</>;
      }

      if (domNode && 'attribs' in domNode && domNode.name === 'a') {
        const href = domNode.attribs.href || '';
        const textContent = getTextContent(domNode);
        return <Link href={href}>{textContent}</Link>
      }
      return domNode;
    },
  });

  return (
    <html lang="en">
      <head>
        <title>{title}</title>
        {/* Add other meta tags, styles, scripts, etc. */}
      </head>
      <body>

        {metadata ? content : children}

      </body>
    </html>
  );
};

// Helper function to get text content safely
const getTextContent = (domNode: any): string => {
  if (domNode && domNode.children && domNode.children[0] && domNode.children[0].data) {
    return domNode.children[0].data;
  }
  return '';
};

// Check if the DOM node is a content node
const isContentHolder = (domNode: DOMNode): boolean =>
  domNode && 'attribs' in domNode && domNode.attribs.id === 'jsx_content';

// Check if the DOM node is a link node
const isLinkNode = (domNode: Element): boolean =>
  domNode && 'attribs' in domNode && domNode.getAttribute('href') !== null;

export default RootLayout;
