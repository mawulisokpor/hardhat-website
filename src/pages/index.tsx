import HeroBlock from '../components/landingBlocks/HeroBlock';
import WhyHardhatBlock from '../components/landingBlocks/WhyHardhatBlock';

import EmailForm from '../components/landingBlocks/EmailForm';
import homepageContent from '../content/home';
import LandingLayout from '../components/LandingLayout';
import WhatIsNewBlock, { NewsType } from '../components/landingBlocks/WhatIsNewBlock';
import HardhatNews from '../components/landingBlocks/HardhatNews';
import getPosts from '../lib/getPosts';
import getHardHatReleases from '../lib/getHardHatReleases';

type HomePageType = {
  releases: NewsType[];
  posts: [];
};

const Home = ({ releases, posts }: HomePageType) => {
  return (
    <LandingLayout
      seo={{
        title: 'Hardhat',
        description:
          'Hardhat is an Ethereum development environment. Compile your contracts and run them on a development network. Get Solidity stack traces, console.log and more.',
      }}
      sidebarLayout={[]}
    >
      <HeroBlock content={homepageContent.heroBlockContent} />

      <WhyHardhatBlock content={homepageContent.whyHardhatContent} />
      <WhatIsNewBlock content={{ title: homepageContent.whatIsNewBlockContent.title, releases }} />
      <HardhatNews content={{ title: homepageContent.hardhatNewsContent.title, posts }} />
      <EmailForm endpoint={homepageContent.emailFormContent.endpoint} />
      <div style="min-height: 58px;max-width: 440px;margin: 0 auto;width: 100%">
        <script
          src="https://cdn.jsdelivr.net/ghost/signup-form@~0.2/umd/signup-form.min.js"
          data-button-color="#000000"
          data-button-text-color="#FFFFFF"
          data-site="https://blog.nomic.foundation/"
          data-locale="en"
          async
        />
      </div>
    </LandingLayout>
  );
};

export default Home;

export const getStaticProps = async () => {
  const releases = await getHardHatReleases();
  const posts = await getPosts();
  return {
    props: {
      releases,
      posts,
    },
    revalidate: 3600,
  };
};
