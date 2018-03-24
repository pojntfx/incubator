import React from "react";
import styled from "styled-components";
import Link from "next/link";

const PostLink = styled(({ className, id, title }) => (
  <li className={className}>
    <Link as={`/p/${id}`} href={`/post?title=${title}`}>
      <a>{title}</a>
    </Link>
  </li>
))`
  margin: 0 0.5rem;
  list-style-type: none;
  white-space: nowrap;
`;

const NavigationWrapper = styled.ul`
  display: flex;
  overflow-x: auto;
`;

const Divider = styled.span`
  margin-left: 1rem;
  background: #000000;
  width: 1px;
  margin-right: 1rem;
`;

const NormalLink = styled.li`
  list-style-type: none;
`;

export default () => (
  <nav>
    <NavigationWrapper>
      <NormalLink>
        <Link href="/">
          <a>Home</a>
        </Link>
      </NormalLink>
      <Divider />
      <PostLink id="hello-nextjs" title="Hello Next.js!" />
      <PostLink id="hello-reactjs" title="Hello ReactJS!" />
      <PostLink id="hello-styled-components" title="Hello Styled Components!" />
      <Divider />
      <NormalLink>
        <Link href="/about">
          <a>About</a>
        </Link>
      </NormalLink>
    </NavigationWrapper>
  </nav>
);
