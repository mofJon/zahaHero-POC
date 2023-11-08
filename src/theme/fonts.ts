import localFont from "next/font/local";

export const Helvetica = localFont({
  src: "../assets/fonts/helvetica.woff2",
  display: "swap",
  variable: "--helvetica-font",
});

export const HelveticaBold = localFont({
  src: "../assets/fonts/helveticaBold.woff2",
  display: "swap",
  variable: "--helvetica-bold-font",
});
