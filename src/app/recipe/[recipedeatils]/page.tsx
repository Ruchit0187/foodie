import axios from "axios";

interface recipeDetails {
  params: Promise<{recipedeatils:string}>;
  searchParams: Promise<object>;
}
async function page(props: Promise<recipeDetails>) {
   const {params,searchParams}=await props;
   const {recipedeatils}=await params
  const recipeIndividualData=await axios.get(`http://localhost:3000/api/recipe/${recipedeatils}`);
  console.log(recipeIndividualData)
  return <div>page</div>;
}

export default page;
