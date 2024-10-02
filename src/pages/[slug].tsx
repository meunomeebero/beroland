import { GetServerSideProps } from "next";

export default function Redirect() {
  return;
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const link = params.link as string;

  // Mock data
  const map = {
    'cc': 'https://app.codecrafters.io/join?via=meunomeebero',
    'links': '/',
    'sf': 'https://shipfa.st/?via=bero',
  }

  return {
    redirect: {
      destination: map[link],
      permanent: false,
    }
  };
}
