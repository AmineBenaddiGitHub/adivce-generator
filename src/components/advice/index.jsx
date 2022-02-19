import { useState, useEffect } from "react";
import styled from "styled-components";
import dice from "../../assets/icon-dice.svg";

const divider =
  window.innerWidth < 1000
    ? require("../../assets/pattern-divider-mobile.svg").default
    : require("../../assets/pattern-divider-desktop.svg").default;

export default function Advice() {
  const [data, setData] = useState({});
  const [renderer, setRenderer] = useState(0);
  useEffect(() => {
    const fetcher = async () => {
      const result = await (
        await fetch("https://api.adviceslip.com/advice")
      ).json();
      setData(() => result.slip);
    };
    fetcher();
  }, [renderer]);

  return (
    <AdviceContainer>
      <Title>{`ADVICE #${data.id}`}</Title>
      <Content>{`"${data.advice}"`}</Content>
      <Divider src={divider} alt="devider" />
      <ImgContainer
        onClick={() => {
          setRenderer(() => Math.random());
        }}
      >
        <img src={dice} alt="dice" />
      </ImgContainer>
    </AdviceContainer>
  );
}

const AdviceContainer = styled.div`
  width: 90%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #2f3948;
  border-radius: 1rem;
  padding: 1rem;
  @media screen and (min-width: 1000px) {
    width: 50%;
    padding: 1rem;
    border-radius: 1rem;
  }
`;

const Title = styled.h1`
  color: #73c4aa;
  text-align: center;
  font-size: 1.1rem;
  font-weight: 800px;
`;

const Content = styled.p`
  color: white;
  font-size: 1.7rem;
  text-align: center;
  font-weight: 800px;
`;

const Divider = styled.img`
  width: 100%;
  margin-bottom: 4rem;
`;

const ImgContainer = styled.div`
  position: absolute;
  border-radius: 50%;
  background-color: #54ffac;
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  bottom: 0;
  left: 50%;
  transform: translate(-50%, 50%);
  cursor: pointer;
  &:hover {
    box-shadow: 0 0 10px 10px #90ee90;
  }
`;
