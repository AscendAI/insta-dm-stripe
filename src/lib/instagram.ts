export interface RootMediaLikeObject {
  response: Response
  status: string
}

export interface RootMediaInfoObject {
  response: {
    body: { items: MediaInfo[] }
    content_type: string
    status_code: number
  }
  status: string
}

export interface Response {
  body: Body
  content_type: string
  status_code: number
}

export interface Body {
  disclaimer_text: string
  media_info?: MediaInfo
  status: string
  user_count: number
  users: User[]
}

export interface MediaInfo {
  all_previous_submitters: any[]
  boost_unavailable_identifier: null
  boost_unavailable_reason: null
  can_see_insights_as_brand: boolean
  can_view_more_preview_comments: boolean
  can_viewer_reshare: boolean
  can_viewer_save: boolean
  caption: Caption
  caption_is_edited: boolean
  carousel_media: CarouselMedia[]
  carousel_media_count: number
  carousel_media_ids: string[]
  carousel_media_pending_post_count: number
  client_cache_key: string
  clips_tab_pinned_user_ids: any[]
  code: string
  comment_count: number
  comment_inform_treatment: CommentInformTreatment
  comment_likes_enabled: boolean
  comment_threading_enabled: boolean
  comments: Comment[]
  commerciality_status: string
  deleted_reason: number
  device_timestamp: number
  enable_media_notes_production: boolean
  explore_hide_comments: boolean
  fb_user_tags: FbUserTags
  featured_products: any[]
  filter_type: number
  has_delayed_metadata: boolean
  has_liked: boolean
  has_more_comments: boolean
  has_privately_liked: boolean
  has_shared_to_fb: number
  hide_view_all_comment_entrypoint: boolean
  highlights_info: HighlightsInfo
  id: string
  ig_media_sharing_disabled: boolean
  image_versions2: ImageVersions2
  integrity_review_decision: string
  invited_coauthor_producers: any[]
  is_auto_created: boolean
  is_comments_gif_composer_enabled: boolean
  is_cutout_sticker_allowed: boolean
  is_in_profile_grid: boolean
  is_open_to_public_submission: boolean
  is_organic_product_tagging_eligible: boolean
  is_paid_partnership: boolean
  is_post_live_clips_media: boolean
  is_reshare_of_text_post_app_media_in_ig: boolean
  is_unified_video: boolean
  is_visual_reply_commenter_notice_enabled: boolean
  lat: number
  like_and_view_counts_disabled: boolean
  like_count: number
  lng: number
  location: Location
  max_num_visible_preview_comments: number
  media_type: number
  mezql_token: string
  music_metadata: MusicMetadata
  next_max_id: string
  open_carousel_submission_state: string
  organic_tracking_token: string
  original_height: number
  original_media_has_visual_reply_media: boolean
  original_width: number
  owner: Owner
  pk: string
  preview_comments: Comment[]
  product_suggestions: any[]
  product_type: string
  profile_grid_control_enabled: boolean
  sharing_friction_info: SharingFrictionInfo
  shop_routing_user_id: null
  should_request_ads: boolean
  strong_id__: string
  taken_at: number
  user: Owner
}

export interface Caption {
  bit_flags: number
  content_type: string
  created_at: number
  created_at_utc: number
  did_report_as_spam: boolean
  has_translation: boolean
  is_covered: boolean
  is_ranked_comment: boolean
  media_id: string
  pk: string
  private_reply_status: number
  share_enabled: boolean
  status: string
  text: string
  type: number
  user: Owner
  user_id: string
}

export interface Owner {
  account_badges: any[]
  fan_club_info: FanClubInfo
  fbid_v2: string
  feed_post_reshare_disabled: boolean
  friendship_status: FriendshipStatus
  full_name: string
  has_anonymous_profile_picture: boolean
  hd_profile_pic_url_info: HDProfilePicURLInfo
  hd_profile_pic_versions: HDProfilePicURLInfo[]
  id: string
  is_favorite: boolean
  is_private: boolean
  is_unpublished: boolean
  pk: string
  pk_id: string
  profile_pic_id: string
  profile_pic_url: string
  show_account_transparency_details: boolean
  strong_id__: string
  third_party_downloads_enabled: number
  transparency_product_enabled: boolean
  username: string
}

export interface FanClubInfo {
  autosave_to_exclusive_highlight: null
  connected_member_count: null
  fan_club_id: null
  fan_club_name: null
  fan_consideration_page_revamp_eligiblity: null
  has_enough_subscribers_for_ssc: null
  is_fan_club_gifting_eligible: null
  is_fan_club_referral_eligible: null
  subscriber_count: null
}

export interface FriendshipStatus {
  following: boolean
  is_bestie: boolean
  is_feed_favorite: boolean
  is_restricted: boolean
}

export interface HDProfilePicURLInfo {
  height: number
  scans_profile?: string
  url: string
  width: number
}

export interface CarouselMedia {
  accessibility_caption: string
  carousel_parent_id: string
  commerciality_status: string
  explore_pivot_grid: boolean
  fb_user_tags: FbUserTags
  featured_products: any[]
  highlights_info: HighlightsInfo
  id: string
  image_versions2: ImageVersions2
  media_type: number
  original_height: number
  original_width: number
  pk: string
  preview: string
  product_suggestions: any[]
  product_type: string
  sharing_friction_info: SharingFrictionInfo
  shop_routing_user_id: null
  strong_id__: string
  taken_at: number
}

export interface FbUserTags {
  in: any[]
}

export interface HighlightsInfo {
  added_to: any[]
}

export interface ImageVersions2 {
  candidates: HDProfilePicURLInfo[]
}

export interface SharingFrictionInfo {
  bloks_app_url: null
  sharing_friction_payload: null
  should_have_sharing_friction: boolean
}

export interface CommentInformTreatment {
  action_type: null
  should_have_inform_treatment: boolean
  text: string
  url: null
}

export interface Comment {
  bit_flags: number
  comment_like_count: number
  content_type: string
  created_at: number
  created_at_utc: number
  did_report_as_spam: boolean
  has_liked_comment: boolean
  is_covered: boolean
  is_ranked_comment: boolean
  media_id: string
  pk: string
  share_enabled: boolean
  status: string
  text: string
  type: number
  user: User
  user_id: string
}

export interface User {
  fbid_v2?: string
  full_name: string
  id?: string
  is_new?: boolean
  is_private: boolean
  is_verified: boolean
  latest_reel_media?: number
  pk: string
  pk_id: string
  profile_pic_id?: string
  profile_pic_url: string
  strong_id__: string
  username: string
}

export interface Location {
  address: string
  city: string
  external_source: string
  facebook_places_id: string
  has_viewer_saved: boolean
  is_eligible_for_guides: boolean
  lat: number
  lng: number
  name: string
  pk: string
  short_name: string
}

export interface MusicMetadata {
  audio_type: string
  music_canonical_id: string
  music_info: MusicInfo
  original_sound_info: null
  pinned_media_ids: any[]
}

export interface MusicInfo {
  music_asset_info: MusicAssetInfo
  music_canonical_id: null
  music_consumption_info: MusicConsumptionInfo
}

export interface MusicAssetInfo {
  allows_saving: boolean
  artist_id: string
  audio_asset_id: string
  audio_cluster_id: string
  cover_artwork_thumbnail_uri: string
  cover_artwork_uri: string
  dark_message: null
  dash_manifest: null
  display_artist: string
  duration_in_ms: number
  fast_start_progressive_download_url: string
  has_lyrics: boolean
  highlight_start_times_in_ms: number[]
  id: string
  ig_username: string
  is_eligible_for_audio_effects: boolean
  is_explicit: boolean
  progressive_download_url: string
  reactive_audio_download_url: null
  sanitized_title: null
  subtitle: string
  title: string
  web_30s_preview_download_url: string
}

export interface MusicConsumptionInfo {
  allow_media_creation_with_music: boolean
  audio_asset_start_time_in_ms: number
  audio_filter_infos: any[]
  audio_muting_info: AudioMutingInfo
  contains_lyrics: null
  derived_content_id: null
  display_labels: null
  formatted_clips_media_count: null
  ig_artist: User
  is_bookmarked: boolean
  is_trending_in_clips: boolean
  overlap_duration_in_ms: number
  placeholder_profile_pic_url: string
  should_allow_music_editing: boolean
  should_mute_audio: boolean
  should_mute_audio_reason: string
  should_mute_audio_reason_type: null
  should_render_soundwave: boolean
  trend_rank: null
}

export interface AudioMutingInfo {
  allow_audio_editing: boolean
  mute_audio: boolean
  mute_reason_str: string
  show_muted_audio_toast: boolean
}

export interface RootMediaCommentObject {
  response: MediaCommentResponse
  status: string
}

export interface MediaCommentResponse {
  body: MediaCommentBody
  content_type: string
  status_code: number
}

export interface MediaCommentBody {
  can_view_more_preview_comments: boolean
  caption: Caption
  caption_is_edited: boolean
  comment_count: number
  comment_cover_pos: string
  comment_filter_param: string
  comment_likes_enabled: boolean
  comments: BiggerComment[]
  has_more_comments: boolean
  has_more_headload_comments: boolean
  initiate_at_top: boolean
  insert_new_comment_to_top: boolean
  is_ranked: boolean
  liked_by_media_owner_badge_enabled: boolean
  media_header_display: string
  next_min_id: string
  preview_comments: any[]
  quick_response_emojis: QuickResponseEmoji[]
  scroll_behavior: number
  show_comments_for_you_demarcator: boolean
  status: string
  threading_enabled: boolean
}

export enum ContentType {
  Comment = 'comment',
}

export enum Status {
  Active = 'Active',
}

export interface BiggerComment {
  bit_flags: number
  child_comment_count: number
  comment_index: number
  comment_like_count: number
  content_type: ContentType
  created_at: number
  created_at_utc: number
  did_report_as_spam: boolean
  has_liked_comment: boolean
  has_translation?: boolean
  inline_composer_display_condition: InlineComposerDisplayCondition
  is_covered: boolean
  is_ranked_comment: boolean
  media_id: string
  other_preview_users: any[]
  pk: string
  preview_child_comments: any[]
  private_reply_status: number
  share_enabled: boolean
  status: Status
  text: string
  type: number
  user: User
  user_id: string
}

export enum InlineComposerDisplayCondition {
  Never = 'never',
}

export interface QuickResponseEmoji {
  unicode: string
}

const paginationEnabled = true

export async function getMediaLikers(mediaShortCode: string) {
  // get likes from rapid api

  const response = await fetch(
    'https://rocketapi-for-instagram.p.rapidapi.com/instagram/media/get_likes',
    {
      method: 'POST',
      headers: {
        'X-RapidAPI-Key': process.env.RAPID_API_KEY!,
        'X-RapidAPI-Host': 'rocketapi-for-instagram.p.rapidapi.com',
      },
      body: JSON.stringify({
        shortcode: mediaShortCode,
        max_id: null,
      }),
    }
  )

  const result = (await response.json()) as RootMediaLikeObject
  console.log("results for likes: ", result?.response?.body?.users)
  const mediaLikers = result?.response?.body?.users?.map?.((user) => ({
    username: user.username,
    profilePic: user.profile_pic_url,
    fullName: user.full_name,
    is_private: user.is_private,
  }))
  const mediaId = result?.response?.body?.media_info?.pk
  if (!mediaLikers) {
    throw new Error('Failed to get media likers')
  }
  return { mediaLikers, mediaId }
}

export async function getMediaId(mediaShortCode: string) {
  const response = await fetch(
    'https://rocketapi-for-instagram.p.rapidapi.com/instagram/media/get_info_by_shortcode',
    {
      method: 'POST',
      headers: {
        'X-RapidAPI-Key': process.env.RAPID_API_KEY!,
        'X-RapidAPI-Host': 'rocketapi-for-instagram.p.rapidapi.com',
      },
      body: JSON.stringify({
        shortcode: mediaShortCode,
      }),
    }
  )

  const result = (await response.json()) as RootMediaInfoObject
  const mediaId = result?.response?.body?.items?.[0]?.pk

  if (!mediaId) {
    throw new Error('Failed to get media id')
  }
  return mediaId
}

export async function getMediaCommenters(
  mediaId: string,
  comments: number,
  mediaCommenters: {
    username: string
    profilePic: string
    fullName: string
  }[] = [],
  nextMinId: string | null = null
) {
  if (mediaCommenters.length >= comments) {
    return mediaCommenters.slice(0, comments)
  }
  const response = await fetch(
    'https://rocketapi-for-instagram.p.rapidapi.com/instagram/media/get_comments',
    {
      method: 'POST',
      headers: {
        'X-RapidAPI-Key': process.env.RAPID_API_KEY!,
        'X-RapidAPI-Host': 'rocketapi-for-instagram.p.rapidapi.com',
      },
      body: JSON.stringify({
        id: mediaId,
        min_id: nextMinId,
      }),
    }
  )

  const result = (await response.json()) as RootMediaCommentObject
  console.log("results for comments: ", result?.response?.body?.comments)
  const tempMediaCommenters = result?.response?.body?.comments?.map?.(
    (comment) => ({
      username: comment.user.username,
      profilePic: comment.user.profile_pic_url,
      fullName: comment.user.full_name,
      is_private: comment.user.is_private,
    })
  )
  const nextMinIdFromResponse = result?.response?.body?.next_min_id

  if (!tempMediaCommenters || !tempMediaCommenters.length) {
    return mediaCommenters
  }

  if (!paginationEnabled || !nextMinIdFromResponse) {
    return mediaCommenters.concat(tempMediaCommenters)
  }

  return getMediaCommenters(
    mediaId,
    comments,
    mediaCommenters.concat(tempMediaCommenters),
    nextMinIdFromResponse
  )
}