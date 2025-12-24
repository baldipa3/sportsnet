import { useState, useEffect } from "react";
import Select from "react-select";
import { FaCamera, FaTrophy } from "react-icons/fa";
import { GiWhistle } from "react-icons/gi";
import UserMenu from "../UserMenu";
import { useParams } from "react-router-dom";
import { graphql, useLazyLoadQuery } from "react-relay";
import { type SportsNavbarOptionsQuery } from "./__generated__/SportsNavbarOptionsQuery.graphql";
import { useCurrentUser } from "../../../utils/CurrentUserContext";

type OptionType = {
  value: string;
  label: string;
};

type SportsNavbarProps = {
  onOpenCreatePost: () => void;
  onFilterChange: (sport: string, city: string) => void;
};

const SportsNavbar = ({
  onOpenCreatePost,
  onFilterChange,
}: SportsNavbarProps) => {
  const [selectedCity, setSelectedCity] = useState<OptionType | null>(null);
  const [selectedSport, setSelectedSport] = useState<OptionType | null>(null);
  const params = useParams<{ sport_slug: string; city_slug: string }>();
  const currentUser = useCurrentUser();

  const data = useLazyLoadQuery<SportsNavbarOptionsQuery>(
    graphql`
      query SportsNavbarOptionsQuery {
        allSports {
          id
          name
          slug
        }
        countriesWithCities {
          id
          name
          code
          cities {
            id
            name
            slug
          }
        }
      }
    `,
    {}
  );

  const sportsOptions = data.allSports.map((sport) => ({
    value: sport.slug,
    label: sport.name,
  }));

  const cityOptions =
    data.countriesWithCities
      .find((c) => c.id === currentUser.city?.country?.id)
      ?.cities.map((city) => ({
        value: city.slug,
        label: city.name,
      })) ?? [];

  // Custom styles for react-select
  const customStyles = {
    control: (provided: any, state: any) => ({
      ...provided,
      backgroundColor: "#1e1e1e",
      borderColor: state.isFocused ? "#22c55e" : "#374151",
      boxShadow: state.isFocused ? "0 0 0 1px #22c55e" : "none",
      "&:hover": {
        borderColor: "#22c55e",
      },
      minWidth: "140px",
      cursor: "pointer",
      padding: "2px 0",
    }),
    menu: (provided: any) => ({
      ...provided,
      backgroundColor: "#1e1e1e",
      border: "1px solid #374151",
      zIndex: 100,
    }),
    option: (provided: any, state: any) => ({
      ...provided,
      backgroundColor: state.isFocused
        ? "#22c55e"
        : state.isSelected
        ? "#16a34a"
        : "#1e1e1e",
      color: "#ffffff",
      cursor: "pointer",
      "&:active": {
        backgroundColor: "#16a34a",
      },
    }),
    singleValue: (provided: any) => ({
      ...provided,
      color: "#ffffff",
    }),
    placeholder: (provided: any) => ({
      ...provided,
      color: "#9ca3af",
      fontSize: "14px",
    }),
    input: (provided: any) => ({
      ...provided,
      color: "#ffffff",
    }),
  };

  useEffect(() => {
    const cityOption = cityOptions.find(
      (opt) => opt.value === params.city_slug
    );
    const sportOption = sportsOptions.find(
      (opt) => opt.value === params.sport_slug
    );

    if (cityOption) setSelectedCity(cityOption);
    if (sportOption) setSelectedSport(sportOption);
  }, [params.city_slug, params.sport_slug]);

  const handleCityChange = (selectedOption: OptionType | null) => {
    if (selectedOption && selectedSport) {
      setSelectedCity(selectedOption);
      onFilterChange(selectedSport.value, selectedOption.value);
    }
  };

  const handleSportChange = (selectedOption: OptionType | null) => {
    if (selectedOption && selectedCity) {
      setSelectedSport(selectedOption);
      onFilterChange(selectedOption.value, selectedCity.value);
    }
  };

  return (
    <header className="flex h-20 justify-between items-center px-8 bg-[#121212] shadow-lg border-b border-gray-800/50">
      {/* Left: Logo */}
      <div className="flex items-center w-25">
        <div className="flex items-center hover:opacity-80 transition-opacity">
          <img
            src="/assets/logo.png"
            alt="Sportsnet Logo"
            className="w-12 h-12 mr-3"
          />
          <span className="text-white font-bold text-2xl tracking-wide">
            Sportsnet
          </span>
        </div>
      </div>

      {/* Center: Filters and Action Buttons */}
      <div className="flex items-center gap-6">
        {/* Filters */}
        <div className="flex items-center gap-3">
          <Select
            options={cityOptions}
            value={selectedCity}
            onChange={handleCityChange}
            styles={customStyles}
            placeholder="Select City"
            isSearchable={true}
          />
          <Select
            options={sportsOptions}
            value={selectedSport}
            onChange={handleSportChange}
            styles={customStyles}
            placeholder="Select Sport"
            isSearchable={true}
          />
        </div>

        {/* Divider */}
        <div className="h-8 w-px bg-gray-700"></div>

        {/* Share Game Info */}
        <div className="flex items-center gap-2">
          <span className="text-xl">🔥</span>
          <span className="text-white text-sm font-medium">
            Share in{" "}
            <span className="text-green-500 capitalize">"Your City"</span>
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <button
            onClick={onOpenCreatePost}
            className="bg-[#222222] hover:bg-green-600 border border-gray-700 hover:border-green-500 text-white rounded-lg px-3 py-2 flex items-center gap-2 transition-all duration-200 group cursor-pointer"
            title="Post Moment"
          >
            <FaCamera className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" />
            <span className="text-xs font-medium">Moment</span>
          </button>
          <button
            onClick={() => {}}
            className="bg-[#222222] hover:bg-green-600 border border-gray-700 hover:border-green-500 text-white rounded-lg px-3 py-2 flex items-center gap-2 transition-all duration-200 group"
            title="Share Win"
          >
            <FaTrophy className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" />
            <span className="text-xs font-medium">Win</span>
          </button>
          <button
            onClick={() => {}}
            className="bg-[#222222] hover:bg-green-600 border border-gray-700 hover:border-green-500 text-white rounded-lg px-3 py-2 flex items-center gap-2 transition-all duration-200 group"
            title="Game Recap"
          >
            <GiWhistle className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" />
            <span className="text-xs font-medium">Recap</span>
          </button>
        </div>
      </div>

      {/* Right: User Profile Menu */}
      <div className="flex items-center w-16">
        <UserMenu />
      </div>
    </header>
  );
};

export default SportsNavbar;
