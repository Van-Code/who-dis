import '../Results.css';

function ResultsGrid(props) {
  const persons = props.persons;

  if (persons.length === 0) {
    return <p>0 results</p>;
  }
  return (
    <div className='results'>
      <div className='row heading'>
        <div className='name'>Contributor</div>
        <div className='occupation'>Occupation</div>
        <div>Recipient</div>
        <div className='amount'>Amount</div>
      </div>
      {persons.map((person, i) => {
   
        return (
          <div key={i} className='row'>
            <div className='name'>{person.contributor_name}</div>
            <div className='occupation'>{person.contributor_occupation}</div>
            <div className='recipient'>{person.committee.name}</div>
            <div className='amount'>${person.contributor_aggregate_ytd}</div>
          </div>
        );
      })}
    </div>
  );
}

export default ResultsGrid;
