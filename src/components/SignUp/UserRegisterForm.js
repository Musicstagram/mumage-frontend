import React from 'react'
import styled from 'styled-components'
import { registerUser } from '../../utils/axios'

const UserRegisterForm = ({userInfo, setUserInfo}) => {
  return (
    <>
      <PageBody>
        <Title>Mumage</Title>
        <HeadText>계정 정보를 입력해 주세요</HeadText>
        <InputRowBox>
          <LabelText>이름</LabelText>
          <InputContainer>
            <Input
              value={userInfo.name}
              onChange={(e) => setUserInfo({...userInfo, "name" : e.currentTarget.value})}
              placeholder="이름을 입력해주세요."
              required
            />
          </InputContainer>
        </InputRowBox>
        <InputRowBox>
          <LabelText>닉네임</LabelText>
          <InputContainer>
            <Input
              value={userInfo.userName}
              onChange={(e) => setUserInfo({...userInfo, "nickname" : e.currentTarget.value})}
              placeholder="닉네임을 입력해주세요."
              required
            />
          </InputContainer>
        </InputRowBox>
        <InputRowBox>
          <LabelText>아이디</LabelText>
          <InputContainer>
            <Input
              value={userInfo.userId}
              onChange={(e) => setUserInfo({...userInfo, "loginId" : e.currentTarget.value})}
              placeholder="아이디를 입력해주세요."
              required
            />
          </InputContainer>
        </InputRowBox>
        <InputRowBox>
          <LabelText>비밀번호</LabelText>
          <InputContainer>
            <Input
              type='password'
              value={userInfo.userPW}
              onChange={(e) => setUserInfo({...userInfo, "password" : e.currentTarget.value})}
              placeholder="비밀번호를 입력해주세요."
              required
            />
          </InputContainer>
        </InputRowBox>
        <SubmitButton onClick={() => registerUser(userInfo)}>회원가입</SubmitButton>
      </PageBody>
    </>
  )
}

export default UserRegisterForm

const PageBody = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 460px;
  min-width: 400px;
  max-height: 1000px;
  margin: auto;
  padding: 30px;
  background: #ffffff;
  border-radius: 30px;
  box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
  a {
    text-decoration: none;
  }
`;

const Title = styled.div`
  margin: auto;
  font-family : Pretendard;
  font-weight: 600;
  font-size: 40px;
  color: #5151C6;
`;

const HeadText = styled.div`
  
  padding-bottom: 2rem;
  font-size: 1.3rem;
  font-weight: 600;
`;

const InputRowBox = styled.div`
  display: flex;
  flex-direction: column;
  height: 107px;
`;

const LabelText = styled.div`
  margin-bottom: 1rem;
  margin-left: 10px;
  font-family: Pretendard;
  font-size: 16px;
  font-weight: 500;
  color: #313338;
`;

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 0.4rem auto;
  margin-bottom: 0;
  padding-left: 1.5rem;
  border: none;
  border-radius: 100px;
  width: 400px;
  height: 50px;
  font-size: 1rem;
  color: #313338;
  background: #fafafa;
  .send-icon {
    cursor: pointer;
    :hover {
      opacity: 0.8;
      transition: 0.5s;
    }
  }
`;

const Input = styled.input`
  border: none;
  border-radius: 100px;
  width: 330px;
  height: 50px;
  margin-right: 20px;
  font-family: Pretendard;
  font-size: 18px;
  color: #313338;
  background: #fafafa;
  outline: none;
`;

const SubmitButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  border: none;
  border-radius: 100px;
  height: 50px;
  width: 140px;
  box-sizing: border-box;
  font-family: Pretendard;
  background: var(--Primary, linear-gradient(271deg, #888BF4 0%, #5151C6 100%));

  margin-top: 1.5rem;
  color: #ffffff;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  &:hover {
    background: var(--Primary, linear-gradient(91deg, #888BF4 0%, #5151C6 100%));
    transition: all 0.5s ease 0s;
  }

`;