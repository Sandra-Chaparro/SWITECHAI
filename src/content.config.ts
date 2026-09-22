import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const service = defineCollection({
  loader: glob({
    base: './src/content/service',
    pattern: '**/*.{md,mdx}',
  }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      slug: z.string(),
      description: z.string(),
      thumbnail: image().optional(),
      updatedDate: z.coerce.date().optional(),
      featured: z.boolean().default(false),
    }),
});


export const collections = {
  service,
};