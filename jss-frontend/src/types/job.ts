export interface Job {
  id: number;
  title: string;
  description: string;
  salary: number;
  location: string;
  employer: {
    id: number;
    full_name: string;
    email: string;
  };
}