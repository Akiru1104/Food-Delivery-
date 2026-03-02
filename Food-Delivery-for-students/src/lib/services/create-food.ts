type Food = {
  foodName: string;
  price: number;
  image: string;
  ingredients: string;
  category: string;
};

export const createFood = async (payload: Food) => {
  const endPoint = "/food";
};
