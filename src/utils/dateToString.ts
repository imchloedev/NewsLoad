export const dateToString = (publishedAt: string) => {
  const current: Date = new Date();
  const publishedDate: Date = new Date(publishedAt);

  const year = publishedDate.getFullYear();
  const month = ('0' + (publishedDate.getMonth() + 1)).slice(-2);
  const day = ('0' + publishedDate.getDate()).slice(-2);
  const dateString = `${year}/${month}/${day}`;

  const diffDate = Number(current) - Number(publishedDate);
  const hoursDiff = Math.floor(diffDate / (1000 * 60 * 60));
  const minsDiff = Math.floor(diffDate / (1000 * 60));
  const secsDiff = Math.floor(diffDate / 1000);

  if (secsDiff < 60) {
    // 60초 전인 경우
    return `${secsDiff}secs ago`;
  } else if (secsDiff < 3600) {
    // 차이가 1시간 전인 경우
    return `${minsDiff}mins ago`;
  } else if (secsDiff < 86400) {
    // 차이가 1일 전인 경우
    return `${hoursDiff}hrs ago`;
  } else {
    return dateString;
  }
};
