import { StoryblokStory } from "@storyblok/react/rsc";
import { fetchStory } from "../../app/utils/fetchStory";

export async function generateStaticParams() {
  return [];
}

type Params = Promise<{ slug?: string[] }>;

export default async function Home({ params }: { params: Params }) {
  const slug = (await params).slug;
  const pageData = await fetchStory("draft", slug);

     if (!pageData?.story) {
       return <p>Loading...</p>; // Handle missing data gracefully
     }

  return <StoryblokStory story={pageData?.story} />;
}
