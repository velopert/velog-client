import { useQuery } from '@apollo/react-hooks';
import React, { useEffect, useRef, useState } from 'react';
import { JOB_POSITIONS, JobPosition } from '../../lib/graphql/ad';
import styled from 'styled-components';
import VelogResponsive from '../velog/VelogResponsive';
import Typography from '../common/Typography';
import { themedPalette } from '../../lib/styles/themes';
import { ellipsis } from '../../lib/styles/utils';
import media from '../../lib/styles/media';
import gtag from '../../lib/gtag';

type Props = {
  category: 'frontend' | 'backend' | 'mobile' | 'python' | 'node' | 'ai' | null;
};

function JobPositions({ category }: Props) {
  const [isObserved, setIsObserved] = useState(false);
  const { data } = useQuery<{ jobPositions: JobPosition[] }>(JOB_POSITIONS, {
    variables: {
      category: category ?? undefined,
    },
    skip: !isObserved,
  });

  const ref = useRef<HTMLDivElement>(null);
  const initializedRef = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !initializedRef.current) {
            setIsObserved(true);
          }
        });
      },
      {
        rootMargin: '300px',
        threshold: 0,
      },
    );
    if (!ref.current) return;
    observer.observe(ref.current);
    return () => {
      observer.disconnect();
    };
  }, []);

  const onClick = () => {
    gtag('event', 'job_position_click');
  };

  useEffect(() => {
    if (!isObserved) {
      return;
    }
    gtag('event', 'job_position_view');
  }, [isObserved]);

  if (!data?.jobPositions)
    return (
      <Block>
        <div ref={ref}></div>
      </Block>
    );

  return (
    <Block>
      <div ref={ref}></div>
      <Typography>
        <h4>관련 채용 정보</h4>
        <Container>
          {data.jobPositions.map((jobPosition) => (
            <Card key={jobPosition.id} onClick={onClick}>
              <a href={jobPosition.url}>
                <Thumbnail src={jobPosition.thumbnail} />
              </a>
              <Company>
                <a href={jobPosition.url}>
                  <img src={jobPosition.companyLogo} />
                </a>
                <div>
                  <a href={jobPosition.url}>{jobPosition.companyName}</a>
                </div>
              </Company>
              <JobTitle href={jobPosition.url}>{jobPosition.name}</JobTitle>
            </Card>
          ))}
        </Container>
      </Typography>
    </Block>
  );
}

const Block = styled(VelogResponsive)`
  ${media.small} {
    h4 {
      padding-left: 1rem;
      padding-right: 1rem;
    }
  }
`;
const Container = styled.div`
  display: flex;
  gap: 1rem;
  a {
    display: block;
    color: inherit;
    &:hover {
      text-decoration: none;
      color: inherit;
    }
  }
  ${media.small} {
    padding-left: 0.5rem;
    padding-right: 0.5rem;
    gap: 0.5rem;
    overflow-x: auto;
    overflow-y: hidden;
    padding-bottom: 1rem;
  }
`;

const Card = styled.div`
  width: 25%;
  ${media.small} {
    flex-shrink: 0;
    width: 27vw;
  }
`;

const Thumbnail = styled.img`
  width: 100%;
  aspect-ratio: 400 / 292;
  object-fit: cover;
  border-radius: 4px;
`;

const Company = styled.div`
  display: flex;
  gap: 0.5rem;
  img {
    display: block;
    width: 16px;
    height: 16px;
  }
  font-size: 10px;
  align-items: center;
  color: ${themedPalette.text2};
  ${ellipsis};
  margin-bottom: 0.5rem;
`;

const JobTitle = styled.a`
  font-size: 12px;
  font-weight: 600;
  line-height: 1.25;
`;

export default JobPositions;
