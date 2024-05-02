import { graphql, useStaticQuery } from 'gatsby';

const useGetSocials = () => {
  const data = useStaticQuery(graphql`
  query GetSocials {
  wpcontent {
    siteOptions {
      websiteOptions {
        socials {
          github
          linkedin
        }
      }
    }
  }
}
  `);

  return data.wpcontent.siteOptions.websiteOptions.socials;
};

export default useGetSocials;
