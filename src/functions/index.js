export const imageSource = (user) => {
  if (user.image) {
    return user.image.url;
  } else {
    return "https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-portrait-176256935.jpg";
  }
};
