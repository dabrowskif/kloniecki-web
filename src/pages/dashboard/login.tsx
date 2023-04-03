import { signIn } from "next-auth/react";
import Image from "next/image";
import { type GetServerSidePropsContext } from "next/types";
import React from "react";
import Footer from "~/components/general/Footer";
import Navbar from "~/components/general/Navbar";
import { env } from "~/env.mjs";
import { getServerAuthSession } from "~/server/auth";

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const session = await getServerAuthSession(ctx);

  if (session?.user) {
    return {
      redirect: {
        destination: "/dashboard",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}

const Login = () => {
  return (
    <>
      <Navbar />
      <main className="mt-20 h-screen">
        <div className="flex h-full w-full justify-center">
          <div className="m-auto">
            <button
              className="button-primary flex items-center px-20"
              onClick={() =>
                void signIn("google", {
                  redirect: true,
                  callbackUrl: `${env.NEXT_PUBLIC_FRONTEND_URL}/dashboard`,
                })
              }
            >
              <Image
                className="me-2"
                src="/icons/google-icon.png"
                width="30"
                height="30"
                alt="Google logo"
              />
              <span>Zaloguj się Googlem</span>
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Login;
