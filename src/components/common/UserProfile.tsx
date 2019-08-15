import React, { CSSProperties } from 'react';
import styled, { css } from 'styled-components';
import palette from '../../lib/styles/palette';
import {
  GithubIcon,
  TwitterIcon,
  FacebookSquareIcon,
  EmailIcon,
} from '../../static/svg';

const UserProfileBlock = styled.div<{ gray?: boolean }>`
  ${props =>
    props.gray &&
    css`
      background: ${palette.gray0};
      border-radius: 8px;
      box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.06);
      padding: 2rem 1.5rem;
    `}
`;

const Section = styled.div`
  display: flex;
  align-items: center;
  img {
    display: block;
    width: 8rem;
    height: 8rem;
    border-radius: 50%;
    object-fit: cover;
    box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.06);
  }
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 1rem;
  font-family: 'Spoqa Han Sans', -apple-system, BlinkMacSystemFont,
    -apple-system, BlinkMacSystemFont, 'Helvetica Neue', 'Apple SD Gothic Neo',
    arial, 나눔고딕, 'Nanum Gothic', 돋움;

  .name {
    font-size: 1.5rem;
    line-height: 1.5;
    font-weight: bold;
    color: ${palette.gray9};
  }
  .description {
    white-space: pre-wrap;
    font-size: 1.125rem;
    line-height: 1.5;
    margin-top: 0.25rem;
    color: ${palette.gray7};
    letter-spacing: -0.02em;
  }
`;

const Separator = styled.div`
  background: ${palette.gray2};
  width: 100%;
  height: 1px;
  margin-top: 2rem;
  margin-bottom: 1.5rem;
`;

const ProfileIcons = styled.div`
  color: ${palette.gray5};
  svg {
    cursor: pointer;
    width: 2rem;
    height: 2rem;
    &:hover {
      color: ${palette.gray8};
    }
  }
  svg + svg {
    margin-left: 1rem;
  }
`;

export interface UserProfileProps {
  className?: string;
  gray?: boolean;
  style?: CSSProperties;
}

const UserProfile: React.FC<UserProfileProps> = ({
  gray,
  className,
  style,
}) => {
  return (
    <UserProfileBlock gray={gray} className={className} style={style}>
      <Section>
        <img
          src="https://thumb.velog.io/resize?url=https://images.velog.io/images/velopert/profile/ca385170-77e7-11e9-ba3a-fb3a8e4f1096/1536400727.98.png&width=256"
          alt="profile"
        />
        <UserInfo>
          <div className="name">Minjun Kim</div>
          <div className="description">
            Frontend Engineer@RIDI Corp. 개발을 재미있게 이것 저것 하는
            개발자입니다.
          </div>
        </UserInfo>
      </Section>
      <Separator />
      <ProfileIcons>
        <GithubIcon />
        <TwitterIcon />
        <FacebookSquareIcon />
        <EmailIcon />
      </ProfileIcons>
    </UserProfileBlock>
  );
};

export default UserProfile;
