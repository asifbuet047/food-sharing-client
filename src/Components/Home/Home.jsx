import useAxios from '../../Hooks/useAxios'
import ThreeCircleLoading from "../Loading/BeatLoading";
import FeaturedFoodContainer from "./FeaturedFoodContainer/FeaturedFoodContainer";
import { useEffect, useState } from "react";


function Home() {
  const instance = useAxios();
  const [featuredFoods, setFeaturedFoods] = useState(null);

  useEffect(() => {
    instance.get('/featuredfoods').then((response) => {
      console.log(response);
      setFeaturedFoods(response.data);
    }).catch((error) => {
      console.log(error);
    }).finally(() => {
      console.log("Finally");
    })
  }, []);


  return (
    <div>
      {
        featuredFoods ?
          <FeaturedFoodContainer data={featuredFoods}></FeaturedFoodContainer>
          : <ThreeCircleLoading circleSize={'5em'}></ThreeCircleLoading>
      }
    </div>
  )
}

export default Home