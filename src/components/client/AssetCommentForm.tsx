import React, { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useCreateComment } from "@/hooks/useAssetComments";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { MessageSquare, Send, Loader2 } from "lucide-react";

interface AssetCommentFormProps {
  assetId: string;
  assetTitle: string;
}

export const AssetCommentForm = ({ assetId, assetTitle }: AssetCommentFormProps) => {
  const { user } = useAuth();
  const [comment, setComment] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const createComment = useCreateComment();

  const handleSubmit = async () => {
    if (!comment.trim() || !user?.id) return;

    await createComment.mutateAsync({
      asset_id: assetId,
      user_id: user.id,
      comment: comment.trim(),
    });

    setComment("");
    setIsExpanded(false);
  };

  if (!isExpanded) {
    return (
      <Button
        variant="outline"
        size="sm"
        onClick={() => setIsExpanded(true)}
        className="gap-2"
      >
        <MessageSquare className="h-4 w-4" />
        Leave Feedback
      </Button>
    );
  }

  return (
    <div className="space-y-3 p-4 bg-muted/30 rounded-lg border border-border/50">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <MessageSquare className="h-4 w-4" />
        <span>Feedback on: {assetTitle}</span>
      </div>
      <Textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Share your thoughts, suggestions, or requests..."
        rows={3}
        className="resize-none"
      />
      <div className="flex justify-end gap-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => {
            setIsExpanded(false);
            setComment("");
          }}
        >
          Cancel
        </Button>
        <Button
          size="sm"
          onClick={handleSubmit}
          disabled={!comment.trim() || createComment.isPending}
        >
          {createComment.isPending ? (
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
          ) : (
            <Send className="h-4 w-4 mr-2" />
          )}
          Send Feedback
        </Button>
      </div>
    </div>
  );
};

export default AssetCommentForm;
