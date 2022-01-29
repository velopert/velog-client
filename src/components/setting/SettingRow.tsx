import React from 'react';
import styled from 'styled-components';
import { themedPalette } from '../../lib/styles/themes';
import palette from '../../lib/styles/palette';
import SettingEditButton from './SettingEditButton';
import media from '../../lib/styles/media';

export type SettingRowProps = {
  title: string;
  children: React.ReactNode;
  onClickEdit?: () => void;
  editButton?: boolean;
  description?: string;
};

function SettingRow({
  title,
  children,
  editButton,
  description,
  onClickEdit,
}: SettingRowProps) {
  return (
    <Row>
      <div className="wrapper">
        <div className="title-wrapper">
          <h3>{title}</h3>
        </div>
        <div className="block-for-mobile">
          <div className="contents">{children}</div>
          {editButton && (
            <div className="edit-wrapper">
              <SettingEditButton onClick={onClickEdit} />
            </div>
          )}
        </div>
      </div>
      {description && <div className="description">{description}</div>}
    </Row>
  );
}

const Row = styled.div`
  padding-top: 1rem;
  padding-bottom: 1rem;
  & > .wrapper {
    display: flex;
    ${media.small} {
      flex-direction: column;
    }
  }
  .title-wrapper {
    width: 9.5rem;
    flex-shrink: 0;
    h3 {
      line-height: 1.5;
      color: ${themedPalette.text1};
      margin: 0;
      font-size: 1.125rem;
      ${media.small} {
        margin-bottom: 0.5rem;
      }
    }
  }
  .block-for-mobile {
    flex: 1;
    display: flex;
    align-items: center;
  }
  .contents {
    flex: 1;
    font-size: 1rem;
    color: ${themedPalette.text2};
    line-height: 1.5;
  }
  .description {
    margin-top: 0.875rem;
    color: ${themedPalette.text3};
    font-size: 0.875rem;
  }
  .edit-wrapper {
    display: flex;
    align-items: center;
    margin-left: 1rem;
  }
  & + & {
    border-top: 1px solid ${palette.gray2};
  }
`;

export default SettingRow;
