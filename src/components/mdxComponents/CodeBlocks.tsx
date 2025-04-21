import React, { useState } from "react";
import { styled } from "linaria/react";
import { media, tm, tmDark, tmSelectors } from "../../themes";

export interface CodeProps {
  children: string | JSX.Element[] | JSX.Element;
}

export interface PreProps {
  children: React.ReactElement;
  className: string;
}

const StyledCode = styled.code`
  padding: 4px 8px;
  background-color: ${tm(({ colors }) => colors.codeBackground)};
  border-radius: 3px;
  font-size: 13.6px;
  font-weight: 400;
  line-height: 1;
  color: ${tm(({ colors }) => colors.codeColor)};
  letter-spacing: 0.05em;

  &[data-language=""] {
    font-family: source-code-pro, Menlo, Monaco, Consolas, Courier New,
      monospace;
    font-weight: normal;
  }

  h1 &,
  h2 &,
  h3 &,
  h4 &,
  h5 & {
    font-size: inherit;
    font-family: inherit;
    font-weight: inherit;
    line-height: inherit;
  }

  ${tmSelectors.dark} {
    background-color: ${tmDark(({ colors }) => colors.codeBlockBackground)};
    color: ${tmDark(({ colors }) => colors.codeColor)};
  }

  ${media.mqDark} {
    ${tmSelectors.auto} {
      background-color: ${tmDark(({ colors }) => colors.codeBlockBackground)};
      color: ${tmDark(({ colors }) => colors.codeColor)};
    }
  }
`;

const StyledPre = styled.pre`
  margin: 16px 0;
  padding: 20px 24px;
  background-color: ${tm(({ colors }) => colors.codeBlockBackground)};
  border-radius: 6px;
  overflow: auto;
  border: 1px solid ${tm(({ colors }) => colors.transparent)};
  position: relative;
  & code {
    padding: 0;
    color: ${tm(({ colors }) => colors.preCodeColor)};
    line-height: 1.4;
    font-size: 0.85em;
    font-family: "Menlo", monospace;
    font-weight: 300;
  }

  & .remark-highlight-code-line {
    display: block;
    min-width: 100%;
    background-color: ${tm(({ colors }) => colors.codeLineHighlight)};
    position: relative;
    &::after {
      content: " ";
      width: 1.2em;
      position: absolute;
      top: 0;
      right: -1.2em;
      background-color: ${tm(({ colors }) => colors.codeLineHighlight)};
    }
    &::before {
      content: " ";
      width: 1.2em;
      position: absolute;
      top: 0;
      left: -1.2em;
      background-color: ${tm(({ colors }) => colors.codeLineHighlight)};
    }
  }

  ${tmSelectors.dark} {
    background-color: ${tmDark(({ colors }) => colors.codeBlockBackground)};
    border: 1px solid ${tmDark(({ colors }) => colors.codeBlockBorder)};
    & code {
      color: ${tmDark(({ colors }) => colors.preCodeColor)};
    }
  }

  ${media.mqDark} {
    ${tmSelectors.auto} {
      background-color: ${tmDark(({ colors }) => colors.codeBlockBackground)};
      border: 1px solid ${tmDark(({ colors }) => colors.codeBlockBorder)};
      & code {
        color: ${tmDark(({ colors }) => colors.preCodeColor)};
      }
    }
  }
`;

const ContentWrapper = styled.span`
  position: relative;
  width: max-content;
  min-width: 100%;
  pre > code & {
    display: block;
  }
`;

const CopyButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: ${tm(({ colors }) => colors.codeBlockBackground)};
  border: 1px solid ${tm(({ colors }) => colors.transparent)};
  border-radius: 4px;
  padding: 6px 12px;
  font-size: 14px;
  cursor: pointer;
  opacity: 0.7;
  transition: all 0.2s;
  color: ${tm(({ colors }) => colors.preCodeColor)};
  z-index: 10;
  
  &:hover {
    opacity: 1;
  }
  
  &[data-copied="true"] {
    opacity: 1;
    background: ${tm(({ colors }) => colors.gray7)};
    color: white;
  }
  
  ${tmSelectors.dark} {
    background: ${tmDark(({ colors }) => colors.codeBlockBackground)};
    border: 1px solid ${tmDark(({ colors }) => colors.codeBlockBorder || colors.transparent)};
    color: ${tmDark(({ colors }) => colors.preCodeColor)};
    
    &[data-copied="true"] {
      background: ${tmDark(({ colors }) => colors.gray7)};
      color: white;
    }
  }
  
  ${media.mqDark} {
    ${tmSelectors.auto} {
      background: ${tmDark(({ colors }) => colors.codeBlockBackground)};
      border: 1px solid ${tmDark(({ colors }) => colors.codeBlockBorder || colors.transparent)};
      color: ${tmDark(({ colors }) => colors.preCodeColor)};
      
      &[data-copied="true"] {
        background: ${tmDark(({ colors }) => colors.gray7)};
        color: white;
      }
    }
  }
`;

const Code = ({ children }: CodeProps) => {
  return (
    <StyledCode>
      <ContentWrapper>{children}</ContentWrapper>
    </StyledCode>
  );
};

const Pre = ({ children, className }: PreProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const code = children.props.children;
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }).catch(err => {
      console.error("Failed to copy text: ", err);
    });
  };

  return (
    <StyledPre className={className}>
      <CopyButton
        onClick={handleCopy}
        data-copied={copied}
      >
        {copied ? "Copied!" : "Copy"}
      </CopyButton>
      {children}
    </StyledPre>
  );
};

const CodeBlocks = {
  Code,
  Pre,
};

export default CodeBlocks;
