import { signIn } from "next-auth/react";
import Image from "next/image";
import { type GetServerSidePropsContext } from "next/types";
import React from "react";
import Footer from "~/components/general/Footer";
import Navbar from "~/components/general/Navbar";
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
              className="button-primary flex items-center"
              onClick={() =>
                void signIn("google", {
                  redirect: true,
                  callbackUrl: "http://localhost:3000/kalendarz",
                })
              }
            >
              <Image
                className="me-2"
                src="/google.png"
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
