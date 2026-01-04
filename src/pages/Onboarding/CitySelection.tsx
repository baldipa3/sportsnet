import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ReactCountryFlag from "react-country-flag";
import { graphql, useLazyLoadQuery } from "react-relay";
import { type CitySelectionListQuery } from "./__generated__/CitySelectionListQuery.graphql";

type Country = NonNullable<
  CitySelectionListQuery["response"]["countriesWithCities"]
>[number];
type City = Country["cities"][number];

export const CitySelection: React.FC = () => {
  const navigate = useNavigate();
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);

  const data = useLazyLoadQuery<CitySelectionListQuery>(
    graphql`
      query CitySelectionListQuery {
        countriesWithCities {
          id
          name
          code
          cities {
            id
            name
          }
        }
      }
    `,
    {}
  );

  const countries = data.countriesWithCities;
  const cities = selectedCountry?.cities ?? [];

  const handleCitySelection = async (city: City): Promise<void> => {
    try {
      navigate("/onboarding/sport", { state: { cityId: city.id } });
    } catch (error) {
      console.error("Failed to save city selection:", error);
    }
  };

  return (
    <div className="min-h-screen bg-[#171717] text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-2">
          Where do you play sports?
        </h1>
        <p className="text-gray-400 text-center mb-8">
          This helps us show you relevant local sports communities
        </p>

        {!selectedCountry ? (
          <div>
            <h2 className="text-2xl mb-6">Select your country</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {countries.map((country) => (
                <button
                  key={country.id}
                  onClick={() => setSelectedCountry(country)}
                  className="p-6 bg-gradient-to-br from-[#1E1E1E] to-[#2A2A2A] rounded-xl hover:from-[#222222] hover:to-[#333333] transition-all hover:scale-105 hover:ring-2 hover:ring-[#8BC34A] cursor-pointer"
                >
                  <div className="mb-2">
                    {country.code && (
                      <ReactCountryFlag
                        countryCode={country.code}
                        svg
                        style={{
                          width: "3em",
                          height: "3em",
                        }}
                        title={country.name || ""}
                      />
                    )}
                  </div>
                  <div className="text-lg">{country.name}</div>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div>
            <button
              onClick={() => setSelectedCountry(null)}
              className="mb-6 text-[#8BC34A] hover:underline flex items-center gap-2 cursor-pointer"
            >
              ← Change country (
              {selectedCountry.code && (
                <ReactCountryFlag
                  countryCode={selectedCountry.code}
                  svg
                  style={{
                    width: "1.2em",
                    height: "1.2em",
                  }}
                  title={selectedCountry.name || ""}
                />
              )}
              {selectedCountry.name})
            </button>

            <h2 className="text-2xl mb-6">
              Select your city in {selectedCountry.name}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {cities.map((city: City) => (
                <button
                  key={city.id}
                  onClick={() => handleCitySelection(city)}
                  className="p-6 bg-gradient-to-br from-[#1E1E1E] to-[#2A2A2A] rounded-xl hover:from-[#222222] hover:to-[#333333] transition-all hover:scale-105 hover:ring-2 hover:ring-[#8BC34A] cursor-pointer"
                >
                  <div className="text-lg">{city.name}</div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
