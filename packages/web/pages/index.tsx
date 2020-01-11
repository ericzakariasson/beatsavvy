import { NextPage } from 'next';
import { withApollo } from '../graphql/withApollo';

interface Props {
  auth: boolean;
  timeout?: any;
}

const Index: NextPage<Props> = ({ auth }) => {
  if (auth) {
    return (
      <div>
        <h2>welcome erik</h2>
      </div>
    );
  }

  return (
    <div>
      <h2>hellow. please sign in.</h2>
    </div>
  );
};

Index.getInitialProps = async (req: any) => {
  return { auth: true };
};

export default withApollo(Index);
