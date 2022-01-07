import React from 'react';
import data from '../../.docusaurus/docusaurus-plugin-content-blog/default/blog-post-list-prop-default.json'

export default function RecentPosts() {
    return (
      <div>
        {data.items.map(post => <h3><a href={post.permalink}>{post.title}</a></h3>)}
      </div>
    );
  }
  