import { gql } from "@apollo/client";
import navQuery from './nav'

import { GLOBAL_SETTINGS } from './fragments'

const userQuery = gql`
  ${GLOBAL_SETTINGS}
  query user {
    global {
      ...GlobalSettings
    }
    ${navQuery}
  }
`

export default userQuery
