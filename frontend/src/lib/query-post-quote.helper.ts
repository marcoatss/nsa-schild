import { QuoteInput } from "./types";

export const queryPostQuote = async (data: QuoteInput) => {
  const { status } = await fetch(
    `${process.env.NEXT_PUBLIC_URL_BACKEND}/api/quotes`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data,
      }),
    },
  );
};
