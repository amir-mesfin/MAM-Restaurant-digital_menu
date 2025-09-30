import React, {useState, useEffect} from 'react'
import { useParams } from "react-router-dom";

export default function Catagory() {
  const  {catagoryId} = useParams();
  const [category, setCategory] = useState(null);
  const [foods, setFoods] = useState([]);
  const [categoryError, setCategoryError] = useState("");
  const [foodError, setFoodError] = useState("");

  const fetchCategories = async () => {
    try {
      const res = await api.get(`/category/getCategory/${catagoryId}`);
      setCategory(res.data);
    } catch (err) {
      setCategoryError("የምድብ መረጃ ማምጣት አልተቻለም");
    }
    fetchAllFood();

  };
  
  const fetchAllFood = async () => {
    try {
      const res = await api.get(`/food/getFood/${category.categoryName}`);
      setFoods(res.data);
    } catch (err) {
      setFoodError("ምግብ ማምጣት አልተቻለም");
    }
  };
  useEffect(() => {
    fetchCategories();
  }, []);



  return (
    <div>
      {catagoryId}
    </div>
  )
}
