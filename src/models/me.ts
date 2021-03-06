// Generated by https://quicktype.io

export interface Me {
  is_employee: boolean;
  seen_layout_switch: boolean;
  has_visited_new_profile: boolean;
  pref_no_profanity: boolean;
  has_external_account: boolean;
  pref_geopopular: string;
  seen_redesign_modal: boolean;
  pref_show_trending: boolean;
  subreddit: Subreddit;
  is_sponsor: boolean;
  gold_expiration: null;
  has_gold_subscription: boolean;
  num_friends: number;
  features: Features;
  has_android_subscription: boolean;
  verified: boolean;
  pref_autoplay: boolean;
  coins: number;
  has_paypal_subscription: boolean;
  has_subscribed_to_premium: boolean;
  id: string;
  has_stripe_subscription: boolean;
  oauth_client_id: string;
  can_create_subreddit: boolean;
  over_18: boolean;
  is_gold: boolean;
  is_mod: boolean;
  awarder_karma: number;
  suspension_expiration_utc: null;
  has_verified_email: boolean;
  is_suspended: boolean;
  pref_video_autoplay: boolean;
  can_edit_name: boolean;
  in_redesign_beta: boolean;
  icon_img: string;
  pref_nightmode: boolean;
  awardee_karma: number;
  hide_from_robots: boolean;
  password_set: boolean;
  link_karma: number;
  force_password_reset: boolean;
  total_karma: number;
  seen_give_award_tooltip: boolean;
  inbox_count: number;
  seen_premium_adblock_modal: boolean;
  pref_top_karma_subreddits: boolean;
  pref_show_snoovatar: boolean;
  name: string;
  pref_clickgadget: number;
  created: number;
  gold_creddits: number;
  created_utc: number;
  has_ios_subscription: boolean;
  pref_show_twitter: boolean;
  in_beta: boolean;
  comment_karma: number;
  has_subscribed: boolean;
  linked_identities: any[];
  seen_subreddit_chat_ftux: boolean;
}

export interface Features {
  mod_service_mute_writes: boolean;
  promoted_trend_blanks: boolean;
  show_amp_link: boolean;
  report_service_handles_report_writes_to_db_for_helpdesk_reports: boolean;
  report_service_handles_self_harm_reports: boolean;
  mweb_sharing_clipboard: Mweb;
  mweb_link_tab: Mweb;
  reports_double_write_to_report_service_for_spam: boolean;
  is_email_permission_required: boolean;
  reports_double_write_to_report_service_for_modmail_reports: boolean;
  mod_awards: boolean;
  expensive_coins_package: boolean;
  mweb_xpromo_revamp_v2: Mweb;
  awards_on_streams: boolean;
  mweb_xpromo_modal_listing_click_daily_dismissible_ios: boolean;
  reports_double_write_to_report_service_for_som: boolean;
  chat_subreddit: boolean;
  reports_double_write_to_report_service_for_users: boolean;
  modlog_copyright_removal: boolean;
  show_nps_survey: boolean;
  do_not_track: boolean;
  reports_double_write_to_report_service_for_helpdesk_reports: boolean;
  report_service_handles_report_writes_to_db_for_spam: boolean;
  reports_double_write_to_report_service_for_sendbird_chats: boolean;
  mod_service_mute_reads: boolean;
  mweb_xpromo_interstitial_comments_ios: boolean;
  noreferrer_to_noopener: boolean;
  chat_user_settings: boolean;
  premium_subscriptions_table: boolean;
  reports_double_write_to_report_service: boolean;
  mweb_xpromo_interstitial_comments_android: boolean;
  report_service_handles_report_writes_to_db_for_awards: boolean;
  mweb_nsfw_xpromo: Mweb;
  reports_double_write_to_report_service_for_awards: boolean;
  mweb_xpromo_revamp_v3: Mweb;
  chat_group_rollout: boolean;
  resized_styles_images: boolean;
  spez_modal: boolean;
  mweb_xpromo_modal_listing_click_daily_dismissible_android: boolean;
  econ_wallet_service: boolean;
  report_service_handles_report_writes_to_db_for_som: boolean;
}

export interface Mweb {
  owner: string;
  variant: string;
  experiment_id: number;
}

export interface Subreddit {
  default_set: boolean;
  user_is_contributor: boolean;
  banner_img: string;
  restrict_posting: boolean;
  user_is_banned: boolean;
  free_form_reports: boolean;
  community_icon: null;
  show_media: boolean;
  icon_color: string;
  user_is_muted: boolean;
  display_name: string;
  header_img: null;
  title: string;
  coins: number;
  previous_names: any[];
  over_18: boolean;
  icon_size: number[];
  primary_color: string;
  icon_img: string;
  description: string;
  submit_link_label: string;
  header_size: null;
  restrict_commenting: boolean;
  subscribers: number;
  submit_text_label: string;
  is_default_icon: boolean;
  link_flair_position: string;
  display_name_prefixed: string;
  key_color: string;
  name: string;
  is_default_banner: boolean;
  url: string;
  banner_size: null;
  user_is_moderator: boolean;
  public_description: string;
  link_flair_enabled: boolean;
  disable_contributor_requests: boolean;
  subreddit_type: string;
  user_is_subscriber: boolean;
}
