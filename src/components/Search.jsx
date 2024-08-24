const Search = (props) => {
	const handleSearch = (e) => {
		props.searchedService(e.target.value);
	};

	return (
		
		<div className='flex justify-center'>
			<form className='border border-gray-400 w-3/5 rounded-s-full rounded-e-full h-12 flex mt-5'>
				<input
					className='w-full bg-[#0d1829] flex bg-transparent pl-2 text-[#cccccc] outline-0'
					type='text'
					placeholder='Search services'
					value={props.searchValue}
					onChange={handleSearch}>

				</input>

				
			</form>
		</div>
	);
};

export default Search;
