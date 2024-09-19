export const fileDownload = (blob: Blob, fileName: string) => {
  const url = window.URL.createObjectURL(new Blob([blob]));
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", fileName);
  document.body.appendChild(link);
  link.click();
  // URL과 링크를 사용한 후 정리합니다.
  window.URL.revokeObjectURL(url);
  document.body.removeChild(link);
};
