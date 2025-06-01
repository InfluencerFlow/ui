import { PROFILE_PICTURES } from "~/models/profilePictures";

export interface Creator {
  id: number;
  name: string;
  genre: string;
  reach: string;
  profile: string;
}

export const creatorMockData: Creator[] = [
  {
    id: 1,
    name: "John Doe",
    genre: "gaming",
    reach: "1000",
    profile: PROFILE_PICTURES[0],
  },
  {
    id: 2,
    name: "Jake Paul",
    genre: "fitness",
    reach: "2000",
    profile: PROFILE_PICTURES[1],
  },
  {
    id: 3,
    name: "Khabib Nurmagomedov",
    genre: "education",
    reach: "3000",
    profile: PROFILE_PICTURES[2],
  },
  {
    id: 4,
    name: "Khabib Nurmagomedov",
    genre: "gaming",
    reach: "4000",
    profile: PROFILE_PICTURES[3],
  },
  {
    id: 5,
    name: "Dwayne Johnson",
    genre: "sports",
    reach: "5000",
    profile: PROFILE_PICTURES[0],
  },
  {
    id: 6,
    name: "Elon Musk",
    genre: "sports",
    reach: "6000",
    profile: PROFILE_PICTURES[1],
  },
];
