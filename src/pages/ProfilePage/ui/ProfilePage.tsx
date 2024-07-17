import { profileReducer } from "entities/Profile";
import { useTranslation } from "react-i18next";
import {
  DynamicModuleLoader,
  ReducersList
} from "shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";

const reducers: ReducersList = {
  profile: profileReducer
};

const ProfilePage = (): JSX.Element => {
  const { t } = useTranslation("profile");

  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
      <div>{t("Profile Page")}</div>
    </DynamicModuleLoader>
  );
};

export default ProfilePage;
