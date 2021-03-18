export type VocabularyLangType = {
  navigation: NavigationLangType;
  header: HeaderLangType;
  searchBar: SearchBarLangType;
  underlineTabs: UnderlineTabsLangType;
  homePage: HomePageLangType;
  collectionsPage: CollectionsPageLangType;
  modal: ModalLangType;
};

export type NavigationLangType = {
  explore: string;
  license: string;
  upload: string;
  collections: string;
  overlay: NavigationOverlayType;
};

type NavigationOverlayType = {
  home: string;
  collections: string;
  discover: string;
  popular: string;
  videos: string;
  challenges: string;
  leaderboard: string;
  pexelsBlog: string;
  join: string;
  license: string;
  apps: string;
  faq: string;
  about: string;
  terms: string;
};

export type HeaderLangType = {
  title: string;
  suggested: string;
  photographer: string;
};

export type SearchBarLangType = {
  placeholder: string;
  resent: string;
  collections: string;
  trending: string;
};

export type UnderlineTabsLangType = {
  home: string;
  collections: string;
  videos: string;
  leaderboard: string;
  challenges: string;
};

export type HomePageLangType = {
  title: string;
  trending: string;
  newTag: string;
};

export type CollectionsPageLangType = {
  title: string;
  noPictures: string;
};

export type ModalLangType = {
  collect: string;
  download: string;
  photographer: string;
};
