import React, { useState, useEffect, FormEvent } from 'react';
import styled, { css, keyframes } from 'styled-components';
import { themedPalette } from '../../lib/styles/themes';
import palette from '../../lib/styles/palette';
import OutsideClickHandler from 'react-outside-click-handler';
import Button from '../common/Button';
import useInputs from '../../lib/hooks/useInputs';
import { escapeForUrl } from '../../lib/utils';

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

const PublishSeriesCreateBlock = styled.form<{ open: boolean }>`
  background: ${themedPalette.bg_element3};
  padding: 1rem;
  height: 4rem;
  transition: 0.125s all ease-in;
  ${(props) =>
    props.open &&
    css`
      height: 9rem;
    `}
`;

const Input = styled.input`
  height: 2rem;
  width: 100%;
  padding: 0.5rem;
  font-size: 0.875rem;
  border-radius: 2px;
  border: none;
  outline: none;
  box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.03);
  color: ${themedPalette.text1};
  &::placeholder {
    color: ${themedPalette.text3};
  }
`;

const URLInput = styled.div`
  height: 2rem;
  width: 100%;
  display: flex;
  padding: 0.5rem;
  font-size: 0.75rem;
  border-radius: 2px;
  box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.03);
  background: ${themedPalette.bg_element1};
  color: ${themedPalette.text3};
  input {
    color: ${themedPalette.text1};
    flex: 1;
    outline: none;
    border: none;
    font-size: inherit;
  }
`;

const OpenBlock = styled.div<{ disappear: boolean }>`
  margin-top: 0.5rem;
  animation-duration: 0.125s;
  animation-timing-function: ease-out;
  animation-name: ${fadeIn};
  animation-fill-mode: forwards;

  ${(props) =>
    props.disappear &&
    css`
      animation-name: ${fadeOut};
    `}
`;

const Buttons = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 0.5rem;
`;

export interface PublishSeriesCreateProps {
  onSubmit: (form: { name: string; urlSlug: string }) => any;
  username: string;
}

const PublishSeriesCreate: React.FC<PublishSeriesCreateProps> = ({
  onSubmit,
  username,
}) => {
  const [open, setOpen] = useState(false);
  const [showOpenBlock, setShowOpenBlock] = useState(false);
  const [disappear, setDisappear] = useState(false);
  const [form, onChange, onReset] = useInputs({
    name: '',
    urlSlug: '',
  });
  const [editing, setEditing] = useState<boolean>(false);

  const [defaultUrlSlug, setDefaultUrlSlug] = useState('');

  useEffect(() => {
    let timeoutId: number | null = null;
    if (open) {
      timeoutId = setTimeout(() => setShowOpenBlock(true), 125);
    } else {
      setShowOpenBlock(false);
    }
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [open]);

  useEffect(() => {
    setDefaultUrlSlug(escapeForUrl(form.name));
  }, [form.name]);

  // set editing to true when form.urlSlug gets changed
  useEffect(() => {
    if (form.urlSlug === '') return;
    setEditing(true);
  }, [form.urlSlug]);

  const onHide = () => {
    setDisappear(true);
    setTimeout(() => {
      setOpen(false);
      setDisappear(false);
      setShowOpenBlock(false);
    }, 125);
  };

  const submit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit({
      name: form.name,
      urlSlug: form.urlSlug || defaultUrlSlug,
    });
    onReset();
    onHide();
  };

  return (
    <OutsideClickHandler onOutsideClick={onHide}>
      <PublishSeriesCreateBlock open={open} onSubmit={submit}>
        <Input
          placeholder="새로운 시리즈 이름을 입력하세요"
          onFocus={() => setOpen(true)}
          name="name"
          onChange={onChange}
          value={form.name}
        />
        {showOpenBlock && (
          <OpenBlock disappear={disappear}>
            <URLInput>
              <span>/@{username}/series/</span>
              <input
                data-testid="urlslug-input"
                name="urlSlug"
                onChange={onChange}
                value={editing ? form.urlSlug : defaultUrlSlug}
              />
            </URLInput>
            <Buttons>
              <Button inline color="darkGray" onClick={onHide} type="button">
                취소
              </Button>
              <Button inline color="teal" type="submit">
                시리즈 추가
              </Button>
            </Buttons>
          </OpenBlock>
        )}
      </PublishSeriesCreateBlock>
    </OutsideClickHandler>
  );
};

export default PublishSeriesCreate;
