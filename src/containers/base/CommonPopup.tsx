import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../modules';
import PopupOKCancel from '../../components/common/PopupOKCancel';
import { closePopup } from '../../modules/core';

export interface CommonPopupProps {}

function CommonPopup(props: CommonPopupProps) {
  const popup = useSelector((state: RootState) => state.core.popup);
  const dispatch = useDispatch();
  const onConfirm = () => {
    dispatch(closePopup());
  };
  return (
    <PopupOKCancel
      title={popup.title}
      visible={popup.visible}
      onConfirm={onConfirm}
    >
      {popup.message}
    </PopupOKCancel>
  );
}

export default CommonPopup;
