import React from 'react'
import { AnimatePresence } from "framer-motion";
import Layout from '../components/Layout'
import '../styles/globals.css'
import '../styles/MUICalendar.css'
import { useRouter } from 'next/router'

function MyApp({ Component, pageProps }) {
  const router = useRouter()
  return (
      <Layout>
         <AnimatePresence exitBeforeEnter>
          <Component key={router.pathname} {...pageProps}/>
        </AnimatePresence>
      </Layout>
  )
}

export default MyApp;
