import * as React from 'react';
import { render, fireEvent } from 'react-testing-library';
import PostSeriesInfo, { PostSeriesInfoProps } from '../PostSeriesInfo';
import { MemoryRouter, RouteComponentProps } from 'react-router';
import PostViewerProvider from '../PostViewerProvider';

describe('PostSeriesInfo', () => {
  const setup = (props: Partial<PostSeriesInfoProps> = {}) => {
    const initialProps: Omit<PostSeriesInfoProps, keyof RouteComponentProps> = {
      name: 'Sample Series Name',
      postId: 'af5b4530-b350-11e8-9696-f1fffe8a36f1',
      username: 'velopert',
      posts: [
        {
          id: 'af5b4530-b350-11e8-9696-f1fffe8a36f1',
          title:
            '상태 관리 라이브러리의 미학: Redux 또는 MobX 를 통한 상태 관리',
          url_slug: 'redux-or-mobx',
          user: {
            id: 'c76ccc50-b34d-11e8-b01f-598f1220d1c8',
            username: 'velopert',
          },
        },
        {
          id: '6533da20-b351-11e8-9696-f1fffe8a36f1',
          title: 'Redux (1) 소개 및 개념정리',
          url_slug: 'Redux-1-소개-및-개념정리-zxjlta8ywt',
          user: {
            id: 'c76ccc50-b34d-11e8-b01f-598f1220d1c8',
            username: 'velopert',
          },
        },
        {
          id: 'a6710df0-b351-11e8-b01f-598f1220d1c8',
          title: 'Redux (2) 리액트 없이 쓰는 리덕스',
          url_slug: 'Redux-2-리액트-없이-쓰는-리덕스-cijltabbd7',
          user: {
            id: 'c76ccc50-b34d-11e8-b01f-598f1220d1c8',
            username: 'velopert',
          },
        },
        {
          id: '503c4f20-b352-11e8-9696-f1fffe8a36f1',
          title: 'Redux (3) 리덕스를 리액트와 함께 사용하기',
          url_slug: 'Redux-3-리덕스를-리액트와-함께-사용하기-nvjltahf5e',
          user: {
            id: 'c76ccc50-b34d-11e8-b01f-598f1220d1c8',
            username: 'velopert',
          },
        },
        {
          id: '6cf70ba0-b352-11e8-b01f-598f1220d1c8',
          title:
            'Redux (4) Immutable.js 혹은 Immer.js 를 사용한 더 쉬운 불변성 관리',
          url_slug: '20180908-1909-작성됨-etjltaigd1',
          user: {
            id: 'c76ccc50-b34d-11e8-b01f-598f1220d1c8',
            username: 'velopert',
          },
        },
        {
          id: '01185730-b353-11e8-9696-f1fffe8a36f1',
          title: 'MobX (1) 시작하기',
          url_slug: 'MobX-1-시작하기-9sjltans3p',
          user: {
            id: 'c76ccc50-b34d-11e8-b01f-598f1220d1c8',
            username: 'velopert',
          },
        },
        {
          id: '7a59e7d0-b353-11e8-b01f-598f1220d1c8',
          title: 'MobX (2) 리액트 프로젝트에서 MobX 사용하기',
          url_slug: 'MobX-2-리액트-프로젝트에서-MobX-사용하기-oejltas52z',
          user: {
            id: 'c76ccc50-b34d-11e8-b01f-598f1220d1c8',
            username: 'velopert',
          },
        },
        {
          id: '21fd6700-b354-11e8-ba07-9dd972ee6ad1',
          title: 'MobX (3) 심화적인 사용 및 최적화 방법',
          url_slug: 'MobX-3-심화적인-사용-및-최적화-방법-tnjltay61n',
          user: {
            id: 'c76ccc50-b34d-11e8-b01f-598f1220d1c8',
            username: 'velopert',
          },
        },
      ],
    };
    const utils = render(
      <MemoryRouter>
        <PostViewerProvider>
          <PostSeriesInfo {...initialProps} {...props} />
        </PostViewerProvider>
      </MemoryRouter>,
    );
    return {
      ...utils,
    };
  };
  it('renders properly', () => {
    const { getByText } = setup();
    // title
    getByText('Sample Series Name');
    // series-number
    getByText('1/8');
  });
  it('opens series list', () => {
    const { getByText } = setup();
    const fold = getByText('목록 보기');
    fireEvent.click(fold);
    getByText('숨기기');
    getByText('MobX (1) 시작하기');
  });
});
