import React, {useEffect,useState} from 'react'
import axios from 'axios'
import Spinner from '../componets/Spinner'
import {Link} from 'react-router-dom'
import {AioutlineEdit} from 'react-icons/ai'
import {BSInfoCircle} from 'react-icons/bs'
import {MdOutlineAddBox,MdOutlineDelete} from 'react-icons/md'
const Home = () => {

  const [books,setBooks]= useState([]);
  const [loading,setLoading]= useState(false);
  useEffect(()=>{
    setLoading(true);
    axios
      .get('https://localhost:5555/books')
      .then((response)=>{
        setBooks(response.data.data);
        setLoading(false);
      })
      .catch((error)=>{
        console.log(error);
        setLoading(false);
      });
  })
  return (
    <div className='p-4'>
      <div className= 'flex justify-between items-center'>
        <h1 className='text-3xl my-8'>Books List</h1>
          <link to='/books/create'>
            <MdOutlineAddBox className='text-sky-800 text-4x1'/>
          </link>
      </div>
      {loading ? (
        <Spinner />
      ) : (
          <table className='w-full border-separate border-spacing-2'>
            <thead>
              <tr>
                <th className='border border-slate-600 round-md'>No</th>
                <th className='border border-slate-600 round-md'>Title</th>
                <th className='border border-slate-600 round-md max-md:hidden'>Auther</th>
                <th className='border border-slate-600 round-md max-md:hidden'>Publish Year</th>
                <th className='border border-slate-600 round-md'>Operations</th>
              </tr>
              {books.map(()=>{
                <tr key={books._id} className='h-8'>
                  <td className='border border-slate-700 rounded-md text-center max-md:hidden'>
                    {index +1}
                  </td>
                  <td className='border border-slate-700 rounded-md text-center'>
                    {books.title}
                  </td>
                  <td className='border border-slate-700 rounded-md text-center max-md:hidden'>
                    {books.auther}
                  </td>
                  <td className='border border-slate-700 rounded-md text-center max-md:hidden'>
                    {books.publishYear}
                  </td>
                  <td className='border border-slate-700 rounded-md text-centern'>
                    <div className='flex justify-center gap-x-4'>
                      <Link typeof={`(/books/details/${book._id}`}>
                        <BsInfoCircle className='text-2x1 text-green-800'/>
                      </Link>
                      <Link>
                        
                      </Link>
                    </div>
                  </td>

                </tr>
              })}
            </thead>
          </table>
      )}
    </div>
  )
}

export default Home
