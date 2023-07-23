'use client';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export const Nav: React.FC = () => {
  const pathname = usePathname();

  return (
    <nav>
      <ul>
        <li>
          <Link href="/images" className={pathname.includes('images') ? 'active' : ''}>
            Images
          </Link>
        </li>
        <li>
          <Link href="/predictions" className={pathname.includes('predictions') ? 'active' : ''}>
            Predictions
          </Link>
        </li>
      </ul>
    </nav>
  );
};
