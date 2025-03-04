import { storyblokEditable } from "@storyblok/react/rsc";
import ReactMarkdown from "react-markdown";
import Image from "next/image";

type ImageType = {
  filename: string;
};

type Blok = {
  _uid: string;
  title: string;
  content: string;
  image?: ImageType[];
  component: string;
  _editable?: string;
};

type PostProps = {
  blok?: Blok;
};

const Post: React.FC<PostProps> = ({ blok }) => {
  if (!blok) {
    return <p>Loading...</p>;
  }

  return (
    <article {...storyblokEditable(blok)} className="prose prose-lg max-w-full">
      <h1>{blok.title}</h1>
      {blok.image?.length ? (
        <div className="relative w-full h-64">
          <Image
            src={blok.image[0].filename}
            alt={blok.title}
            width={500}
            height={500}
            sizes="(max-width: 1538px) 100vw, 1504px"
          />
        </div>
      ) : null}
      <ReactMarkdown>{blok.content}</ReactMarkdown>
    </article>
  );
};

export default Post;
