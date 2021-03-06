import React, { FC, useEffect, useState } from "react";
import { ReactComponent as ArrowUp } from "../../assets/svg/arrow-up-bold.svg";
import { ReactComponent as ArrowDown } from "../../assets/svg/arrow-down-bold.svg";
import { ReactComponent as PlusIcon } from "../../assets/svg/plus.svg";

import { Comment } from "../../models/comment";
import styled from "styled-components";
import { Data } from "../../models/api";
import Flex from "../../components/flex";

import millify from "millify";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/configureStore";
import { loadMoreComments, vote } from "../../slices/posts/thunks";
import { convertVoteFromReddit } from "../../slices/posts/slice";
import { useTheme } from "../../contexts/theme/useTheme";
import { APP_URL } from "../../env";
import Markdown from "../../components/markdown-renderer";

interface Props {
  commentId: string;
  isMaster?: boolean;
}

const CommentCell: FC<Props> = ({ commentId, isMaster = true }) => {
  const comment = useSelector(
    (state: RootState) => state.entities.comments.byId[commentId]
  );
  const [collapsed, setCollapsed] = useState(comment?.score <= -10);
  const dispatch = useDispatch();
  const { theme } = useTheme();

  if (!comment || !comment.body) return null;
  const currentVote = convertVoteFromReddit(comment.likes);

  const handleUpvoteClick = () => {
    dispatch(vote(comment.id, comment.name, "comment", "upvote"));
  };

  const handleDownvoteClick = () => {
    dispatch(vote(comment.id, comment.name, "comment", "downvote"));
  };

  const loadMoreReplies = (moreId: string) => {};

  const renderReply = (replyData: Data<Comment>) => (
    <CommentCell commentId={replyData.data.id} isMaster={false} />
  );

  const renderLineAndVoter = () =>
    !collapsed ? (
      <>
        <VoteContainer>
          <ArrowUp
            width="13px"
            height="13px"
            fontSize="13px"
            style={{
              cursor: "pointer",
              fill: currentVote === "upvote" ? theme.orange : theme.textColor,
            }}
            onClick={handleUpvoteClick}
          />
          <ArrowDown
            width="13px"
            height="13px"
            fontSize="13px"
            style={{
              cursor: "pointer",
              fill: currentVote === "downvote" ? theme.orange : theme.textColor,
              marginTop: 3,
            }}
            onClick={handleDownvoteClick}
          />
        </VoteContainer>
        <Line onClick={() => setCollapsed(true)} />
      </>
    ) : (
      <PlusIcon
        onClick={() => setCollapsed(false)}
        width="13px"
        height="13px"
        style={{ marginLeft: -5, marginTop: 3, cursor: "pointer" }}
      />
    );

  const renderReplies = () =>
    !collapsed &&
    comment.replies &&
    comment.replies.data.children.length &&
    comment.replies.data.children.map(renderReply);

  const renderShowMoreReplies = () => {
    if (collapsed) return null;
    const more = comment.replies?.data?.children?.find(
      (com) => com.kind === "more"
    );
    if (!more || more.data.count === 0) return null;
    console.log("more", more);

    return (
      <ShowMoreText
        onClick={() => {
          // @ts-ignore
          dispatch(
            loadMoreComments(comment.link_id, more?.data.children, comment.id)
          );
        }}
      >
        {more?.data?.count} more replies
      </ShowMoreText>
    );
  };

  return (
    <Container>
      <Flex flexDirection="column">{renderLineAndVoter()}</Flex>
      <Flex flexDirection="column" style={{ marginLeft: 15 }}>
        <CommentContainer>
          <Flex flexDirection="column">
            <Flex>
              <Author>{comment.author}</Author>
              <Score>{millify(comment.score, { precision: 1 })} points</Score>
            </Flex>
            {!collapsed && (
              <Text>
                <Markdown text={comment.body} />
              </Text>
            )}
          </Flex>
        </CommentContainer>
        {renderReplies()}
        {renderShowMoreReplies()}
      </Flex>
    </Container>
  );
};

const Container = styled.div`
  display: flex;

  margin-top: 20px;
`;

const CommentContainer = styled.div`
  display: flex;
`;

const Line = styled.div`
  height: calc(100% - 30px);
  width: 1.4px;
  background-color: ${(props) => props.theme.rootBackgroundColor};
  cursor: pointer;
  &:hover {
    background-color: lightgrey;
  }
`;

const Author = styled.span`
  font-size: 12px;
  margin-bottom: 5px;
  font-weight: 500;
  color: ${({ theme }) => theme.textColor};
`;

const Text = styled.span`
  font-size: 14px;
  color: ${({ theme }) => theme.textColor};
`;

const Score = styled.span`
  font-size: 12px;
  margin-left: 5px;
  color: ${(props) => props.theme.textColor2};
`;

const VoteContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 30px;
  margin-left: -5px;
`;

const ShowMoreText = styled.span`
  margin-top: 10px;
  font-weight: bold;
  font-size: 12.5px;
  cursor: pointer;
  color: ${(props) => props.theme.textColor};
`;

export default CommentCell;
