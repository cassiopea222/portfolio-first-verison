import type { ReactNode } from "react";

export default function Template({ children }: { children: ReactNode }) {
  return <div className="route-enter route-enter-stagger">{children}</div>;
}
