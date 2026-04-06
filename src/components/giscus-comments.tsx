"use client";

import Giscus from "@giscus/react";
import { useTheme } from "next-themes";

export function GiscusComments() {
  const { resolvedTheme } = useTheme();

  return (
    <Giscus
      repo="itsblakeyeon/blog"
      repoId="R_kgDOR6VPtA"
      category="General"
      categoryId="DIC_kwDOR6VPtM4C6I79"
      mapping="pathname"
      strict="0"
      reactionsEnabled="1"
      emitMetadata="0"
      inputPosition="top"
      theme={resolvedTheme === "dark" ? "dark" : "light"}
      lang="ko"
    />
  );
}
