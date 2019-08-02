/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import React from 'react';
import { Link, graphql } from 'gatsby';

import Layout from '../components/layout';
import SEO from '../components/seo';
import { rhythm } from '../utils/typography';

const EventsItem = ({ node, title, primaryImage }) => (
	<div>
		<h2 css={css`margin-bottom: ${rhythm(1 / 4)};`}>
			<Link style={{ boxShadow: `none` }} to={node.fields.slug}>
				{title}
			</Link>
		</h2>
		<small
			css={css`
				margin-bottom: ${rhythm(1 / 4)};
				display: block;
				color: rgba(0, 0, 0, 0.7);
			`}
		>
			{node.frontmatter.eventDate}
		</small>
		<p
			dangerouslySetInnerHTML={{
				__html: node.frontmatter.description || node.excerpt
			}}
		/>
		{primaryImage && (
			<Link to={node.fields.slug}>
				<img src={primaryImage} alt='' />
			</Link>
		)}
	</div>
);

class Events extends React.Component {
	render() {
		const { data } = this.props;
		const siteTitle = data.site.siteMetadata.title;
		const events = data.events.edges;

		return (
			<Layout location={this.props.location} title={siteTitle}>
				<SEO title='Events' />
				<div css={css`margin-bottom: ${rhythm(2)};`}>
					<h1>Events</h1>

					{events.map(({ node }) => {
						const title = node.frontmatter.title || node.fields.slug;
						const primaryImage = node.frontmatter.primaryImage;
						return (
							<EventsItem node={node} key={node.fields.slug} title={title} primaryImage={primaryImage} />
						);
					})}
				</div>
			</Layout>
		);
	}
}

export default Events;

export const pageQuery = graphql`
	query {
		site {
			siteMetadata {
				title
			}
		}
		events: allMarkdownRemark(
			filter: { frontmatter: { type: { eq: "events" } } }
			sort: { fields: [frontmatter___date], order: DESC }
		) {
			edges {
				node {
					excerpt
					fields {
						slug
					}
					frontmatter {
						eventDate(formatString: "MMMM DD, YYYY")
						title
						primaryImage
						description
						type
					}
				}
			}
		}
	}
`;
