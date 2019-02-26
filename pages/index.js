import fetch from 'isomorphic-unfetch';
import Error from 'next/error';
import Link from 'next/link';

import Layout from '../layouts/default';
import StoryList from '../components/StoryList';

class Index extends React.Component {

  static async getInitialProps({ req, res, query }) {
    let stories;
    let page;

    try {
      page = Number(query.page) || 1;
      const res = await fetch(`https://node-hnapi.herokuapp.com/news?page=${page}`);
      stories = await res.json();
    } catch (err) {
      console.log(err);
      stories = [];
    }

    return { page, stories };
  }

  render () {
    const { stories, page } = this.props;

    if (stories.length === 0) {
      return <Error statusCode={503} />;
    }

    return (
      <Layout title='Hacker Next' description='A Hacker News clone made with Next.js'>
        <StoryList stories={stories} />
        <footer>
          <Link href={`/?page=${page + 1}`}>
            <a>Next Page ({page + 1})</a>
          </Link>
        </footer>
        <style jsx>{`
          footer {
            padding: 1em;
          }
          footer a {
            font-weight: bold;
            color: black;
            text-decoration: none;
          }
        `}</style>
      </Layout>
    );
  }
}

export default Index;