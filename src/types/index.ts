export interface User {
  id: string;
  name: string;
  email: string;
  title: string;
  team: string;
  token: string;
}

export interface Project {
  id: string;
  name: string;
  teamLeadId: string;
  pin: boolean;
  team: string;
  createdAt: number;
}
