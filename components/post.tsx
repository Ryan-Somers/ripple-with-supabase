import {SparklesText} from "@/components/ui/sparkles-text";

interface PostProps {
  id: string;
  title: string;
  content: string;
  author: string;
}

export function Post({ id, title, content, author }: PostProps) {
  return (
      <div>
        <SparklesText text={"Home"}></SparklesText>
    <div key={id} className="border p-4 rounded-lg">
      <h3>{title}</h3>
      <p>{content}</p>
      <p>By: {author}</p>
    </div>
      </div>
  );
} 
