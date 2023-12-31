import { useNavigate } from "react-router-dom";
import { React, useReducer } from 'react'
import { GoHome } from "react-icons/go";
import { FaRegUser, FaQuestionCircle } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import styled from "styled-components";
import { useEffect } from "react";
import SectionDevide from "../../pages/MainPage/SectionChange";
import MyPage from "../../pages/MyPage/MyPage";

import { postsDataState, usersDataState } from "../../store/ServerData";
import { index, postsState, userInfo, usersState } from "../../utils/FetchDataRecoil";

import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";


import Joyride, { ACTIONS, STATUS, EVENTS } from 'react-joyride';
import BottomNavBar from './BottomNavBar';

const PageControll = () => {
    const [ind, setIndex] = useRecoilState(index);
    const [user, setUser] = useRecoilState(userInfo);
    const users = useRecoilValue(usersDataState);
    const posts = useRecoilValue(postsDataState);

    const setUsers = useSetRecoilState(usersState);
    const setPosts = useSetRecoilState(postsState);

    useEffect(() => {
        setUsers(users);
        setPosts(posts);
        setUser(users[1]);

    }, [posts, users, setUser, setUsers, setPosts]);

    const [tourState, dispatch] = useReducer(reducer, INITIAL_STATE);
    const callback = (data) => {
        const { action, index, type, status } = data;
        if (action === ACTIONS.CLOSE || (status === STATUS.SKIPPED && tourState.run) || status === STATUS.FINISHED) {
            dispatch({ type: "STOP" });
        } else if (type === EVENTS.STEP_AFTER || type === EVENTS.TARGET_NOT_FOUND) {
            dispatch({
                type: "NEXT_OR_PREV",
                payload: { stepIndex: index + (action === ACTIONS.PREV ? -1 : 1) },
            });
        }
    };
    const startTour = () => {
        dispatch({ type: "RESTART" });
    };


    return (
        <div style={{ width: "100%", height: "100%" }}>
            {ind === 1 ? <Tour
                onClick={startTour}
                color="#5151C6"
            /> : null}

            <Joyride
                styles={{
                    options: {
                        arrowColor: "#262626",
                        backgroundColor: "#262626",
                        primaryColor: "#FFF",
                        textColor: "#FFFFFF",
                    },
                    tooltipContainer: {
                        textAlign: "center",
                    },
                    buttonNext: {
                        backgroundColor: "#404040"
                    },
                    buttonBack: {
                        marginRight: 10
                    }
                }}
                {...tourState}
                callback={callback}
                showProgress={true}
                showSkipButton={true}
                locale={{
                    last: "done",
                    back: "back",
                    next: "next",
                    skip: "skip",
                }}

            />
            <TopSection>
                <Header className="title">
                    MUMAGE
                </Header>

            </TopSection>

            {ind === 1 ? <SectionDevide /> : <MyPage />}
            <BottomNavBar />
        </div>

    );
}

export default PageControll;

const Tour = styled(FaQuestionCircle)`
    position: absolute;
    right: 2em;
    top: 2.2em;
    opacity: 50%;
    width: 1.5em;
    height: 1.5em;
    &:hover {
        opacity: 100%;
        width: 2em;
        height: 2em;
    }
`

const BotNav = styled.nav`
    display: grid;
    grid-template-columns: 1fr 1fr;
    place-items: center;
    width: 100%;
    height: 70px;
    flex-shrink: 0;
`

const Column = styled.div`
    height: 80px;
    width: 90px;
    display: flex;
    justify-content: center;
    align-items: center;

    &[aria-disabled] {
    cursor: revert;
    transform: revert;
    }
`

const FirstCol = styled(Column)`
    border-radius: 1em;
`

const SecondCol = styled(Column)` 
    position: absolute;
    bottom: 2em;
    border-radius: 12em;
    width: 60px;
    height: 60px;
    background: linear-gradient(271deg, #888BF4 0%, #5151C6 100%);
`

const Second2Col = styled.div`
    display: grid;
    justify-content: center;
    align-items: center;
    width: 2em;
    height: 2em;
    border-radius: 1em;
    background: #FFF;
`

const ThirdCol = styled(Column)`
    border-radius: 1em;
`

const Sticky = styled.div`
    position:sticky;
    bottom:0px;
    background: white;
`

const steps = [
    {
        target: ".title",
        content: "우리의 로고에요!",
        disableBeacon: true,
    },
    {
        target: ".following",
        content: "클릭시 Following과 Recommend를 옮겨 다니며 게시물을 확인할 수 있어요",
    },
    {
        target: ".userInfo",
        content: "클릭한 유저의 페이지에 가볼 수 있어요!"
    },
    {
        target: ".image",
        content: "이미지를 클릭하면 상세페이지로 이동해요!",
    },
    {
        target: ".pagination",
        content: "페이지를 이동할 수 있어요!"
    },
    {
        target: ".bottomNav",
        content: "+ 버튼을 눌러 함께 공유해요!"
    },
];

const reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case "START":
            return { ...state, stepIndex: 0 };
        case "RESET":
            return { ...state, stepIndex: 0 };
        case "STOP":
            return { ...state, run: false };
        case "NEXT_OR_PREV":
            return { ...state, ...action.payload };
        case "RESTART":
            return {
                ...state,
                stepIndex: 0,
                run: true,
                loading: false,
                key: new Date()
            };
        default:
            return state;
    }
}

const INITIAL_STATE = {
    run: false,
    continuous: true,
    loading: false,
    stepIndex: 0,
    steps: steps,
    key: new Date(),
};

const Header = styled.header`
    text-align: center;
  padding-bottom: 5px;
  margin: 16px;
  font-size: 40px;
  font-weight: 700;
  letter-spacing: 4px;
  color: transparent;
  background: linear-gradient(271deg, #888BF4 0%, #5151C6 100%);
  -webkit-background-clip: text;
  position: relative;

  &::before {
    content: 'MUMAGE';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    text-align: center;
    font-size: 40px;
    font-weight: 700;
    letter-spacing: 4px;
    text-shadow: 
      -1px -1px 0 #000,  
       1px -1px 0 #000,
      -1px  1px 0 #000,
       1px  1px 0 #000;
    z-index: -1;
  }
`
const TopSection = styled.div`
    display: flex;
    justify-content: center;
    background: white;
`