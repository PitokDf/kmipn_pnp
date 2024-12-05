'use client'

import { useSession } from "next-auth/react";

export default function text() {
  const session = useSession();
  console.log(session);
  return (
    <div>
      <h1>{session.data?.user?.name}</h1>
    </div>
  );
}