import { Link, useNavigate } from 'react-router-dom';
import { logo, searchIcon } from '../../assets/images';
import { useEffect, useState } from 'react';

const Header = () => {

  const navigate = useNavigate();

  const [search, setSearch] = useState<string>('');

  useEffect(() => {
    return () => {
      setSearch('')
    }
  }, [])

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
	}

  const navigateToSearch = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    navigate(`/items?search=${search}`, { replace: true });
    setSearch('')
  };

  return (
    <header className='bg-primary w-100 p-1 flex flex-0 flex-center'>
      <div className='contain m-auto flex'>
        <Link className='flex flex-center' to='/'>
          <img className='w-8' src={logo} alt="Logo" />
        </Link>
        <form className='flex w-100' onSubmit={navigateToSearch}>
          <input
            type="text"
            value={search}
            placeholder="Buscar..."
            className='searchInput'
            onChange={handleInputChange}
          />
          <button
            type="submit"
            className="searchIcon flex flex-center"
          >
            <img src={searchIcon} alt="Search Icon" className="w-4 h-4" />
          </button>
        </form>
      </div>
    </header>
  );
};

export default Header;
