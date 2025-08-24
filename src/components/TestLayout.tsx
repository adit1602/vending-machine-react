"use client";

import type React from "react";

interface TestLayoutProps {
  children: React.ReactNode;
}

export const TestLayout: React.FC<TestLayoutProps> = ({ children }) => {
  return <div className="test-layout">{children}</div>;
};
