import { useTranslation } from "react-i18next";
import { PageWrapper } from "widgets/PageWrapper/PageWrapper";

const AboutPage = (): JSX.Element => {
  const { t } = useTranslation("about");

  return <PageWrapper>{t("О Сайте")}</PageWrapper>;
};

export default AboutPage;
