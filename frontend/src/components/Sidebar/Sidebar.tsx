import SearchInput from "../SearchInput/SearchInput"
import Conversations from "../Conversations/Conversations"
import LogoutButton from "../LogoutButton/LogoutButton"

const Sidebar = () => {

    return (
        <div className={`border-r overflow-scroll no-scrollbar min-[430px]: border-slate-500 p-4 flex flex-col`}>
            <SearchInput />
            <div className="divider px-3"></div>
            <Conversations/>
            <LogoutButton />

        </div>
    )
}

export default Sidebar