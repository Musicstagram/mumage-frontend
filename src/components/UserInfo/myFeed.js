import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { GrDocumentSound } from "react-icons/gr";
import { useRecoilValue } from "recoil";
import { getMyFeed, userInfo } from "../../utils/FetchDataRecoil";
import { useState } from "react";
import MyLiked from "./myLiked";

const MyFeed = ({ gridColumns }) => {
    const navigate = useNavigate();
    const postsList = useRecoilValue(getMyFeed);

    const user = useRecoilValue(userInfo);

    const [index, setIndex] = useState(1);
    const onClickHandler = (index) => {
        setIndex(index);
    }
    return (
        <div style={{ width: "100%", height: "100%", minHeight: "500px" }}>
            <MenuSection>
                <MenuSectionDetail
                    onClick={() => onClickHandler(1)}
                    style={{
                        background: index === 1 ? "#F1F1FE" : "white",
                        color: index === 1 ? "#5151C6" : "#BDBDBD",
                        pointerEvents: index === 1 ? "none" : "visible",
                        border: index === 1 ? "none" : "1px dotted",
                        fontStyle: "italic",
                    }}
                    aria-disabled={index === 1}
                >
                    @{user["nickname"]}
                </MenuSectionDetail>
                <MenuSectionDetail
                    onClick={() => onClickHandler(2)}
                    style={{
                        background: index === 2 ? "#F1F1FE" : "white",
                        color: index === 2 ? "#5151C6" : "#BDBDBD",
                        pointerEvents: index === 2 ? "none" : "visible",
                        border: index === 2 ? "none" : "1px dotted",
                    }}
                >
                    Liked
                </MenuSectionDetail>
            </MenuSection>

            {index === 1 ?
                <Fr>
                    {postsList.length !== 0 ?
                        <Row style={{ gridTemplateColumns: `repeat(${gridColumns}, 1fr)` }}>
                            {postsList.map((post) => (
                                <div key={post["postId"]} className="post">
                                    <FeedImg
                                        src={post.imageUrl}
                                        alt={`Post by ${post.username}`}
                                        onClick={() => navigate(`/imgDetail/${post.postId}`)} />
                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'start', marginLeft: '10px' }}>
                                    <GridTitle>{post.title}</GridTitle>
                                    <GridArtist>{post.artist}</GridArtist>
                                    </div>     
                                </div>  
                            ))}
                        </Row> :
                        <EmptyPage>
                            <GrDocumentSound size="8em" color="#BDBDBD" />
                            <div style={{ color: "#BDBDBD", fontSize: "25px", fontStyle: "italic" }}>No Feed</div>
                        </EmptyPage>
                    }
                </Fr> :
                <MyLiked gridColumns={gridColumns} />
            }
        </div>
    );
}

export default MyFeed;

const MenuSection = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px;
    background-color: #FFF;
`

const MenuSectionDetail = styled.div`
    padding: 10px;

    width: 100%;
    text-align: center;
    background-color: #F1F1FE;
    border-radius: 6px;
`

const Row = styled.nav`
    display: grid;
    text-align: center;
    align-items: center;
    gap: 20px;
`
const Fr = styled.nav`
    min-height: 800px;
    margin-top: 0px;
    padding: 20px 20px 20px 20px;
`
//grid - template - columns: 1fr 1fr 1fr 1fr;

const FeedImg = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    align-items: center;
    border-radius: 10px;
`

const EmptyPage = styled.div`
    width: 100%;
    height: 100%;
    min-height: 800px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 8em;
    background-color: #F6F7F9;
`
const GridTitle = styled.div`
    font-weight: 600;
    color: black;
    font-size: 12px;
    margin-top: 10px;
    margin-bottom: 2px;
`

const GridArtist = styled.div`
    font-weight: 500;
    color: var(--text - text - secondary, #828282);
    font-size: 10px;  
`