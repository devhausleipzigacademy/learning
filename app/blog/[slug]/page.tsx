import { getAllPostSlugs, getPostBySlug } from '../fetchers';

export async function generateStaticParams() {
  const slugs = await getAllPostSlugs();
  return slugs;
}

export default async function Page({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug);
  return (
    <>
      <h1 className="text-4xl font-bold mb-6">{post.frontmatter.title}</h1>
      <div className="h-px bg-foreground/20 mb-6" />
      <article className="prose">{post.content}</article>
    </>
  );
}
