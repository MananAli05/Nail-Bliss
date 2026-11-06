import { collection, config, fields } from "@keystatic/core";
import { categories } from "./src/lib/site";

// Edits commit to GitHub in production; locally they write straight to the files.
// Set NEXT_PUBLIC_KEYSTATIC_GITHUB=1 locally once, to run the GitHub App setup.
const useGithub = process.env.NODE_ENV === "production" || process.env.NEXT_PUBLIC_KEYSTATIC_GITHUB === "1";

// Images are stored per post: /images/posts/<slug>/image.jpg
const postImages = { directory: "public/images/posts", publicPath: "/images/posts/" };

export default config({
  storage: useGithub
    ? { kind: "github", repo: { owner: "MananAli05", name: "Nail-Bliss" } }
    : { kind: "local" },
  ui: { brand: { name: "Nail Bliss" } },
  collections: {
    posts: collection({
      label: "Posts",
      slugField: "title",
      path: "content/posts/*",
      format: { contentField: "content" },
      entryLayout: "content",
      columns: ["category", "date"],
      schema: {
        title: fields.slug({
          name: { label: "Title" },
          slug: { label: "URL", description: "Created from the title. Don't change it after publishing." },
        }),
        category: fields.select({
          label: "Category",
          options: categories.map((c) => ({ label: c.name, value: c.slug })),
          defaultValue: "nail-designs",
        }),
        description: fields.text({
          label: "Short description",
          description: "Shown on Google and on post cards. Aim for about 150 characters.",
          multiline: true,
          validation: { isRequired: true },
        }),
        date: fields.date({
          label: "Publish date",
          defaultValue: { kind: "today" },
          validation: { isRequired: true },
        }),
        image: fields.image({
          label: "Pin image",
          description: "Tall 2:3 image (for example 1000 × 1500). Used on the post and for Pinterest.",
          ...postImages,
          validation: { isRequired: true },
        }),
        imageAlt: fields.text({
          label: "Image description (alt text)",
          description: "Describe what's in the photo, e.g. “Glossy burgundy almond nails with a gold ring”.",
          validation: { isRequired: true },
        }),
        cover: fields.image({
          label: "Card photo (optional)",
          description: "Leave empty to use the pin image on cards.",
          ...postImages,
        }),
        pinDescription: fields.text({
          label: "Pinterest text (optional)",
          description: "Text people see when they save the image to Pinterest.",
          multiline: true,
        }),
        seoTitle: fields.text({
          label: "Google title (optional)",
          description: "Shorter title for search results, up to about 60 characters. Leave empty to use the title.",
        }),
        tags: fields.array(fields.text({ label: "Tag" }), {
          label: "Tags",
          itemLabel: (props) => props.value,
        }),
        featured: fields.checkbox({ label: "Feature on the home page" }),
        content: fields.mdx({
          label: "Article",
          extension: "md",
          options: { image: postImages, code: false, codeBlock: false },
        }),
      },
    }),
  },
});
