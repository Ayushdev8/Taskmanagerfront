import {Link} from 'react-router-dom'
function NotFoundPage(){
    return(
        <>
            <div className="text-center m-5 bg-red-100 p-5 ">
                <h1 className="font-semibold text-2xl">Page Not Found!</h1>
                <h2>The page you tried accesing does not exist.</h2><br/>
                <Link to="/" className=' font-semibold   px-4 py-2 border border-black rounded-md hover:border-blue  hover:bg-indigo-400  transition'>Back home</Link>
            </div>
        </>
    )
}
export default NotFoundPage