import type React from 'react';
import { Bounce, ToastContainer } from 'react-toastify';

type ToasterProps = {
  children: React.ReactNode;
};
export function Toaster({ children }: ToasterProps) {
  return (
    <>
    {children}
      <ToastContainer
        position='top-center'
        autoClose={10000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={true}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='light'
        transition={Bounce}
      />
    </>
  );
}
