const Search = (props) => {
	const handleSearch = (e) => {
		props.searchedService(e.target.value);
	};

	return (
		<form>
			<input
				className='search-input'
				type='text'
				placeholder='Search services'
				value={props.searchValue}
				onChange={handleSearch}></input>
		</form>
	);
};

export default Search;
