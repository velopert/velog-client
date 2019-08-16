import React, { CSSProperties } from 'react';
import styled, { css } from 'styled-components';
import palette from '../../lib/styles/palette';
import {
  GithubIcon,
  TwitterIcon,
  FacebookSquareIcon,
  EmailIcon,
} from '../../static/svg';
import { userThumbnail } from '../../static/images';

const UserProfileBlock = styled.div``;

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
  style?: CSSProperties;
  thumbnail: string | null;
  displayName: string;
  description: string;
}

const UserProfile: React.FC<UserProfileProps> = ({
  className,
  style,
  thumbnail,
  displayName,
  description,
}) => {
  return (
    <UserProfileBlock className={className} style={style}>
      <Section>
        <img src={thumbnail || userThumbnail} alt="profile" />
        <UserInfo>
          <div className="name">{displayName}</div>
          <div className="description">{description}</div>
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
