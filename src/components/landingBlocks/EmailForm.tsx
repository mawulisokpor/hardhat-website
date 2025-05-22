import React from "react";
import { styled } from "linaria/react";
import Section from "../Section";
import LandingContainer from "../LandingContainer";
import { media, tm, tmDark, tmSelectors } from "../../themes";
import backgroundImageLight from "../../assets/email-form/bg-light-big.svg";
import backgroundImageDark from "../../assets/email-form/bg-dark-big.svg";
import Lines from "../../assets/email-form/lines";

// Props interface for the component
export interface EmailFormProps {}

// Styled components
const FormSection = styled.section`
  position: relative;
  width: 100%;

  padding: 162px 0;
  background: transparent;
  overflow: hidden;
  margin-top: 100px;
  ${media.tablet} {
    padding: 242px 0;
  }
  ${media.laptop} {
    padding: 529px 0;
    margin-top: 0;
  }
  ${media.desktop} {
    padding: 690px 0;
  }
`;

const BackgroundImage = styled.div<{ image: string; imageDark: string }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  pointer-events: none;
  background-image: ${(props) => `url(${props.image})`};
  background-size: auto 660px;
  background-position: center;
  background-repeat: no-repeat;
  ${tmSelectors.dark} {
    background-image: ${(props) => `url(${props.imageDark})`};
  }
  ${media.mqDark} {
    ${tmSelectors.auto} {
      background-image: ${(props) => `url(${props.imageDark})`};
    }
  }
  ${media.tablet} {
    background-size: auto 860px;
  }
  ${media.laptop} {
    background-size: auto 100%;
  }
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 352px;
  margin: 0 auto;
  gap: 16px;
  padding-top: 48px;
  ${media.tablet} {
    gap: 32px;
    max-width: 377px;
  }
  ${media.laptop} {
    max-width: 665px;
    padding-top: 0;
  }
`;

const FormTitle = styled.h2`
  font-family: "Source Code Pro", monospace;
  font-size: 18px;
  font-weight: 500;
  line-height: 1.35;
  letter-spacing: 0.045em;
  margin: 0;
  text-align: center;
  color: ${tm(({ colors }) => colors.gray9)};

  ${tmSelectors.dark} {
    color: ${tmDark(({ colors }) => colors.gray8b)};
  }
  ${media.mqDark} {
    ${tmSelectors.auto} {
      color: ${tmDark(({ colors }) => colors.gray8b)};
    }
  }
  ${media.tablet} {
    font-size: 20px;
  }
  ${media.laptop} {
    text-align: left;
    font-size: 31px;
  }
  ${media.desktop} {
    font-size: 39px;
  }
`;

const FormRow = styled.form`
  display: flex;
  width: 100%;
  max-width: 665px;
  gap: 32px;
  flex-direction: column;
  align-items: center;

  button.lg {
    height: 44px;
    font-size: 12px;
  }

  ${media.laptop} {
    flex-direction: row;
    button.lg {
      height: 56px;
      font-size: 14px;
    }
  }
  ${media.desktop} {
    button.lg {
      font-size: 16px;
    }
  }
`;

const LinesContainer = styled.div`
  margin-left: auto;
  margin-right: auto;
  width: max-content;
  position: absolute;
  top: 0;
  left: 50%;
  margin-left: -24px;
  .lines {
    stroke: #ededee;
  }
  ${tmSelectors.dark} {
    .lines {
      stroke: #1c1f23;
    }
  }
  ${media.mqDark} {
    ${tmSelectors.auto} {
      .lines {
        stroke: #1c1f23;
      }
    }
  }
`;

const EmailForm: React.FC<EmailFormProps> = () => {
  return (
    <Section clearPadding>
      <LinesContainer>
        <Lines />
      </LinesContainer>
      <FormSection>
        <LandingContainer>
          <BackgroundImage
            image={backgroundImageLight.src}
            imageDark={backgroundImageDark.src}
          />
          <FormContainer>
            <FormTitle>
              Tell me about new product features as they come out
            </FormTitle>
            <FormRow>
              <script
                src="https://cdn.jsdelivr.net/ghost/signup-form@~0.2/umd/signup-form.min.js"
                data-button-color="#000000"
                data-button-text-color="#FFFFFF"
                data-site="https://blog.nomic.foundation/"
                data-locale="en"
                async
              />
              {/*  <InputContainer> */}
              {/*    <Input */}
              {/*      type='email' */}
              {/*      placeholder='email address*' */}
              {/*      value={email} */}
              {/*      onChange={({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => { */}
              {/*        setEmail(value); */}

              {/*        if (error && (validateEmail(value) || value.trim() === '')) { */}
              {/*          setError(''); */}
              {/*        } */}
              {/*      }} */}
              {/*      disabled={isSubmitting} */}
              {/*      aria-label='Email address' */}
              {/*    /> */}
              {/*    {error && <ErrorMessage>{error}</ErrorMessage>} */}
              {/*  </InputContainer> */}
              {/*  <CTA variant='lg' disabled={isSubmitting} onClick={(e) => handleSubmit(e)}> */}
              {/*    {isSubmitting ? 'Submitting...' : 'Get started'} */}
              {/*  </CTA> */}
            </FormRow>
            {/* {isSuccess && <SuccessMessage>Thank you! You are now subscribed to our updates.</SuccessMessage>} */}
          </FormContainer>
        </LandingContainer>
      </FormSection>
    </Section>
  );
};

export default EmailForm;
