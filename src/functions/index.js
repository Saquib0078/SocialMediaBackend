export const imageSource = (user) => {
  if (user.image) {
    return user.image.url;
  } else {
    // https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png
    return "https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-portrait-176256935.jpg";
  }
};
