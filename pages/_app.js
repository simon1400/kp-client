import '../styles/main.scss'
import UIkit from 'uikit';
import { WithGraphQL } from "../lib/api";
import { DataProvider } from '../context/dataStateContext'

function MyApp({ Component, pageProps }) {
  return <DataProvider><WithGraphQL><Component {...pageProps} /></WithGraphQL></DataProvider>
}

export default MyApp
