import { SinglePost } from '../post';

export const postData: { post: SinglePost } = {
  post: {
    id: 'af5b4530-b350-11e8-9696-f1fffe8a36f1',
    title: '상태 관리 라이브러리의 미학: Redux 또는 MobX 를 통한 상태 관리',
    released_at: '2018-09-08T10:19:35.556Z',
    updated_at: '2019-07-30T14:19:14.326Z',
    tags: ['redux', '상태관리'],
    body:
      '리액트 생태계에서 사용되는 상태 관리 라이브러리는 대표적으로 Redux 와 MobX 가 있습니다. 이 둘의 특징을 배워보고 직접 사용하면서 알아가봅시다.\n\n## 상태 관리 라이브러리의 필요성\n\n상태 관리 라이브러리란게, 과연 필요할까요? 무조건 필요하지는 않습니다. 하지만 한가지는 확실합니다. 규모가 큰 앱에선 있는게, 확실히 편합니다. 제가 존경하는 개발자이면서도.. 리덕스의 라이브러리의 창시자인 Dan Abramov 는 말합니다. ["You might not need Redux"](https://medium.com/@dan_abramov/you-might-not-need-redux-be46360cf367) [(번역)](https://medium.com/@Dev_Bono/%EB%8B%B9%EC%8B%A0%EC%97%90%EA%B2%8C-redux%EB%8A%94-%ED%95%84%EC%9A%94-%EC%97%86%EC%9D%84%EC%A7%80%EB%8F%84-%EB%AA%A8%EB%A6%85%EB%8B%88%EB%8B%A4-b88dcd175754)\n\n실제로, 여러분은 리덕스 없이도 좋은 앱을 만들 수 있습니다. 상태 관리 라이브러리가 없으면, 이전에는 글로벌 상태 관리를 하기에 조금 번거로웠는데 리액트 16.3 에서 [Context API](https://react-context.vlpt.us/03.html) 가 더욱 좋아지면서 글로벌 상태 관리 또한 별도의 라이브러리 없이 할 수 있게 되었습니다.\n\n> 글로벌 상태 관리란, 컴포넌트 간의 데이터 교류, 특히 부모-자식 관계가 아닌 컴포넌트끼리 데이터 교류를 하는것을 의미합니다.\n\n하지만, 그럼에도 불구하고 저는 상태 관리 라이브러리를 결국에는 배워보는걸 권장합니다. 모르고 안 쓰는거랑, 알고 안 쓰는거랑 다르기 때문이죠.',
    short_description:
      '리액트 생태계에서 사용되는 상태 관리 라이브러리는 대표적으로 Redux 와 MobX 가 있습니다. 이 둘의 특징을 배워보고 직접 사용하면서 알아가봅시다.\n\n상태 관리 라이브러리의 필요성\n\n상태 관리 라이브러리란게, 과연 필요할까요? 무조건 필요하지는 않습니다. 하지만 한가지는 확실합니다. 규모가 큰 앱에선 있는게, 확실히 편합니다. 제가 존경하는 개발자이면...',
    is_markdown: true,
    is_private: false,
    is_temp: false,
    thumbnail:
      'https://images.velog.io/post-images/velopert/af6e5800-b350-11e8-9696-f1fffe8a36f1/redux-and-mobx.png',
    comments_count: 2,
    url_slug: 'redux-or-mobx',
    likes: 7,
    liked: false,
    user: {
      id: 'c76ccc50-b34d-11e8-b01f-598f1220d1c8',
      username: 'velopert',
      profile: {
        id: 'c7caf1e0-b34d-11e8-b01f-598f1220d1c8',
        display_name: 'Minjun Kim',
        thumbnail:
          'https://images.velog.io/profiles/velopert/thumbnails/1536400727.98.png',
        short_bio:
          'velopert@Laftel Inc. 재미있는것만 골라서 하는 개발자입니다.',
        profile_links: {
          url: 'https://velopert.com/',
          email: 'public.velopert@gmail.com',
          github: 'velopert',
          twitter: 'velopert',
          facebook: 'velopert',
        },
      },
      velog_config: {
        title: 'VELOPERT.LOG',
      },
    },
    comments: [
      {
        id: 'e4d45f50-c640-11e8-a361-cbda4cc64af4',
        user: {
          id: '4fc328c0-c630-11e8-a920-d3b6c9399aff',
          username: 'dever',
          profile: {
            id: '500d0300-c630-11e8-a920-d3b6c9399aff',
            thumbnail:
              'https://images.velog.io/images/dever/profile/497f3750-0cc7-11e9-b291-5fc487ce9c76/JS.png',
          },
        },
        text: 'velog에서는 redux를 사용하셨나요 아니면 Mobx를 사용하셨나요??',
        replies_count: 1,
        level: 0,
        created_at: '2018-10-02T12:44:25.413Z',
        deleted: false,
      },
    ],
    series: {
      id: '96ffa520-1b2f-11e9-abae-cb5137f530ec',
      name: 'Redux 또는 MobX 를 통한 상태 관리',
      series_posts: [
        {
          id: '994eec50-1b2f-11e9-abae-cb5137f530ec',
          post: {
            id: 'af5b4530-b350-11e8-9696-f1fffe8a36f1',
            title:
              '상태 관리 라이브러리의 미학: Redux 또는 MobX 를 통한 상태 관리',
            url_slug: 'redux-or-mobx',
            user: {
              id: 'c76ccc50-b34d-11e8-b01f-598f1220d1c8',
              username: 'velopert',
            },
          },
        },
        {
          id: 'adbedb50-1b2f-11e9-958c-cdbdd4063c98',
          post: {
            id: '6533da20-b351-11e8-9696-f1fffe8a36f1',
            title: 'Redux (1) 소개 및 개념정리',
            url_slug: 'Redux-1-소개-및-개념정리-zxjlta8ywt',
            user: {
              id: 'c76ccc50-b34d-11e8-b01f-598f1220d1c8',
              username: 'velopert',
            },
          },
        },
        {
          id: 'b3fa9ef0-1b2f-11e9-958c-cdbdd4063c98',
          post: {
            id: 'a6710df0-b351-11e8-b01f-598f1220d1c8',
            title: 'Redux (2) 리액트 없이 쓰는 리덕스',
            url_slug: 'Redux-2-리액트-없이-쓰는-리덕스-cijltabbd7',
            user: {
              id: 'c76ccc50-b34d-11e8-b01f-598f1220d1c8',
              username: 'velopert',
            },
          },
        },
        {
          id: 'b8c916f0-1b2f-11e9-abae-cb5137f530ec',
          post: {
            id: '503c4f20-b352-11e8-9696-f1fffe8a36f1',
            title: 'Redux (3) 리덕스를 리액트와 함께 사용하기',
            url_slug: 'Redux-3-리덕스를-리액트와-함께-사용하기-nvjltahf5e',
            user: {
              id: 'c76ccc50-b34d-11e8-b01f-598f1220d1c8',
              username: 'velopert',
            },
          },
        },
        {
          id: 'c3f75550-1b2f-11e9-958c-cdbdd4063c98',
          post: {
            id: '6cf70ba0-b352-11e8-b01f-598f1220d1c8',
            title:
              'Redux (4) Immutable.js 혹은 Immer.js 를 사용한 더 쉬운 불변성 관리',
            url_slug: '20180908-1909-작성됨-etjltaigd1',
            user: {
              id: 'c76ccc50-b34d-11e8-b01f-598f1220d1c8',
              username: 'velopert',
            },
          },
        },
        {
          id: 'ca4c9460-1b2f-11e9-958c-cdbdd4063c98',
          post: {
            id: '01185730-b353-11e8-9696-f1fffe8a36f1',
            title: 'MobX (1) 시작하기',
            url_slug: 'MobX-1-시작하기-9sjltans3p',
            user: {
              id: 'c76ccc50-b34d-11e8-b01f-598f1220d1c8',
              username: 'velopert',
            },
          },
        },
        {
          id: 'cf4b4420-1b2f-11e9-958c-cdbdd4063c98',
          post: {
            id: '7a59e7d0-b353-11e8-b01f-598f1220d1c8',
            title: 'MobX (2) 리액트 프로젝트에서 MobX 사용하기',
            url_slug: 'MobX-2-리액트-프로젝트에서-MobX-사용하기-oejltas52z',
            user: {
              id: 'c76ccc50-b34d-11e8-b01f-598f1220d1c8',
              username: 'velopert',
            },
          },
        },
        {
          id: 'd51be9e0-1b2f-11e9-abae-cb5137f530ec',
          post: {
            id: '21fd6700-b354-11e8-ba07-9dd972ee6ad1',
            title: 'MobX (3) 심화적인 사용 및 최적화 방법',
            url_slug: 'MobX-3-심화적인-사용-및-최적화-방법-tnjltay61n',
            user: {
              id: 'c76ccc50-b34d-11e8-b01f-598f1220d1c8',
              username: 'velopert',
            },
          },
        },
      ],
    },
    linked_posts: {
      previous: null,
      next: {
        id: '6533da20-b351-11e8-9696-f1fffe8a36f1',
        title: 'Redux (1) 소개 및 개념정리',
        url_slug: 'Redux-1-소개-및-개념정리-zxjlta8ywt',
        user: {
          id: 'c76ccc50-b34d-11e8-b01f-598f1220d1c8',
          username: 'velopert',
        },
      },
    },
  },
};
