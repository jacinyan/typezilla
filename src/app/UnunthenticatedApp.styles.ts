import styled from "@emotion/styled";
import { Card } from "antd";
import logo from "assets/logo.svg";
import right from "assets/right.svg";
import left from "assets/left.svg";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
`;

const ShadowCard = styled(Card)`
  width: 40rem;
  min-height: 56rem;
  padding: 3.2rem 4rem;
  border-radius: 0.3rem;
  box-sizing: border-box;
  box-shadow: rgba(0, 0, 0, 0.1) 0 0 10px;
  text-align: center;
`;

const Header = styled.header`
  background: url(${logo}) no-repeat center;
  padding: 5rem;
  background-size: 16rem;
  background-position-x: 49%;
  width: 100%;
`;

const Background = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-position: left bottom, right top;
  background-size: 35%, 35%, contain;
  background-image: url(${left}), url(${right});
  opacity: 0.55;
`;

const Title = styled.h2`
  margin-bottom: 2.4rem;
  color: rgb(94, 108, 132);
`;

export { Container, ShadowCard, Header, Background, Title };
