import '../styles/main.scss'
import UIkit from 'uikit';
import { WithGraphQL } from "../lib/api";

function MyApp({ Component, pageProps }) {
  return <WithGraphQL><Component {...pageProps} /></WithGraphQL>
}

export default MyApp
