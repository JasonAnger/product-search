import '../styles/global.css'
import Footer from '../components/Footer'
import SearchPage from '../components/SearchPage'
import CopiedNoti from '../components/CopiedNoti'
import { useState, useEffect } from 'react'
import Head from 'next/head'

function MyApp() {
  let doCopied = () => {
    console.log("Copied")
    document.querySelector(".copied").className="copied active"
    setTimeout(() => {
      document.querySelector(".copied").className="copied"
    }, 1200)
  }
  return (
    <>
      <Head>
        <title>Product Searcher</title>
      </Head>
      <CopiedNoti />
      <SearchPage doCopied={doCopied} />
      <Footer />
    </>
  )
}

export default MyApp
