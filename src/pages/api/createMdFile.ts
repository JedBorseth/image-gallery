import type { APIRoute } from "astro";
import fs from "fs";
export const prerender = false;

export const POST: APIRoute = async req => {
  const formData = await req.request.formData();
  const tags = formData.get("tags")?.toString().split(", ");
  const content = `--- \n
  author: ${formData.get("author")} \n
  pubDatetime: ${new Date().toISOString()} \n
  title: ${formData.get("title")} \n
  featured: false \n
  draft: false \n
  imgURL: ${formData.get("img-url")} \n
  tags: \n${tags?.map(tag => `  - ${tag}`).join("\n")} \n
  description: ${formData.get("desc")} \n---

\n![${formData.get("title")}](${formData.get("img-url")}) \n
  `;
  fs.writeFile(
    `./src/content/blog/${encodeURI(formData.get("title")?.toString() ?? "no title")}.md`,
    content,
    err => {
      return new Response(
        JSON.stringify({
          message: err?.message,
        }),
        { status: 500 }
      );
    }
  );

  return new Response(
    JSON.stringify({
      message: "Success!",
    }),
    { status: 200 }
  );
};
