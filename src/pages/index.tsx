import React from 'react';
import Head from 'next/head';
import { GetServerSideProps } from 'next';

import { gql } from "@apollo/client";
import client from "../client/apollo-client";

import Container from '../components/Container';
import Main from '../components/Main';
import CountryList from '../components/CountryList';
import Footer from '../components/Footer';

import { Countries } from '../interfaces';

export default function Home({countries} : Countries) {
  return (
    <Container>
      <Head>
        <title>Country Club</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Main>
        <CountryList countries={countries}/>
      </Main>
      <Footer/>
    </Container>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const { data } = await client.query({
    query: gql`
      query Countries {
        countries {
          code
          name
          native
          capital
          currency
          continent{
            name
          }
        }
      }
    `,
  });

  return {
    props: {
      countries: data.countries,
    },
  };
}