export type Category = {
  categoryName: string;
  _id: string;
};

export const fetchCategories = async (): Promise<{
  data: Category[];
  error: boolean;
}> => {
  return { data: [], error: false };
};
