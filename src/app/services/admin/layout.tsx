import { Metadata } from 'next';
import React from 'react';

// 1. Set the Tab Title
// 2. Hide from Search Engines (Security Best Practice)
export const metadata: Metadata = {
  title: 'Admin Portal | GrowShare Capital',
  description: 'Restricted administrative access.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}