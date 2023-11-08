import "./index.css";
import { Metadata } from "next";
import { UI } from "@components";
import { Helvetica, HelveticaBold } from "@theme/fonts";
import getData from "@utils/getData";

export const metadata: Metadata = {
  title: "ZHA - Matter of Form Test",
  description: "Test animated hero",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const data = await getData();

  return (
    <html
      lang="en"
      className={`${Helvetica.variable} ${HelveticaBold.variable}`}
    >
      <head></head>
      <body>
        {/* <Loader /> */}
        <UI data={data}>{children}</UI>
      </body>
    </html>
  );
}
