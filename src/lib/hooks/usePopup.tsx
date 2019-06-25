import React, { useContext, useState } from 'react';

interface PopupContextValue {
  title: string;
  description: string;
  visible: boolean;
  onCancel?: () => any;
  onConfirm: () => any;
}

const PopupContext = React.createContext<PopupContextValue>({
  title: '',
  description: '',
  visible: false,
  onConfirm: () => {},
});

type Callbacks = {
  onCancel?: () => any;
  onConfirm: () => any;
};
type PopupInfo = {
  title: string;
  description: string;
};

// const PopupProvider: React.FC = ({ children }) => {
//   const [callbacks, setCallbacks] = useState<Callbacks>({
//     onCancel: undefined,
//     onConfirm: () => {}
//   });
//   const [popupInfo, setPopupInfo]
//   const value = {
//     ...callbacks,
//   }
//   return <PopupContext.Provider value={

//   }>
//     {children}
//   </PopupContext.Provider>
// }

type PopupOptions = Omit<PopupContextValue, 'visible'>;

const usePopup = (options: PopupOptions) => {
  const context = useContext;
};

// const askPopup = usePopup({
//   title: 'blablalbla',
//   description: 'blablalba',
//   onCancel: () => {},
//   onConfirm: () => {},
// }

// askPopup.open();
