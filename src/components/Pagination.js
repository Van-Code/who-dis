
function Pagination(props) {
  const { count, per_page, pages } = props.pagination;
  let showing =
    count <= 20 ? `${count} of ${count}` : `${per_page} of ${count}`;
  return (
    <nav>
      {showing}
  
    </nav>
  );
}
export default Pagination;
