import '../styles/main.scss'
import UIkit from 'uikit';
import { WithGraphQL } from "../lib/api";
import { DataProvider } from '../context/dataStateContext'
import Head from 'next/head';
import { useRouter } from 'next/router';
import buildImageUrl from '../function/buildImageUrl';
import Header from '../layout/Header';
import Footer from '../layout/Footer';
import Canvas from '../layout/Canvas';
import Auth from '../layout/Auth';
import Search from '../layout/Search';

function MyApp({ Component, pageProps }) {
  const {
    global, 
    meta, 
    bgImg, 
    bigHeader, 
    navigation,
    basket
  } = pageProps

  const router = useRouter()

  const defaultData = {
    siteUrl: process.env.NODE_ENV === 'development' ? 'http://localhost:3005' : 'https://kralovska-pece.cz',
    facebook_app_id: '',
    title: 'KRALOVSKA PECE',
    description: 'Kralovska pece',
    twitter: '@cereallarceny',
    separator: ' ',
    endTitle: '| Kralovska pece',
  }

  const theTitle = meta?.title ? (meta.title + " " + global.endTitle) : (defaultData.title + defaultData.separator + defaultData.endTitle);
  const theDescription = meta?.description ? meta.description : defaultData.description;
  const theImage = meta?.image ? buildImageUrl(meta.image) : null;

  return <DataProvider>
    <WithGraphQL>
      <Head>
          <meta charSet="utf-8" />
          <link rel="icon" href="/favicon/favicon.ico" />

          <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />
          <link rel="manifest" href="/favicon/site.webmanifest" />
          <link rel="mask-icon" href="/favicon/safari-pinned-tab.svg" color="#b09925" />

          <meta name="msapplication-TileColor" content="#b09925" />
          <meta name="theme-color" content="#b09925" />

          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <title>{theTitle}</title>
          <link rel="canonical" href={defaultData.siteUrl+router.asPath} />
          <meta itemProp="name" content={theTitle} />
          <meta itemProp="description" content={theDescription} />
          <meta itemProp="image" content={theImage} />
          <meta name="description" content={theDescription} />
          <meta property="og:title" content={theTitle} />
          <meta property="og:type" content="website" />
          <meta property="og:url" content={defaultData.siteUrl+router.asPath} />
          <meta property="og:image" content={theImage} />
          <meta property="og:description" content={theDescription} />
          <meta property="og:site_name" content="Kralovska pece" />
          {/* <meta property="fb:app_id" content={global.facebook_app_id} /> */}

          <script src="https://widget.packeta.com/v6/www/js/library.js"></script>

        </Head>
        <Header
          bgImg={bgImg}
          bigHeader={bigHeader}
          leftNav={navigation?.left_nav}
          rightNav={navigation?.right_nav}
          basket={basket} />
        <Component {...pageProps} />
        {!basket && <Footer data={global} nav={navigation?.footer_nav} soc={navigation?.soc_nav} />}
        <Canvas />
        {/* <Auth /> */}
        <Search />
      </WithGraphQL>
    </DataProvider>
}

export default MyApp
