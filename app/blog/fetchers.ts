import fs from 'fs';
import path from 'path';
import { compileMDX } from 'next-mdx-remote/rsc';

const POSTS_PATH = path.join(process.cwd(), 'content/blog');

export async function getPostBySlug(slug: string) {
  const fileName = `${slug}.mdx`;
  const filePath = path.join(POSTS_PATH, fileName);
  const fileContent = fs.readFileSync(filePath, 'utf8');
  const { frontmatter, content } = await compileMDX<{
    title: string;
    description: string;
    publishDate: string;
  }>({
    source: fileContent,
    options: {
      parseFrontmatter: true,
    },
  });
  return { frontmatter, content, slug: path.parse(fileName).name };
}

export async function getAllPosts() {
  const files = fs.readdirSync(POSTS_PATH);
  const posts = await Promise.all(
    files.map(async (file) => await getPostBySlug(path.parse(file).name)),
  );
  return posts;
}

export async function getAllPostSlugs() {
  const files = fs.readdirSync(POSTS_PATH);
  return files.map((file) => ({
    slug: path.parse(file).name,
  }));
}
