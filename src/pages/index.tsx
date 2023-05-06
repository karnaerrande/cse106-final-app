import {useEffect} from 'react';
import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import { redirect } from 'next/navigation';
import { api } from "~/utils/api";
import {Typography,Button, Alert} from '@mui/material';

const Home: NextPage = () => {
  //const comp = api.company.getAll.useQuery();
 
  return (
    <div>
      <Head>
        <title>Financial Statement App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main style={{textAlign:"center"}}>
        <div style={{paddingTop:"10%"}}>
        <Alert style={{width:"400px",margin:"auto", marginBottom:"20px"}}  severity="warning">
          Data viewed in this application may be incomplete and/or inaccurate
        </Alert>
          <Typography variant="h2" color="black" >
            Financial Statement App
          </Typography>
            <AuthShowcase />
        </div>
      </main>
    </div>
  );
};

export default Home;

const AuthShowcase: React.FC = () => {
  const { data: sessionData } = useSession();

  return (
    <div style={{paddingTop:"50px"}}>
      <p >
        {sessionData && 
        <Button href="/companies" variant="contained"
        style={{marginBottom:"5px"}}>
          Dashboard  
        </Button>}
      </p>
      <Button variant="contained"
          style={{backgroundColor:"gray"}}
        onClick={sessionData ? () => void signOut() : () => void signIn()}
      >
        {sessionData ? "Sign out" : "Sign in"}
      </Button>
    </div>
  );
};
