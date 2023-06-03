import { type TRPCClientError } from "@trpc/client";
import { type TRPCErrorShape, type TRPCErrorResponse } from "@trpc/server/rpc";
import { type GetServerSidePropsContext } from "next";
import React from "react";
import { getTrpcClient } from "~/client/clients/trpcClient";
import { api } from "~/utils/api";

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const confirmationToken = ctx.query?.confirmation_token?.toString();
  const shouldConfirm = ctx.query?.should_confirm === "true";
  const trpcClient = getTrpcClient();

  let errorMessage;

  if (!confirmationToken) {
    return {
      props: {
        message: "Nieprawidłowy token potwierdzający, lub token stracił ważność.",
      },
    };
  }

  await trpcClient.visitReservation.changeUserConfirmationByToken
    .mutate({ confirmationToken, shouldConfirm })
    .catch((e: TRPCErrorShape) => {
      errorMessage = e.message;
    });

  return {
    props: {
      message: errorMessage
        ? errorMessage
        : shouldConfirm
        ? "Wizyta została pomyślnie potwierdzona."
        : "Wizyta została pomyślnie odwołana.",
    },
  };
}
interface IVisitConfirmationProps {
  message: string;
}

const VisitConfirmation = (props: IVisitConfirmationProps) => {
  const { message } = props;

  return (
    <div>
      <p>{message}</p>
    </div>
  );
};

export default VisitConfirmation;
