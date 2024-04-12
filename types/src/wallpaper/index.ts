export interface Alternative_slug {
  en: string;
  es: string;
  ja: string;
  fr: string;
  it: string;
  ko: string;
  de: string;
  pt: string;
}

export interface Url {
  raw: string;
  full: string;
  regular: string;
  small: string;
  thumb: string;
  small_s3: string;
}

export interface Link {
  self: string;
  html: string;
  download: string;
  download_location: string;
}

export interface Health {
  status: string;
}

export interface People {
  status: string;
  approved_on: string;
}

export interface Travel {
  status: string;
}

export interface Topic_submission {
  health: Health;
  people: People;
  travel: Travel;
}

export interface Link {
  self: string;
  html: string;
  photos: string;
  likes: string;
  portfolio: string;
  following: string;
  followers: string;
}

export interface Profile_image {
  small: string;
  medium: string;
  large: string;
}

export interface Social {
  instagram_username: string;
  portfolio_url?: any;
  twitter_username?: any;
  paypal_email?: any;
}

export interface User {
  id: string;
  updated_at: string;
  username: string;
  name: string;
  first_name: string;
  last_name: string;
  twitter_username?: any;
  portfolio_url?: any;
  bio: string;
  location: string;
  links: Link;
  profile_image: Profile_image;
  instagram_username: string;
  total_collections: number;
  total_likes: number;
  total_photos: number;
  total_promoted_photos: number;
  total_illustrations: number;
  total_promoted_illustrations: number;
  accepted_tos: boolean;
  for_hire: boolean;
  social: Social;
}

export interface Exif {
  make: string;
  model: string;
  name: string;
  exposure_time: string;
  aperture: string;
  focal_length: string;
  iso: number;
}

export interface Position {
  latitude: number;
  longitude: number;
}

export interface Location {
  name: string;
  city?: any;
  country: string;
  position: Position;
}

export interface Meta {
  index: boolean;
}

export interface Tag {
  type: string;
  title: string;
}

export interface Tags_preview {
  type: string;
  title: string;
}

export interface Topic {
  id: string;
  title: string;
  slug: string;
  visibility: string;
}

export interface Wallpaper {
  id: string;
  slug: string;
  alternative_slugs: Alternative_slug;
  created_at: string;
  updated_at: string;
  promoted_at: string;
  width: number;
  height: number;
  color: string;
  blur_hash: string;
  description: string;
  alt_description: string;
  breadcrumbs: any[];
  urls: Url;
  links: Link;
  likes: number;
  liked_by_user: boolean;
  current_user_collections: any[];
  sponsorship?: any;
  topic_submissions: Topic_submission;
  asset_type: string;
  user: User;
  exif: Exif;
  location: Location;
  meta: Meta;
  public_domain: boolean;
  tags: Tag[];
  tags_preview: Tags_preview[];
  views: number;
  downloads: number;
  topics: Topic[];
}
