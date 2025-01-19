"use client";

import { cn } from "@/lib/utils";
import {
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
  MoreHorizontal,
  Link as LinkIcon,
} from "lucide-react";
import {useEffect, useState} from "react";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "./dropdown-menu";
import { CommentSheet } from '@/components/ui/comments-sheet'; // Import the CommentSheet component
import {addLike, getLikes} from "@/app/protected/home/actions"; // Import the addLike function


interface SocialCardProps {
  author?: {
    id?: string;
    name?: string;
    username?: string;
    avatar?: string;
    timeAgo?: string;
  };
  content?: {
    text?: string;
    link?: {
      title?: string;
      description?: string;
      icon?: React.ReactNode;
    };
  };
  engagement?: {
    likes?: number;
    comments?: number;
    shares?: number;
    isLiked?: boolean;
    isBookmarked?: boolean;
  };
  onLike?: () => void;
  onComment?: () => void;
  onShare?: () => void;
  onBookmark?: () => void;
  onMore?: () => void;
  className?: string;
  authenticationUserId?: string,
  postId?: string,
}

export function SocialCard({
  authenticationUserId,
  author,
  content,
  engagement,
  onLike,
  onComment,
  onShare,
  onBookmark,
  onMore, postId,
  className
}: SocialCardProps) {

  // Check if the authenticated user matches the post author
  const isAuthenticatedUser = authenticationUserId === author?.id;

  const [isCommentSheetOpen, setIsCommentSheetOpen] = useState(false);

  const handleCommentButtonClick = () => {
    setIsCommentSheetOpen(true); // Open the CommentSheet
  };

  const closeCommentSheet = () => {
    setIsCommentSheetOpen(false); // Close the CommentSheet
  };

  const [isLiked, setIsLiked] = useState<boolean>(engagement?.isLiked ?? false);
  const [isBookmarked, setIsBookmarked] = useState<boolean>(engagement?.isBookmarked ?? false);
  const [likes, setLikes] = useState<number>(engagement?.likes ?? 0);

  useEffect(() => {
    const fetchLikes = async () => {
      if (!postId) return; // Handle case where postId might be undefined

      // Fetch likes data including the user's like status
      const { success, likes, isUserLiked, message } = await getLikes(postId);

      console.log("Likes:", likes);
      if (success) {
        setLikes(likes ?? 0); // Ensure likes is a number (fallback to 0 if undefined)
        setIsLiked(isUserLiked ?? false); // Ensure isUserLiked is a boolean (fallback to false if undefined)
      } else {
        console.error(message);
      }
    };

    fetchLikes();
  }, [postId]);

  const handleLike = async () => {
    const newIsLiked = !isLiked;
    setIsLiked(newIsLiked);
    setLikes(prev => newIsLiked ? prev + 1 : prev - 1);

    try {
      const { success, message } = await addLike(postId ?? "", author?.id ?? "", newIsLiked);
      if (!success) {
        throw new Error(message);
      }
      console.log(message);
    } catch (error) {
      console.error('Error while updating like:', error);
    }

    onLike?.(); // Optional: Trigger the callback if provided
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    onBookmark?.();
  };

  return (
    <div
      className={cn(
        "w-full max-w-2xl mx-auto",
        "bg-white dark:bg-zinc-900",
        "border border-zinc-200 dark:border-zinc-800",
        "rounded-3xl shadow-xl",
        className
      )}
    >
      <div className="divide-y divide-zinc-200 dark:divide-zinc-800">
        <div className="p-6">
          {/* Author section */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <img
                src={author?.avatar}
                alt={author?.name}
                className="w-10 h-10 rounded-full ring-2 ring-white dark:ring-zinc-800"
              />
              <div>
                <h3 className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                  {author?.name}
                </h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  @{author?.username} · {author?.timeAgo}
                </p>
              </div>
            </div>
            {/* Only render the "More" button if the authenticated user is the post author */}
            {isAuthenticatedUser && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full">
                      <MoreHorizontal className="w-5 h-5 text-zinc-400" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>Edit Post</DropdownMenuItem>
                    <DropdownMenuItem>Delete Post</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
            )}
          </div>

          {/* Content section */}
          <p className="text-zinc-600 dark:text-zinc-300 mb-4">
            {content?.text}
          </p>

          {/* Link preview */}
          {content?.link && (
            <div className="mb-4 rounded-2xl border border-zinc-200 dark:border-zinc-700 overflow-hidden">
              <div className="p-4 bg-zinc-50 dark:bg-zinc-800/50">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-white dark:bg-zinc-700 rounded-xl">
                    {content.link.icon}
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                      {content.link.title}
                    </h4>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">
                      {content.link.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Engagement section */}
          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center gap-6">
              <button
                type="button"
                onClick={handleLike}
                className={cn(
                  "flex items-center gap-2 text-sm transition-colors",
                  isLiked
                    ? "text-rose-600"
                    : "text-zinc-500 dark:text-zinc-400 hover:text-rose-600"
                )}
              >
                <Heart
                  className={cn(
                    "w-5 h-5 transition-all",
                    isLiked && "fill-current scale-110"
                  )}
                />
                <span>{likes}</span>
              </button>
              {/* Comment button */}
              <button
                  type="button"
                  onClick={handleCommentButtonClick}
                  className="flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400 hover:text-blue-500 transition-colors"
              >
                <MessageCircle className="w-5 h-5" />
                <span>{engagement?.comments}</span>
              </button>

              {/* CommentSheet (conditional rendering) */}
              <CommentSheet
                  postId={postId ?? ""}
                  isOpen={isCommentSheetOpen}
                  onClose={closeCommentSheet}
              />
              <button
                type="button"
                onClick={onShare}
                className="flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400 hover:text-green-500 transition-colors"
              >
                <Share2 className="w-5 h-5" />
                <span>{engagement?.shares}</span>
              </button>
            </div>
            <button
              type="button"
              onClick={handleBookmark}
              className={cn(
                "p-2 rounded-full transition-all",
                isBookmarked 
                  ? "text-yellow-500 bg-yellow-50 dark:bg-yellow-500/10" 
                  : "text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800"
              )}
            >
              <Bookmark className={cn(
                "w-5 h-5 transition-transform",
                isBookmarked && "fill-current scale-110"
              )} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
