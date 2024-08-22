import Navbar from "./Navbar/Navbar";


function Layout({children}) {
  return (
    <div className='layout'>
        <Navbar />
        <main>
            {children}
        </main>
    </div>
  )
}

export default Layout