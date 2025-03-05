import { storyblokEditable } from "@storyblok/react/rsc";
import ReactMarkdown from "react-markdown";
import Image from "next/image";

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

const Post: React.FC<PostProps> = ({ blok }) => {
  if (!blok) {
    return <p>Loading...</p>;
  }

  return (
    <article {...storyblokEditable(blok)} className="prose prose-lg max-w-full">
      <div className="bg-gray-900 w-full flex justify-center py-8">
        <h1 className="text-7xl font-bold text-white uppercase">
          {blok.title}
        </h1>
      </div>
      <div className="bg-gray-900">
        <div className="container mx-auto p-8">
          <p className="text-xl text-white">{blok.intro}</p>
        </div>
      </div>

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

      {/* CONTENT */}
      <div className="container mx-auto p-8">
        <ReactMarkdown>{blok.content}</ReactMarkdown>
      </div>
    </article>
  );
};

export default Post;
