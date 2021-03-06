import React, { FC, useEffect, useState } from "react";
import styled from "styled-components";
import { ReactComponent as HotIcon } from "../../assets/svg/fire.svg";
import { ReactComponent as NewIcon } from "../../assets/svg/plus-box.svg";
import { ReactComponent as ChartIcon } from "../../assets/svg/chart-bar.svg";
import { ReactComponent as SettingsIcon } from "../../assets/svg/cog-box.svg";
import { ReactComponent as SavedIcon } from "../../assets/svg/content-save.svg";
import { ReactComponent as HomeIcon } from "../../assets/svg/home.svg";
import { useDispatch, useSelector } from "react-redux";
import { getMySubreddits, getPosts } from "../../slices/posts/thunks";
import Flex from "../../components/flex";
import { Subreddit } from "../../models/subreddit";
import { setCategory } from "../../slices/posts/slice";
import { history, RootState } from "../../store/configureStore";
import { Listing } from "../../models/api";
import SubredditCell from "./subreddit-cell";
import useMatchHome from "../../navigation/useMatchHome";
import useMatchSubreddit from "../../navigation/useMatchSubreddit";
import useMatchSaved from "../../navigation/useMatchSaved";
import useMatchSettings from "../../navigation/useMatchSettings";
import { HOME_PATH, SAVED_PATH, SETTINGS_PATH } from "../../navigation/paths";

interface Props {}

const NavBar: FC<Props> = () => {
  const dispatch = useDispatch<any>();
  const [subreddits, setSubreddits] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadError, setLoadError] = useState<any>(null);
  const subreddit = useSelector((state: RootState) => state.posts.subreddit);
  const category = useSelector((state: RootState) => state.posts.category);
  const mathHome = useMatchHome();
  const matchSubreddit = useMatchSubreddit();
  const matchSaved = useMatchSaved();
  const matchSettings = useMatchSettings();

  useEffect(() => {
    getMySubredditsList();
  }, []);

  useEffect(() => console.log(matchSubreddit), [matchSubreddit]);

  const getMySubredditsList = async () => {
    setLoading(true);
    setLoadError(null);
    try {
      let subs: Listing<Subreddit> = await dispatch(getMySubreddits());
      setSubreddits(subs.data.children.map(({ data }) => data.id));
    } catch (e) {
      setLoadError(e);
    } finally {
      setLoading(false);
    }
  };

  const renderAppLogo = () => (
    <LogoContainer
      onClick={() => {
        dispatch(setCategory("best"));
        history.push(HOME_PATH);
      }}
    >
      <LogoTilte>Reddix</LogoTilte>
    </LogoContainer>
  );

  const renderHomeSection = () => (
    <Section>
      <SectionItem
        title="Home"
        icon={
          <HomeIcon
            style={{
              marginLeft: -3,
              fill: mathHome ? "#494949" : "#CECECE",
            }}
            width={21}
          />
        }
        onPress={() => {
          dispatch(setCategory("best"));
          history.push(HOME_PATH);
        }}
        selected={!!mathHome}
      />
      <SectionItem
        title="Saved"
        icon={
          <SavedIcon
            style={{
              marginLeft: -1.5,
              fill: matchSaved ? "#494949" : "#CECECE",
            }}
            width={21}
          />
        }
        onPress={() => {
          history.push(SAVED_PATH);
        }}
        selected={!!matchSaved}
      />
      <SectionItem
        title="Settings"
        icon={
          <SettingsIcon
            style={{
              marginLeft: -3,
              fill: mathHome && category === "top" ? "#494949" : "#CECECE",
            }}
            width={21}
          />
        }
        onPress={() => {
          history.push(SETTINGS_PATH);
        }}
        selected={!!matchSettings}
      />
    </Section>
  );

  const renderSubReddit = (subId: string) => {
    return <SubredditCell subId={subId} />;
  };

  const renderSubReddits = () => (
    <Section title="SUBREDDITS">{subreddits.map(renderSubReddit)}</Section>
  );

  return (
    <Container>
      {renderAppLogo()}
      <Flex flex={1} flexDirection="column" style={{ overflowY: "auto" }}>
        {renderHomeSection()}
        {renderSubReddits()}
      </Flex>
    </Container>
  );
};

const Section: FC<{ title?: string }> = ({ title, children }) => (
  <SectionContainer>
    {title && (
      <SectionTitleContainer>
        <SectionTitle>{title}</SectionTitle>
        <SectionDivider />
      </SectionTitleContainer>
    )}
    {children}
  </SectionContainer>
);

export const SectionItem: FC<{
  icon: any;
  title: string;
  onPress?(): void;
  selected?: boolean;
}> = ({ icon, title, onPress, selected }) => (
  <SectionItemContainer selected={selected} onClick={onPress}>
    {icon}
    <SectionItemTitle selected={selected}>{title}</SectionItemTitle>
    {selected && <SectionItemSelectedBar />}
  </SectionItemContainer>
);

const Container = styled.div`
  display: flex;
  width: 300px;
  min-width: 300px;
  height: 100%;
  background-color: ${(props) => props.theme.backgroundColor};
  flex-direction: column;
  box-shadow: 10px 0px 15px -19px rgba(150, 150, 150, 1);
`;

const LogoContainer = styled.div`
  display: flex;
  height: 150px;
  width: 100%;
  //background-color: navajowhite;
  align-items: center;
  padding-left: 35px;
  cursor: pointer;
`;

const LogoTilte = styled.div`
  font-size: 21px;
  font-weight: bolder;
  color: ${(props) => props.theme.orange};
  font-family: ABeeZee;
`;

const SectionContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  margin-bottom: 25px;
`;

const SectionTitleContainer = styled.div`
  display: flex;
  width: 100%;
  padding: 0px 35px 0 35px;
  flex-direction: column;
  margin-bottom: 10px;
`;

const SectionTitle = styled.span`
  font-size: 13.25px;
  color: #6d6f76;
  margin-bottom: 10px;
  font-weight: 500;
`;

const SectionDivider = styled.div`
  width: 100%;
  height: 1.5px;
  background-color: ${(props) => props.theme.rootBackgroundColor};
`;

const SectionItemContainer = styled.div<{ selected?: boolean }>`
  position: relative;
  height: 47.5px;
  display: flex;
  width: 100%;
  align-items: center;
  padding: 0px 35px 0 35px;
  cursor: pointer;
`;

const SectionItemTitle = styled.span<{ selected?: boolean }>`
  font-size: 13.5px;
  color: ${(props) => (props.selected ? props.theme.textColor : "#CECECE")};
  margin-left: 15px;
  font-weight: bold;
`;

const SectionItemSelectedBar = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 4.5px;
  background-color: #e04e18;
`;

export default NavBar;
