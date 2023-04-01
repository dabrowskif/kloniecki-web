import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

import AOS from "aos";
import "aos/dist/aos.css";
import { api } from "~/utils/api";

import "~/styles/globals.css";
import { useEffect } from "react";
import Script from "next/script";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <>
      <SessionProvider session={session}>
        <Component {...pageProps} />
      </SessionProvider>
      <Script src="https://cdnjs.cloudflare.com/ajax/libs/flowbite/1.6.4/flowbite.min.js" />
    </>
  );
};

export default api.withTRPC(MyApp);
