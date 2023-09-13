export const getDomain = (url: string) => {
  const regex = /^(?:https?:\/\/)?(?:www\.)?([^\/]+)/i;

  const matches = url.match(regex);

  if (matches && matches.length >= 2) {
    return matches[1];
  } else {
    return null;
  }
};
