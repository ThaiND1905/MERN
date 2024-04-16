import Sidebar from "../../components/Sidebar/Sidebar"
import MessageContainer from "../../components/Messages/MessageContainer"
import { useState ,useEffect } from "react"

const Home = () => {
  const [ isSize , setIsSize] = useState(false);
  const [deviceSize, changeDeviceSize] = useState(window.innerWidth);

    useEffect(() => {
      const resizeW = () => changeDeviceSize(window.innerWidth);
  
      window.addEventListener("resize", resizeW); // Update the width on resize
  
      if(deviceSize > 850) {
        setIsSize(true);
      }

      return () => window.removeEventListener("resize", resizeW);
    },[deviceSize]);


  return (
    <div className={`${ isSize ? "flex sm:h-[450px] md:h-[550px] rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0" : "flex h-screen w-full overflow-hidden"}`}>
        <Sidebar />
        <MessageContainer/>
    </div>
  )
}

export default Home