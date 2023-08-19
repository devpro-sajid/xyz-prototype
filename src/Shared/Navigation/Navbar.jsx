import  {useState} from 'react'
import { Link, NavLink } from 'react-router-dom'

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    
    return (
        <div className='sticky top-0 bg-black z-10'>
            <div className='py-4 boxed-container'>
                <div className='relative flex items-center justify-between'>
                    <Link
                        to='/'
                        aria-label='XYZ ENGINE'
                        title='XYZ ENGINE'
                        className='inline-flex items-center md:w-2/5 w-full'
                    >
                        <div className='flex items-center justify-center sm:w-10 w-8 h-12 rounded-full'>
                            <img src="/xyz-logo.png" alt="" />
                        </div>
                        <span className='ml-2 sm:block hidden sm:text-2xl md:text-3xl font-bold tracking-wide text-white '>
                            XYZ ENGINE
                        </span>
                        <span className='ml-2 sm:hidden text-xl font-bold tracking-wide text-black'>
                            XYZ
                        </span>
                    </Link>
                    <div className='hidden space-between lg:flex md:w-3/5 w-full'>
                        <ul className='items-center space-x-8 flex ml-auto mr-6'>
                            <li>
                                <NavLink
                                    to='/'
                                    aria-label='Home'
                                    title='Home'
                                    className={({ isActive }) => (isActive ? 'active' : 'default')}
                                >
                                    Home
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to='/result'
                                    aria-label='result'
                                    title='result'
                                    className={({ isActive }) => (isActive ? 'active' : 'default')}
                                >
                                    Result
                                </NavLink>
                            </li>
                        </ul>
                    </div>

                    <div className='lg:hidden flex items-center'>
                        <button
                            aria-label='Open Menu'
                            title='Open Menu'
                            className='p-2 ml-3 -mr-1 transition duration-200 rounded focus:outline-none focus:shadow-outline hover:bg-deep-purple-50 focus:bg-deep-purple-50'
                            onClick={() => setIsMenuOpen(true)}
                        >
                            <svg className='w-5 text-white' viewBox='0 0 24 24'>
                                <path
                                    fill='currentColor'
                                    d='M23,13H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,13,23,13z'
                                />
                                <path
                                    fill='currentColor'
                                    d='M23,6H1C0.4,6,0,5.6,0,5s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,6,23,6z'
                                />
                                <path
                                    fill='currentColor'
                                    d='M23,20H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,20,23,20z'
                                />
                            </svg>
                        </button>
                        {isMenuOpen && (
                            <div className='absolute z-10 top-0 left-0 w-full'>
                                <div className='p-5 bg-white border rounded shadow-sm'>
                                    <div className='flex items-center justify-between mb-4'>
                                        <div>
                                            <Link
                                                to='/'
                                                aria-label='XYZ Engine'
                                                title='XYZ'
                                                className='inline-flex items-center'
                                            >
                                                <div className='flex items-center justify-center w-8 h-8 rounded-full'>
                                                    <img src="/xyz-logo.png" alt="" />
                                                </div>
                                                <span className='ml-2 text-xl font-bold tracking-wide text-black uppercase'>
                                                    XYZ
                                                </span>
                                            </Link>
                                        </div>
                                        <div>
                                            <button
                                                aria-label='Close Menu'
                                                title='Close Menu'
                                                className='p-2 -mt-2 -mr-2 transition duration-200 rounded hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline'
                                                onClick={() => setIsMenuOpen(false)}
                                            >
                                                <svg className='w-5 text-gray-600' viewBox='0 0 24 24'>
                                                    <path
                                                        fill='currentColor'
                                                        d='M19.7,4.3c-0.4-0.4-1-0.4-1.4,0L12,10.6L5.7,4.3c-0.4-0.4-1-0.4-1.4,0s-0.4,1,0,1.4l6.3,6.3l-6.3,6.3 c-0.4,0.4-0.4,1,0,1.4C4.5,19.9,4.7,20,5,20s0.5-0.1,0.7-0.3l6.3-6.3l6.3,6.3c0.2,0.2,0.5,0.3,0.7,0.3s0.5-0.1,0.7-0.3 c0.4-0.4,0.4-1,0-1.4L13.4,12l6.3-6.3C20.1,5.3,20.1,4.7,19.7,4.3z'
                                                    />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                    <nav>
                                        <ul className='space-y-4'>
                                            <li>
                                                <NavLink
                                                    to='/'
                                                    aria-label='Home'
                                                    title='Home'
                                                    className={`${({ isActive }) => (isActive ? 'active' : 'default')}font-medium tracking-wide text-black transition-colors duration-200 hover:text-deep-purple-accent-400`}
                                                >
                                                    Home
                                                </NavLink>
                                            </li>
                                            <li>
                                                <NavLink
                                                    to='/result'
                                                    aria-label='Result'
                                                    title='Result'
                                                    className={`${({ isActive }) => (isActive ? 'active' : 'default')}font-medium tracking-wide text-black transition-colors duration-200 hover:text-deep-purple-accent-400`}
                                                >
                                                    Result
                                                </NavLink>
                                            </li>
                                        </ul>
                                    </nav>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Navbar;