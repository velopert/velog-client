import * as React from 'react';
import { render, fireEvent } from 'react-testing-library';
import PostHead, { PostHeadProps } from '../PostHead';
import { MemoryRouter } from 'react-router';

describe('PostHead', () => {
  const setup = (props: Partial<PostHeadProps> = {}) => {
    const initialProps: PostHeadProps = {
      title: 'title',
      tags: ['tagA', 'tagB'],
      username: 'velopert',
      date: new Date(Date.now() - 1000 * 60 * 60 * 5).toString(),
      thumbnail:
        'https://images.velog.io/post-images/velopert/ac519a50-7732-11e9-bded-7fa91ac5b455/image.png',
      hideThumbnail: false,
      ownPost: false,
      series: null,
      postId: '7ae82a11-f56a-4332-aaef-2202c80d9fdd',
      onRemove: () => {},
      onEdit: () => {},
      shareButtons: null,
      toc: null,
    };
    const utils = render(
      <MemoryRouter>
        <PostHead {...initialProps} {...props} />
      </MemoryRouter>,
    );
    return {
      ...utils,
    };
  };
  it('renders title', () => {
    const { getByText } = setup();
    getByText('title');
  });
  it('renders username', () => {
    const { getByText } = setup();
    getByText('velopert');
  });
  it('renders date', () => {
    const { getByText } = setup();
    getByText('약 5시간 전');
  });

  it('renders tags', () => {
    const { getByText } = setup();
    getByText('tagA');
    getByText('tagB');
  });

  it('renders thumbnail', () => {
    const { getByAltText } = setup();
    getByAltText('post-thumbnail');
  });

  it('hides thumbnail', () => {
    const { queryByAltText } = setup({
      hideThumbnail: true,
    });
    const thumbnail = queryByAltText('post-thumbnail');
    expect(thumbnail).toBeFalsy();
  });

  it('hides edit and remove when ownPost is false', () => {
    const { queryByText } = setup({
      ownPost: false,
    });
    const remove = queryByText('삭제');
    expect(remove).toBeFalsy();
  });

  it('hides edit and remove when ownPost is false', () => {
    const { getByText } = setup({
      ownPost: true,
    });
    getByText('삭제');
  });

  it('opens askRemove modal', () => {
    const { getByText } = setup({
      ownPost: true,
    });
    const removeButton = getByText('삭제');
    fireEvent.click(removeButton);
    getByText('정말로 삭제하시겠습니까?');
  });

  it('calls onRemove', () => {
    const onRemove = jest.fn();
    const { getByText } = setup({
      ownPost: true,
      onRemove,
    });
    const removeButton = getByText('삭제');
    fireEvent.click(removeButton);
    const confirm = getByText('확인');
    fireEvent.click(confirm);
    expect(onRemove).toBeCalled();
  });

  it('calls onEdit', () => {
    const onEdit = jest.fn();
    const { getByText } = setup({
      ownPost: true,
      onEdit,
    });
    const editButton = getByText('수정');
    fireEvent.click(editButton);
    expect(onEdit).toBeCalled();
  });
});
