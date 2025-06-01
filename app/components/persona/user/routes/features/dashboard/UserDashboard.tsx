import {
  Gamepad2,
  SearchIcon,
  WandSparklesIcon,
  Users,
  User,
  MessageCircleIcon,
} from "lucide-react";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import {
  Select,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "~/components/ui/select";
import { useState } from "react";
import {
  Creator,
  creatorMockData,
} from "~/components/persona/user/server/dashboard/mock-data";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";

const genres = [
  { value: "gaming", label: "Gaming" },
  { value: "fitness", label: "Fitness" },
  { value: "education", label: "Education" },
];

export const reach = [
  { value: "1000 - 2000", label: "1000 - 2000" },
  { value: "2000 - 3000", label: "2000 - 3000" },
  { value: "3000 - 4000", label: "3000 - 4000" },
  { value: "4000 - 5000", label: "4000 - 5000" },
  { value: "5000 - 6000", label: "5000 - 6000" },
];

export interface Preferences {
  genre: string;
  reach: string;
}

const UserDashboard = () => {
  // states
  const [prompt, setPrompt] = useState<string>("");
  const [preferences, setPreferences] = useState<Preferences>({
    genre: "",
    reach: "",
  });
  const [creators, setCreators] = useState<Creator[]>([]);

  // (todo) useFetch

  /*
   * functions
   */

  //  1) handle serch by genre
  const handleSearch = (preferences: Preferences) => {
    const genre = preferences.genre;
    const reach = preferences.reach;
    console.log(preferences);
    const creators = creatorMockData.filter((creator: Creator) => {
      if (genre) {
        return creator.genre === genre;
      }
      if (reach) {
        return creator.reach === reach;
      }
    });
    setCreators(creators);
    console.log(creators);
  };

  // 2) handle serch by prompt
  const handlePromptSearch = (prompt: string) => {
    console.log(prompt);
  };

  // 3) handle genre change
  const handleGenreChange = (value: string) => {
    setPreferences({ ...preferences, genre: value });
  };

  // 4) handle reach change
  const handleReachChange = (value: string) => {
    setPreferences({ ...preferences, reach: value });
  };

  // 5) handle prompt change
  const handlePromptChange = (value: string) => {
    setPrompt(value);
  };

  return (
    <>
      <Card className="border-none shadow-none bg-transparent">
        <CardHeader>
          <CardTitle>Search </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {/* // 1) Categorization based of genres */}
          <Card>
            <CardHeader>
              <CardTitle>Genres</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {/* 1) Genre based categorization */}
              <Select
                onValueChange={handleGenreChange}
                value={preferences.genre}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a genre" />
                </SelectTrigger>
                <SelectContent>
                  {genres.map((genre) => (
                    <SelectItem key={genre.value} value={genre.value}>
                      {genre.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* 2) Reach based categorization */}
              <Select
                disabled
                onValueChange={handleReachChange}
                value={preferences.reach}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a reach" />
                </SelectTrigger>
              </Select>

              {/* Search button */}
              <Button
                type="button"
                className="w-fit"
                disabled={!preferences.genre}
                onClick={() => handleSearch(preferences)}
              >
                <SearchIcon className="w-4 h-4" />
                Search by Genre
              </Button>
            </CardContent>
          </Card>

          {/* // 2) Prompt based categorization */}
          <Card>
            <CardHeader>
              <CardTitle>Prompt</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 md:grid-cols-1 gap-2">
              {/* Prompt input */}
              <Input
                placeholder="Enter a prompt"
                value={prompt}
                onChange={(e) => handlePromptChange(e.target.value)}
              />
              <Button
                type="button"
                className="w-fit"
                disabled={!prompt}
                onClick={() => handlePromptSearch(prompt)}
              >
                <WandSparklesIcon className="w-4 h-4" />
                Prompt Search
              </Button>
            </CardContent>
          </Card>
          {/* // 3) Search based categorization */}
        </CardContent>
      </Card>
      <Card className="border-none shadow-none bg-transparent">
        {creators.length > 0 && (
          <>
            <CardHeader>
              <CardTitle>Creators</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {creators.map((creator) => (
                <Card key={creator.id}>
                  <CardHeader>
                    <CardTitle>{creator.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex items-center gap-2">
                    <Avatar>
                      <AvatarImage src={creator.profile} />
                      <AvatarFallback>HN</AvatarFallback>
                    </Avatar>
                    <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      <span className="flex items-center gap-2">
                        <span>Genre: {creator.genre} </span>
                        <Gamepad2 className="w-4 h-4" />
                      </span>
                      <span className="flex items-center gap-2">
                        <span>Reach: {creator.reach} </span>
                        <Users className="w-4 h-4" />
                      </span>
                      <span className="col-span-2">Id: @{creator.name}</span>
                    </CardContent>
                  </CardContent>
                  <CardFooter>
                    <Button>
                      <MessageCircleIcon className="w-4 h-4" />
                      Make a deal
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </CardContent>
          </>
        )}
      </Card>
    </>
  );
};

export default UserDashboard;
