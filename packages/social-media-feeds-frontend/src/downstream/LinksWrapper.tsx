import styled from "styled-components";
import { HorizontalScrollWrapper } from "@libresat/frontend-components/dist/components";

const LinksWrapper = styled(HorizontalScrollWrapper)`
  &::after {
    padding: 0 !important;
  }
  & > *:first-child {
    margin-left: 0 !important;
  }
  & > *:not(:last-child) {
    margin-right: 1em;
  }
`;

export { LinksWrapper };
