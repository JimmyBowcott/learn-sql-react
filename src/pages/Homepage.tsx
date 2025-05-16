import { useEffect } from "react";
import { useNavigate } from "react-router";

function Homepage() {
  const navigate = useNavigate();

  useEffect(()=>{
    navigate("/levels");
  },[])

  return <></>
}

export default Homepage;
