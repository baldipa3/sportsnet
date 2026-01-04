import { useState } from "react";
import Select from "react-select";

type OptionType = {
  value: string;
  label: string;
};

export const SportsCitiesFilterBar = () => {
  const [selectedCity, setSelectedCity] = useState<OptionType | null>(null);
  const [selectedSport, setSelectedSport] = useState<OptionType | null>(null);

  // Dummy data for cities
  const cityOptions = [
    { value: "all", label: "All Cities" },
    { value: "new-york", label: "New York" },
    { value: "los-angeles", label: "Los Angeles" },
    { value: "chicago", label: "Chicago" },
    { value: "miami", label: "Miami" },
    { value: "boston", label: "Boston" },
    { value: "buenos-aires", label: "Buenos Aires" },
  ];

  // Dummy data for sports
  const sportsOptions = [
    { value: "all", label: "All Sports" },
    { value: "basketball", label: "Basketball" },
    { value: "football", label: "Football" },
    { value: "baseball", label: "Baseball" },
    { value: "hockey", label: "Hockey" },
    { value: "soccer", label: "Soccer" },
  ];

  // Custom styles for react-select to match the theme
  const customStyles = {
    control: (provided: any, state: any) => ({
      ...provided,
      backgroundColor: "#1e1e1e",
      borderColor: state.isFocused ? "#22c55e" : "#374151",
      boxShadow: state.isFocused ? "0 0 0 1px #22c55e" : "none",
      "&:hover": {
        borderColor: "#22c55e",
      },
      minWidth: "200px",
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
    }),
    input: (provided: any) => ({
      ...provided,
      color: "#ffffff",
    }),
  };

  const handleCityChange = (selectedOption: OptionType | null) => {
    setSelectedCity(selectedOption);
    console.log("City selected:", selectedOption);
    // Add your filter logic here
  };

  const handleSportChange = (selectedOption: OptionType | null) => {
    setSelectedSport(selectedOption);
    console.log("Sport selected:", selectedOption);
    // Add your filter logic here
  };

  return (
    <div className="sticky top-0 z-40 bg-[#1a1a1a] border-b border-gray-800/50 shadow-md">
      <div className="px-8 py-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center gap-4">
            <div className="flex flex-col">
              <label className="text-gray-400 text-xs mb-1 ml-1">City</label>
              <Select
                options={cityOptions}
                value={selectedCity}
                onChange={handleCityChange}
                styles={customStyles}
                placeholder="Select City"
                isSearchable={true}
              />
            </div>

            <div className="flex flex-col">
              <label className="text-gray-400 text-xs mb-1 ml-1">Sport</label>
              <Select
                options={sportsOptions}
                value={selectedSport}
                onChange={handleSportChange}
                styles={customStyles}
                placeholder="Select Sport"
                isSearchable={true}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
