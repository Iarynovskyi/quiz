import React, { ReactElement } from 'react';
import Link from 'next/link';

export default function Main(): ReactElement {
  return <Link href={'/quizzes'}> Go to Quizzes</Link>;
}
