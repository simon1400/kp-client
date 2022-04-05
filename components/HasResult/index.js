import { connectStateResults } from 'react-instantsearch-dom';
// import Button from '../../../components/Button';

const HasResult = ({ allSearchResults }) => {

  const hasResults = allSearchResults && (allSearchResults?.blogs?.nbHits !== 0 || allSearchResults?.categories?.nbHits !== 0 || allSearchResults?.produkties?.nbHits !== 0 || allSearchResults?.brands?.nbHits !== 0);
  
  if(!hasResults) {
    return (
      <div className="has-result-wrap">
        <div className="not-result-search">
          <div>
            <p>Je nám líto, ale Vašemu požadavku neodpovídá žádný záznam.</p>
          </div>
        </div>
      </div>
    )
  }else{
    return null
  }
  
}

export default connectStateResults(HasResult)
