import { NextPage } from 'next';
import { Page } from '../components/Page';

const Index: NextPage<{ test: null | string }> = ({ test }) => (
  <Page>
    <h1>Partybet? Haha. Nej. {test}</h1>
  </Page>
);

Index.getInitialProps = async ({ req }) => {
  const test = 'Null';
  return { test };
};

export default Index;
