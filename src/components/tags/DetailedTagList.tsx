import React from 'react';
import styled from 'styled-components';
import DetailedTagItem from './DetailedTagItem';

export type DetailedTagListProps = {};

function DetailedTagList(props: DetailedTagListProps) {
  return (
    <Block>
      <DetailedTagItem
        name="JavaScript"
        description="자바스크립트는 와 엄청나게 쉽고 좋은 언어다 우왕굳ㅋ 자바스크립트는 어떤 어쩌고저쩌고 로렘입섬 한국어 블라블라블라 자바스크립트는 어떤 어쩌고저쩌고 로렘입섬 한국어 블라블라블라"
        postsCount={100}
      />
      <DetailedTagItem
        name="React"
        description="리액트 좋아해요 하하 호 호 히히헤헤 리액트 개꿀딲 라랄라라라ㅏㄹ"
        postsCount={100}
      />
      <DetailedTagItem
        name="TIL"
        description="오늘 배운거 정리해서 쓰는거임"
        postsCount={100}
      />
      <DetailedTagItem
        name="algorithm"
        description="알고리즘 알고리즘 알고리즘 공부하기 귀찮다"
        postsCount={100}
      />
      <DetailedTagItem
        name="JavaScript"
        description="자바스크립트는 와 엄청나게 쉽고 좋은 언어다 우왕굳ㅋ 자바스크립트는 어떤 어쩌고저쩌고 로렘입섬 한국어 블라블라블라 자바스크립트는 어떤 어쩌고저쩌고 로렘입섬 한국어 블라블라블라"
        postsCount={100}
      />
      <DetailedTagItem
        name="React"
        description="리액트 좋아해요 하하 호 호 히히헤헤"
        postsCount={100}
      />
      <DetailedTagItem
        name="TIL"
        description="오늘 배운거 정리해서 쓰는거임"
        postsCount={100}
      />
      <DetailedTagItem
        name="algorithm"
        description="알고리즘 알고리즘 알고리즘 공부하기 귀찮다"
        postsCount={100}
      />
      <DetailedTagItem
        name="JavaScript"
        description="자바스크립트는 와 엄청나게 쉽고 좋은 언어다 우왕굳ㅋ"
        postsCount={100}
      />
      <DetailedTagItem
        name="React"
        description="리액트 좋아해요 하하 호 호 히히헤헤"
        postsCount={100}
      />
      <DetailedTagItem
        name="TIL"
        description="오늘 배운거 정리해서 쓰는거임"
        postsCount={100}
      />
      <DetailedTagItem
        name="algorithm"
        description="알고리즘 알고리즘 알고리즘 공부하기 귀찮다"
        postsCount={100}
      />
      <DetailedTagItem
        name="JavaScript"
        description="자바스크립트는 와 엄청나게 쉽고 좋은 언어다 우왕굳ㅋ"
        postsCount={100}
      />
      <DetailedTagItem
        name="React"
        description="리액트 좋아해요 하하 호 호 히히헤헤"
        postsCount={100}
      />
      <DetailedTagItem
        name="TIL"
        description="오늘 배운거 정리해서 쓰는거임"
        postsCount={100}
      />
      <DetailedTagItem
        name="algorithm"
        description="알고리즘 알고리즘 알고리즘 공부하기 귀찮다"
        postsCount={100}
      />
    </Block>
  );
}

const Block = styled.section`
  margin: 0 auto;
  margin-top: 4rem;
  width: 1200px;
  display: flex;
  flex-wrap: wrap;
`;

export default DetailedTagList;
