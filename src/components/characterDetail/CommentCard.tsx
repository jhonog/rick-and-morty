interface CommentCardProps {
    index: number;
    comment: string
}

export const CommentCard = ({ comment, index }: CommentCardProps) => {
    return (
        <div className="flex flex-wrap py-4">
            <span className="text-wrap truncate">
                {index + 1}. {comment}
            </span>
        </div>
    )
}
