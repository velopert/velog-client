import React, { FC } from 'react';
import styled from 'styled-components';
import palette from '../../lib/styles/palette';

const MainNoticeWidgetBlock = styled.div`
  .title-bar {
    line-height: 1.5;
    font-size: 0.875rem;
    padding-bottom: 0.5rem;
    border-bottom: 1px solid ${palette.gray2};
    margin-bottom: 1rem;
    font-weight: bold;
  }
  .content {
    .empty {
      padding-top: 1rem;
      padding-bottom: 1rem;
      color: ${palette.gray5};
      text-align: center;
      font-size: 0.875rem;
    }
  }
`;

interface MainNoticeWidgetProps {}

const MainNoticeWidget: FC<MainNoticeWidgetProps> = props => {
  return (
    <MainNoticeWidgetBlock>
      <div className="title-bar">공지사항</div>
      <div className="content">
        <div className="empty">공지사항이 없습니다.</div>
      </div>
    </MainNoticeWidgetBlock>
  );
};

export default MainNoticeWidget;
