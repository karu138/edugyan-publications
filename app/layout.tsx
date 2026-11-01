import React from 'react';

export const metadata = {
  title: 'Edugyan Publications | Executive Management',
  description: 'Cloud-based school orders and business management'
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body style={{
        margin: 0,
        fontFamily: 'Inter, Arial, sans-serif',
        background: '#f5f7fb',
        color: '#182235'
      }}>
        {children}
      </body>
    </html>
  );
}
