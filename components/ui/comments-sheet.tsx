import {useEffect, useRef, useState} from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea'; // Assuming ShadCN UI includes Textarea component
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetDescription,
    SheetFooter,
    SheetTrigger,
} from '@/components/ui/sheet';
import { addComment } from '@/app/protected/home/actions';
import { fetchCommentsByPost } from "@/app/protected/home/actions";

interface CommentSheetProps {
    postId: string;  // Assuming postId is a string, adjust if needed
    isOpen: boolean; // Boolean to track if the comment sheet is open
    onClose: () => void; // Function to close the comment sheet
}

interface Comment {
    id: string;
    user_id: string;
    post_id: string;
    content: string;
    created_at: string;
    full_name?: string;  // Assuming these fields might be available
    avatar_url?: string;
}


export function CommentSheet({ postId, isOpen, onClose }: CommentSheetProps) {
    const [newComment, setNewComment] = useState('');
    const textareaRef = useRef<HTMLTextAreaElement | null>(null);
    const [comments, setComments] = useState<Comment[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const handleTextareaClick = () => {
        // Focus the textarea manually when the user clicks it
        if (textareaRef.current) {
            textareaRef.current.focus();
        }
    };
    // Fetch comments when the postId or isOpen changes
    useEffect(() => {
        const loadComments = async () => {
            if (isOpen && postId) {
                try {
                    const fetchedComments = await fetchCommentsByPost(postId);
                    setComments(fetchedComments); // Set the fetched comments
                } catch (error) {
                    console.error("Error fetching comments:", error);
                } finally {
                    setIsLoading(false);
                }
            }
        };

        loadComments();
    }, [postId, isOpen]); // Re-run when postId or isOpen changes

    const handleCommentSubmit = async () => {
        if (newComment.trim()) {
            try {
                const formData = new FormData();
                formData.append('comment', newComment);

                const response = await addComment(formData, postId);

                const { message, comment } = response;

                    setComments((prevComments) => [...prevComments]);
                    setNewComment('');
                } catch (error) {
                console.error('Error adding comment:', error);
            }
        }
    };



    return (
        <Sheet open={isOpen} onOpenChange={onClose}>
            <SheetTrigger asChild>
                {/* You can trigger the sheet with any button or action */}
            </SheetTrigger>
            <SheetContent side={"bottom"}>
                <SheetHeader>
                    <SheetTitle>Comments</SheetTitle>
                    <SheetDescription>
                        Add a comment or view existing ones below.
                    </SheetDescription>
                </SheetHeader>

                <div className="overflow-y-scroll max-h-[300px]">
                    {comments.length === 0 ? (
                        <p>No comments yet. Be the first to comment!</p>
                    ) : (
                        comments.map((comment) => (
                            <div key={comment.id} className="flex items-center gap-2 mb-2">
                                <img
                                    src={comment.avatar_url}
                                    alt="User avatar"
                                    className="w-8 h-8 rounded-full"
                                />
                                <div>
                                    <p className="font-semibold">{comment.full_name || 'Unknown User'}</p>
                                    <p className="text-sm">{comment.content}</p>
                                </div>
                            </div>

                        ))
                    )}
                </div>

                {/* Textarea and submit button */}
                <div className="grid gap-4 py-4">
                    <Textarea
                        value={newComment}
                        ref={textareaRef} // Attach the ref to the textarea/input
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Add a comment..."
                        onClick={handleTextareaClick}
                        rows={3}
                        className="w-full"
                    />
                </div>

                <SheetFooter>
                    <SheetClose asChild>
                        <Button onClick={handleCommentSubmit} type="submit" className="w-full">
                            Submit Comment
                        </Button>
                    </SheetClose>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    );
}
