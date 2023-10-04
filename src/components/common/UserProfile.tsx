import React, { CSSProperties, useState, useRef } from 'react';
import styled from 'styled-components';
import { themedPalette } from '../../lib/styles/themes';
import palette from '../../lib/styles/palette';
import {
  GithubIcon,
  TwitterIcon,
  FacebookSquareIcon,
  EmailIcon,
} from '../../static/svg';
import { userThumbnail } from '../../static/images';
import { ProfileLinks } from '../../lib/graphql/user';
import { MdHome } from 'react-icons/md';
import Skeleton from './Skeleton';
import SkeletonTexts from './SkeletonTexts';
import { Link } from 'react-router-dom';
import media from '../../lib/styles/media';
import optimizeImage from '../../lib/optimizeImage';

const UserProfileBlock = styled.div`
  ${media.medium} {
    padding-left: 1rem;
    padding-right: 1rem;
  }
`;

const Section = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  .left {
    display: flex;

    ${media.small} {
      flex-direction: column;
    }
  }

  img {
    display: block;
    width: 8rem;
    height: 8rem;
    border-radius: 50%;
    object-fit: cover;
    box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.06);
    ${media.small} {
      width: 5rem;
      height: 5rem;
    }
  }
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 1rem;
  /* font-family: 'Spoqa Han Sans', -apple-system, BlinkMacSystemFont,
    -apple-system, BlinkMacSystemFont, 'Helvetica Neue', 'Apple SD Gothic Neo',
    arial, 나눔고딕, 'Nanum Gothic', 돋움; */

  .name {
    font-size: 1.5rem;
    line-height: 1.5;
    font-weight: bold;
    color: ${themedPalette.text1};
    a {
      color: inherit;
      text-decoration: none;
      &:hover {
        color: ${themedPalette.text1};
        text-decoration: underline;
      }
    }
  }
  .description {
    white-space: pre-wrap;
    font-size: 1.125rem;
    line-height: 1.5;
    margin-top: 0.25rem;
    color: ${themedPalette.text2};
    letter-spacing: -0.004em;
  }

  ${media.small} {
    margin-left: 0;
    margin-top: 1rem;

    .name {
      font-size: 1.125rem;
    }
    .description {
      margin-top: 0.5rem;
      font-size: 0.875rem;
      letter-spacing: -0.004em;
    }
  }
`;

const Separator = styled.div`
  background: ${themedPalette.bg_element3};
  width: 100%;
  height: 1px;
  margin-top: 2rem;
  margin-bottom: 1.5rem;
  ${media.small} {
    margin-top: 1rem;
    margin-bottom: 1rem;
  }
`;

const ProfileIcons = styled.div`
  color: ${themedPalette.text3};
  display: flex;
  svg {
    cursor: pointer;
    width: 2rem;
    height: 2rem;
    &:hover {
      color: ${themedPalette.text1};
    }
    ${media.small} {
      width: 1.5rem;
      height: 1.5rem;
    }
  }
  a {
    color: inherit;
    display: block;
  }
  a + a,
  a + svg {
    margin-left: 1rem;
  }
`;

export interface UserProfileProps {
  className?: string;
  style?: CSSProperties;
  thumbnail: string | null;
  displayName: string;
  description: string;
  profileLinks: ProfileLinks;
  username: string;
  followButton?: React.ReactNode;
  ownPost?: boolean;
}

function includeProtocol(address: string) {
  return /^https?:\/\//.test(address) ? address : `https://${address}`;
}

const UserProfile: React.FC<UserProfileProps> = ({
  className,
  style,
  thumbnail,
  displayName,
  description,
  profileLinks,
  username,
  followButton,
  ownPost = false,
}) => {
  const { email, facebook, github, twitter, url } = profileLinks;
  const [hoverEmail, setHoverEmail] = useState(false);
  const emailBlockRef = useRef<HTMLDivElement>(null);

  const onMouseEnterEmail = () => {
    setHoverEmail(true);
  };
  const onMouseLeaveEmail = (e: React.MouseEvent) => {
    if (e.relatedTarget === emailBlockRef.current) return;
    setHoverEmail(false);
  };

  const velogUrl = `/@${username}`;

  return (
    <UserProfileBlock className={className} style={style}>
      <Section>
        <div className="left">
          <Link to={velogUrl}>
            <img
              src={optimizeImage(thumbnail || userThumbnail, 240)}
              alt="profile"
            />
          </Link>
          <UserInfo>
            <div className="name">
              <Link to={velogUrl}>{displayName}</Link>
            </div>
            <div className="description">{description}</div>
          </UserInfo>
        </div>
        {!ownPost && followButton && (
          <div className="right">{followButton}</div>
        )}
      </Section>
      <Separator />
      <ProfileIcons>
        {github && (
          <a
            href={`https://github.com/${github}`}
            target="_blank"
            rel="noopener noreferrer"
            data-testid="github"
          >
            <GithubIcon />
          </a>
        )}
        {twitter && (
          <a
            href={`https://twitter.com/${twitter}`}
            target="_blank"
            rel="noopener noreferrer"
            data-testid="twitter"
          >
            <TwitterIcon />
          </a>
        )}
        {facebook && (
          <a
            href={`https://facebook.com/${facebook}`}
            target="_blank"
            rel="noopener noreferrer"
            data-testid="facebook"
          >
            <FacebookSquareIcon />
          </a>
        )}
        {url && (
          <a
            href={includeProtocol(url)}
            target="_blank"
            rel="noopener noreferrer"
            data-testid="facebook"
          >
            <MdHome />
          </a>
        )}
        {email && (
          <a href={`mailto:${email}`}>
            <EmailIcon
              data-testid="email"
              onMouseEnter={onMouseEnterEmail}
              onMouseLeave={onMouseLeaveEmail}
            />
          </a>
        )}
        {hoverEmail && (
          <EmailBlock ref={emailBlockRef} onMouseLeave={onMouseLeaveEmail}>
            <div>{email}</div>
          </EmailBlock>
        )}
      </ProfileIcons>
    </UserProfileBlock>
  );
};

type UserProfileSkeletonProps = {
  className?: string;
};

export function UserProfileSkeleton({ className }: UserProfileSkeletonProps) {
  return (
    <UserProfileBlock className={className}>
      <Section>
        <ThumbnailSkeleton circle />
        <UserInfo>
          <div className="name">
            <Skeleton width="5rem" />
          </div>
          <div className="description">
            <SkeletonTexts wordLengths={[5, 2, 3, 4, 5]} />
          </div>
        </UserInfo>
      </Section>
      <Separator />
      <ProfileIcons>
        {Array.from({ length: 3 }).map((_, index) => (
          <Skeleton
            marginRight="1rem"
            width="2rem"
            height="2rem"
            circle
            key={index}
          />
        ))}
      </ProfileIcons>
    </UserProfileBlock>
  );
}

const ThumbnailSkeleton = styled(Skeleton)`
  width: 8rem;
  height: 8rem;
`;

const EmailBlock = styled.div`
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  div {
    background: ${palette.gray7};
    box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.05);
    padding: 0.5rem;
    font-size: 0.875rem;
    color: white;
    border-radius: 4px;
    ${media.small} {
      padding: 0.25rem 0.5rem;
      font-size: 0.75rem;
    }
  }
`;

export default UserProfile;
