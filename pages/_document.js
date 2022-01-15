import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
            <link rel="preconnect" href="https://fonts.googleapis.com"></link>
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true"></link>
            <link href="https://fonts.googleapis.com/css2?family=Krub:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;1,200;1,300;1,400;1,500;1,600;1,700&display=swap" rel="stylesheet"></link>
            <link href="/aos/aos.css" rel="stylesheet"></link>
            <script src="/aos/aos.js"></script>
        </Head>
        <body>
          <Main />
          <NextScript />
          <script>
            AOS.init();
          </script>
        </body>
      </Html>
    )
  }
}

export default MyDocument