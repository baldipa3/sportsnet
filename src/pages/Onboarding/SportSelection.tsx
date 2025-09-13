import { useLocation } from "react-router-dom";
import SportsNavbar from "../../components/SportsNavbar";
import { type SportSelectionListQuery } from "./__generated__/SportSelectionListQuery.graphql";
import { type SportSelectionCompleteUserOnboardingMutation } from "./__generated__/SportSelectionCompleteUserOnboardingMutation.graphql";
import { graphql, useLazyLoadQuery, useMutation } from "react-relay";
import { getSportIcon } from "../../utils/sportIcons";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

type Sport = {
  id: string;
  name: string;
  slug: string;
};

const SportSelection = () => {
  const location = useLocation();
  const { cityId } = location.state || {};
  const navigate = useNavigate();

  const data = useLazyLoadQuery<SportSelectionListQuery>(
    graphql`
      query SportSelectionListQuery {
        allSports {
          id
          name
          slug
        }
      }
    `,
    {}
  );

  const SportSelectionCompleteUserOnboardingMutation = graphql`
    mutation SportSelectionCompleteUserOnboardingMutation(
      $cityId: ID!
      $defaultSportId: ID!
    ) {
      completeUserOnboarding(cityId: $cityId, defaultSportId: $defaultSportId) {
        id
        city {
          id
          slug
        }
        defaultSport {
          id
          slug
        }
      }
    }
  `;

  const sports = data?.allSports;
  const [commitMutation] =
    useMutation<SportSelectionCompleteUserOnboardingMutation>(
      SportSelectionCompleteUserOnboardingMutation
    );

  const submitCityAndSportSelection = (sport: Sport) => {
    commitMutation({
      variables: {
        cityId: cityId,
        defaultSportId: sport.id,
      },
      onCompleted: (response) => {
        const citySlug = response?.completeUserOnboarding?.city?.slug;
        const sportSlug = response?.completeUserOnboarding?.defaultSport?.slug;
        const cityId = response?.completeUserOnboarding?.city?.id;
        const sportId = response?.completeUserOnboarding?.defaultSport?.id;

        navigate(`/sports/${sportSlug}/cities/${citySlug}`, {
          state: { cityId: cityId, sportId: sportId },
        });
        toast.success("Onboarding completed successfully!");
      },
      onError: () => {
        toast.error("Failed to complete onboarding");
      },
    });
  };

  const handleSportSelection = (sport: Sport) => {
    if (!cityId) {
      toast.error("City is missing, please select a City first");
    }

    submitCityAndSportSelection(sport);
  };

  return (
    <>
      <SportsNavbar />
      <div className="bg-[#171717] min-h-screen pt-8">
        <div className="text-center px-8 mb-6">
          <h1 className="text-3xl font-bold text-white mb-3">
            Choose Your Sport
          </h1>
          <p className="text-gray-400 text-base max-w-md mx-auto">
            Select your favorite sport to get personalized content
          </p>
        </div>

        {/* Sports Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pb-12 px-8">
          {/* Fix type */}
          {sports.map((sport) => {
            const IconComponent = getSportIcon(sport?.slug);

            return (
              <div
                key={sport.id}
                onClick={() => handleSportSelection(sport)}
                className="isolate relative rounded-xl shadow-md flex flex-col items-center justify-center text-white text-xl font-semibold aspect-square bg-gradient-to-br from-[#1E1E1E] to-[#2A2A2A] hover:from-[#222222] hover:to-[#333333] transition-transform duration-300 ease-in-out transform hover:scale-105 hover:shadow-2xl hover:ring-4 hover:ring-[#8BC34A] p-8 cursor-pointer"
              >
                <div className="flex flex-col items-center justify-center h-full">
                  <div className="text-[#8BC34A]">
                    <IconComponent size={48} />
                  </div>
                  <h2 className="uppercase tracking-wide text-center mt-2">
                    {sport.name}
                  </h2>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default SportSelection;
