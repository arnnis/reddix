import React, { FC } from "react";
import { ReactComponent as ChevronUp } from "../assets/svg/chevron-up.svg";
import { ReactComponent as ChevronDown } from "../assets/svg/chevron-down.svg";
import styled from "styled-components";
import { Post } from "../models/post";

interface Props {
  post: Post;
}

const Voter: FC<Props> = ({ post }) => {
  return (
    <VotesContainer>
      <ChevronUp style={{ cursor: "pointer", fill: "#34495e" }} />
      <Votes>{post.ups.toString()}</Votes>
      <ChevronDown style={{ cursor: "pointer", fill: "#34495e" }} />
    </VotesContainer>
  );
};

const VotesContainer = styled.div`
  display: flex;
  min-width: 100px;
  //background-color: red;
  flex-direction: column;
  align-items: center;
  padding: 15px 0 15px 0;
`;

const Votes = styled.span`
  font-size: 14.5px;
  color: #34495e;
  font-weight: 500;
`;

export default Voter;
