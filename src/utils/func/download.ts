export const downloadJson = (obj: Object, name: string) => {
  const blob = new Blob([JSON.stringify(obj)], { type: "application/json" });
  let url = window.URL.createObjectURL(blob); //clone local and download
  console.log(url);
  const a = document.createElement("a");
  a.style.display = "none";
  a.href = url;
  a.download = name;
  document.body.appendChild(a);
  a.click();
  window.URL.revokeObjectURL(url);
};

export const downloadImage = (ref: React.RefObject<HTMLCanvasElement>) => {
  var url = ref.current?.toDataURL("image/png");
  var link = document.createElement("a");
  link.download = "filename.png";
  link.href = url!;
  link.click();
};
