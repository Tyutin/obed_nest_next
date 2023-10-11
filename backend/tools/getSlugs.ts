import slugify from 'slugify';

export const getSlugs = (title: string): { slug: string; slugRu: string } => {
  const slug = slugify(title.replace(/[^a-zA-Zа-яА-Я0-9 ]+/g, ''), {
    lower: true,
  });
  const slugRu = title
    .replace(/[^a-zA-Zа-яА-Я0-9 ]+/g, '')
    .trim()
    .replace(/\s/g, '-')
    .toLowerCase();
  return { slug, slugRu };
};
