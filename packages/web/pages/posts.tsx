import { NextPage } from 'next';
import Post from '../views/components/Post';

const Posts: NextPage<{ auth?: boolean }> = ({ auth }) => {
  // console.log(props);
  if (auth) {
    return (
      <div>
        <h2>authed game page</h2>
        <Post />
      </div>
    );
  }

  return (
    <div>
      <h2>hellow. please sign in to see posts.</h2>
    </div>
  );
};

// Posts.getInitialProps = async (req: any) => {
//   return { auth: true };
// };

export default Posts;
