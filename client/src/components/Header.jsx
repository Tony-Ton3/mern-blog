import { Navbar, TextInput, Button, Dropdown, Avatar } from 'flowbite-react'; 
import { Link, useLocation } from 'react-router-dom'; //page navigation without rerender
import { AiOutlineSearch } from 'react-icons/ai';
import { FaMoon, FaSun } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme } from '../redux/theme/themeSlice';


export default function Header() {
  const path = useLocation().pathname; //specifies path for Navbar.link active prop
  const dispatch = useDispatch();
  const {currentUser} = useSelector((state) => state.user); //redux hook to get current user
  const { theme } = useSelector((state) => state.theme); //redux hook to get current theme

  return (
    <Navbar className='border-b-2'>
        <Link to="/" className='self-center whitespace-nowrap text-sm 
        sm:text-xl font-semibold dark:text-white'>
            <span className='px-2 py-1 bg-gradient-to-r from-emerald-500 to to-black rounded-lg text-white'>Collab</span>
            In
        </Link>
        <form>
          <TextInput
            type='text'
            placeholder='Search...'
            rightIcon={AiOutlineSearch}
            className='hidden lg:inline' //hidden on small screen, inline for large screen
          />
        </form>
        <Button className='w-12 h-10 lg:hidden' color='gray' pill>
          <AiOutlineSearch />
        </Button>
        <div className="flex gap-2 md:order-2">
          <Button className='w-12 h-10 hidden sm:inline' color='gray' pill onClick={()=>dispatch(toggleTheme())}>
            {theme === 'light' ? <FaMoon /> : <FaSun />}
          </Button>

         {currentUser ? (
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <Avatar
                alt='user'
                img={currentUser.profilePicture}
                rounded
              />
            }
         >
          <Dropdown.Header>
            <span className = 'block text-sm'>@{currentUser.username}</span>
            <span className = 'block text-sm font-medium truncate'>@{currentUser.email}</span>
          </Dropdown.Header>
          <Link to={'/dashboard?tab=profile'}>
            <Dropdown.Item>Profile</Dropdown.Item>
          </Link>
          <Dropdown.Divider />
          <Dropdown.Item>
               Sign out
          </Dropdown.Item>
         </Dropdown>

         ) : (
           <Link to="/sign-in">
             <Button gradientDuoTone='purpleToBlue' outline>
               Sign in
               </Button>
           </Link>
         )
         } 

          <Navbar.Toggle />
        </div>
            <Navbar.Collapse>
              <Navbar.Link active={path === "/"} as={'div'}> {/*as={'div'} becaue we nested another link */}
                <Link to='/'>
                  Home
                </Link>
              </Navbar.Link>
              <Navbar.Link active={path === "/about"} as={'div'}>
                <Link to='/about'>
                  About
                </Link>
              </Navbar.Link>
              <Navbar.Link active={path === "/projects"} as={'div'}>
                <Link to='/projects'>
                  Projects
                </Link>
              </Navbar.Link>
            </Navbar.Collapse>
    </Navbar>
  );
}