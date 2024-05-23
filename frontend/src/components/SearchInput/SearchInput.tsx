import { FaSearch } from 'react-icons/fa';
import { useState } from 'react';
import useConversation from '../../zustand/useConversation';
import useGetConversation from '../../hook/useGetConversations';
import toast from 'react-hot-toast';


const SearchInput = () => {
  const [ search, setSearch ] = useState("");
  const { setSelectedConversation } = useConversation();
  const { conversations } = useGetConversation();
  const handleSubmit = (e : React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(!search) return;
    if(search.length < 3) {
      return toast.error('Search item must be at least 3 characters length.');
    }
    const conversation = conversations.find((c) => c.fullName.toLowerCase().includes(search.toLowerCase()));
    if (conversation) {
      setSelectedConversation(conversation);
      setSearch('');
    }else toast.error('There is no conversation founded');
  }
  return (
    <form className="flex items-center gap-2" onSubmit={handleSubmit}>
        <input type="text" placeholder="Seach ..." className="input input-bordered rounded-full" value={search} onChange={(e) => setSearch(e.target.value)}/>
        <button type="submit" className="btn btn-circle bg-sky-500 text-white">
            <FaSearch/>
        </button>
    </form>
  )
}

export default SearchInput