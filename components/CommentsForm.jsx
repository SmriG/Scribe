import React, {useState, useEffect, useRef} from 'react';
import { submitComment } from '../services';

const CommentsForm = ({slug}) => {
  const [error, setError] = useState(false);
  const [localStorage, setLocalStorage] = useState(null);
  const [showSuccessMesssage, setShowSuccessMesssage] = useState(false);
  const [formData, setFormData] = useState({
    name: null,
    email: null,
    comment: null,
    storeData: false
  })
  useEffect(() => {
    setLocalStorage(window.localStorage)
    const initialFormData = {
      name: window.localStorage.getItem('name'),
      email: window.localStorage.getItem('email'),
      storeData: window.localStorage.getItem('name') || window.localStorage.getItem('email')

    }
    // nameEl.current.value = localStorage.getItem('name');
    // emailEl.current.value = localStorage.getItem('email')
    setFormData(initialFormData);
  
  }, [])

  const onInputChange = (e) => {
    const { target } = e;
    if (target.type === 'checkbox') {
      setFormData((prevState) => ({
        ...prevState,
        [target.name]: target.checked,
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [target.name]: target.value,
      }));
    }
  };
  
  const handleCommentSubmission = () => {
    setError(false);
    const { name, email, comment, storeData } = formData;
    if (!name || !email || !comment) {      
      setError(true);
      return;
    }
    const commentObj = {
      name,
      comment,
      email,
      slug: slug
    }
    if(storeData.current.value){
      localStorage.setItem('name', name);
      localStorage.setItem('email', email)

    }else{
      localStorage.removeItem('name');
      localStorage.removeItem('email')

    }
    submitComment(commentObj)
    .then((res)=>{
      setShowSuccessMesssage(true);
      setTimeout(()=>{
        setShowSuccessMesssage(false)
      }, 3000)
    })
  }


  return (
    <div className='bg-white shadow-lg rounded-lg p-8 pb-12 mb-8'>
      <h3 className='text-xl mb-8 font-semibold border-b pb-4 '>Thoughts?</h3>
      <div className='grid grid-cols-1 gap-4 mb-4'>
        <textarea 
          value={formData.comment} 
          className='p-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700' 
          placeholder='Comment'
          name='comment'
          onChange={onInputChange}
        />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        <input 
          type='text' value={formData.name}
          className='py-2 px-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700' 
          placeholder='Name'
          name='name'
          onChange={onInputChange}
        />
        <input 
          type='email' value={formData.email}
          className='py-2 px-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700' 
          placeholder='Email'
          name='email'
          onChange={onInputChange}
        />

      </div>
      <div className='grid grid-cols-1 gap-4 mb-4'>
        <div>
          <input value={formData.storeData} type='checkbox' id='storeData' name='storedata' onChange={onInputChange}/>
          <label htmlFor='storeData' className='text-gray-500 cursor-pointer ml-4'>Save my e-mail and name for the next time</label>
        </div>
      </div>
      {error && <p className='text-xs text-red-500'>All fields are required</p>}
      <div className='mt-8'>
        <button 
        type='button' 
        onClick={handleCommentSubmission}
        className='transition duration-500 ease hover:bg-indigo-900 inline-block bg-pink-600 text-lg rounded-full text-white px-8 py-3'
        >Post Comment</button>
        {showSuccessMesssage && <span className='text-xl float-right font-semibold mt-3 text-green-500' >Comment submitted for review</span>}
      </div>
    </div>
  )
}

export default CommentsForm