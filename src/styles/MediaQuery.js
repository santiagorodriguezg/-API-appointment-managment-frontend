import { useMediaQuery } from 'react-responsive';

export const isTablet = () => useMediaQuery({ query: '(min-width: 992px)' });
export const isMobileAndBelow = () => useMediaQuery({ query: '(max-width: 991px)' });

export const Tablet = ({ children }) => {
  return isTablet() ? children : null;
};

export const MobileAndBelow = ({ children }) => {
  return isMobileAndBelow() ? children : null;
};
