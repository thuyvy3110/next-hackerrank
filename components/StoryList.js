import Link from 'next/link';

const StoryList = ({ stories }) => {
  return (
    <div className='story-list'>
      {stories.map(story => (
        <div className='story' key={story.id}>
          <h2 className='story-title'>
            <a href={story.url}>{story.title}</a>
          </h2>
          <div className='story-details'>
            <p>{story.points || 0} points</p>
            <Link href={`/story?id=${story.id}`}>
              <a>{story.comments_count || 0} comments</a>
            </Link>
          </div>
        </div>
      ))}
      <style jsx>{`
        .story-list {
          padding: 0 1rem;
        }
        .story {
          padding: 1em 0;
          border: 1px solid navy;
          margin: 1rem auto;
          padding: 1em;
        }
        .story-title {
          font-size: 1rem;
          font-weight: 400;
          margin: 0;
          margin-bottom: 0.5;
        }
      `}</style>
    </div>
  );
};

export default StoryList;