"use client"
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import rehypeHighlight from "rehype-highlight";
import rehypeRaw from "rehype-raw";
import { useEffect, useState } from "react";
import { storyblokEditable } from "@storyblok/react/rsc";
import Image from "next/image";
import "highlight.js/styles/github-dark.css";

type ImageType = {
  filename: string;
};

type Blok = {
  _uid: string;
  title: string;
  intro: string;
  content: string;
  image?: ImageType[];
  component: string;
  _editable?: string;
};

type PostProps = {
  blok?: Blok;
};

const processMarkdown = async (content: string) => {
  const result = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypeHighlight) // Syntax highlighting
    .use(rehypeStringify)
    .process(content);

  return result.toString();
};

const Post: React.FC<PostProps> = ({ blok }) => {
  const [htmlContent, setHtmlContent] = useState("");

  useEffect(() => {
    if (blok?.content) {
      processMarkdown(blok.content).then((html) => {
        setHtmlContent(html);
      });
    }
  }, [blok]);

  if (!blok) {
    return <p>Loading...</p>;
  }

  return (
    <article {...storyblokEditable(blok)} className="prose prose-lg max-w-full">
      {/* Header Section */}
      <div className="bg-gray-900 w-full flex justify-center py-8">
        <h1 className="text-7xl font-bold text-white uppercase">
          {blok.title}
        </h1>
      </div>

      {/* Intro Section */}
      <div className="bg-gray-900">
        <div className="container mx-auto p-8">
          <p className="text-xl text-white">{blok.intro}</p>
        </div>
      </div>

      {/* Image Section */}
      <div className="bg-gray-900 w-full flex justify-center py-8">
        <div className="relative w-full max-w-6xl h-[60vh] md:h-[70vh] lg:h-[80vh]">
          {blok.image?.length ? (
            <Image
              src={blok.image[0].filename}
              alt={blok.title}
              fill
              sizes="100vw"
              className="object-cover rounded-lg"
            />
          ) : null}
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto p-8 prose prose-invert">
        <div
          className=" p-4 rounded-lg overflow-x-auto"
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />
      </div>
    </article>
  );
};

export default Post;
