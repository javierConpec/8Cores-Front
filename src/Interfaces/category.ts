export interface ICategory {
  id: string;
  name: string;
  description: string;
}

export interface ISubcategory {
  id: string;
  name: string;
  description: string;
  category: ICategory;  
}
